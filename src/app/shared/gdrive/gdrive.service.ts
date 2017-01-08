import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GdriveFile } from './gdrive-file';

const CLIENT_ID = '714707421933-9nqjome3tjml56epmet0c860c43tbjnt.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const FOLDER_MIME_TYPE = 'mimeType=\'application/vnd.google-apps.folder\'';
const FILE_MIME_TYPE = 'mimeType!=\'application/vnd.google-apps.folder\'';
const FOLDER_PARENT = '\'{0}\' in parents';
const ROOT_FOLDER = 'root';

@Injectable()
export class GdriveService {

  private authState: Subject<GoogleApiOAuth2TokenObject> = new Subject<GoogleApiOAuth2TokenObject>();

  constructor() {
  }

  init(): void {
    const authConfig = {
      client_id: CLIENT_ID,
      scope: SCOPES.join(' '),
      immediate: true
    };

    gapi.auth.authorize(authConfig, (authResult) => this.manageAuth(authResult));
  }

  authorize(): void {

    const authConfig = {
      client_id: CLIENT_ID,
      scope: SCOPES.join(' '),
      immediate: false
    };

    gapi.auth.authorize(authConfig, (authResult) => this.manageAuth(authResult));
  }

  isAuthorized(): Observable<boolean> {
    return this.mapAuthStateToBoolean();
  }

  getSubFolders(folder?: GdriveFile): Observable<GdriveFile[]> {
    const folders: Subject<gapi.client.drive.File[]> = new Subject<gapi.client.drive.File[]>();

    const openedFolder: GdriveFile = this.getOpenedFolderId(folder);

    const q = this.getFolderQuery(folder);

    const params = {
      q: q,
      orderBy: 'name'
    };

    gapi.client.drive.files.list(params).execute(response => folders.next(response.result.files || []));

    return folders
        .asObservable()
        .map(folders => {
          return this.mapToGdriveFiles(folders, openedFolder);
        });
  }

  getFiles(folder: GdriveFile): Observable<GdriveFile[]> {
    const files: Subject<gapi.client.drive.File[]> = new Subject<gapi.client.drive.File[]>();

    const q = this.getFileQuery(folder);

    const params = {
      q: q,
      orderBy: 'name',
      fields: 'files(id,name,mimeType,thumbnailLink)'
    };

    gapi.client.drive.files.list(params).execute(response => files.next(response.result.files || []));

    return files
        .asObservable()
        .map(files => this.mapToGdriveFiles(files));
  }

  private getOpenedFolderId(openedFolder?: GdriveFile): GdriveFile {
    if (openedFolder) {
      return new GdriveFile({ id: openedFolder.id, name: openedFolder.name });
    } else {
      return new GdriveFile({ id: ROOT_FOLDER, name: ROOT_FOLDER });
    }
  }

  private getFolderQuery(parentFolder?: gapi.client.drive.File) {
    const queries = [];
    queries.push(FOLDER_MIME_TYPE);
    queries.push(FOLDER_PARENT.replace('{0}', parentFolder ? parentFolder.id : 'root'));

    return queries.join(' and ');
  }

  private getFileQuery(parent: gapi.client.drive.File) {
    const queries = [];
    queries.push(FILE_MIME_TYPE);
    queries.push(FOLDER_PARENT.replace('{0}', parent.id));

    return queries.join(' and ');
  }

  private mapToGdriveFiles(folders, parentFolder?: GdriveFile) {
    return folders.map(folder => new GdriveFile(folder, parentFolder));
  }

  private manageAuth(authResult: GoogleApiOAuth2TokenObject) {
    if (authResult && !authResult.error) {
      this.authState.next(authResult);
    } else {
      this.authState.next(null);
    }
  }

  private mapAuthStateToBoolean(): Observable<boolean> {
    return this.authState
        .asObservable()
        .map(authState => authState && !authState.error);
  }
}
