import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GdriveFile } from './gdrive-file';

const CLIENT_ID = '714707421933-9nqjome3tjml56epmet0c860c43tbjnt.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const FOLDER_MIME_TYPE = 'mimeType=\'application/vnd.google-apps.folder\'';
const FOLDER_PARENT = '\'{0}\' in parents';
const ROOT_FOLDER = 'root';

@Injectable()
export class GdriveService {

  private authState: Subject<GoogleApiOAuth2TokenObject> = new Subject<GoogleApiOAuth2TokenObject>();

  constructor() {
    gapi.client.load('drive', 'v3');
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

    const parentId = this.getParentId(folder);

    const q = this.getQuery(folder);

    const params = {
      q: q,
      orderBy: 'name'
    };

    gapi.client.drive.files.list(params).execute(response => folders.next(response.result.files || []));

    return folders
        .asObservable()
        .map(folders => {
          return folder && folder.id !== ROOT_FOLDER ? this.getFolderListWithParent(parentId, folders) : folders;
        })
        .map(folders => {
          return this.mapToGdriveFiles(folders, parentId);
        });
  }

  private getParentId(parent?: GdriveFile) {
    return parent ? parent.parentId : ROOT_FOLDER;
  }

  private getQuery(parent?: gapi.client.drive.File) {
    const queries = [];
    queries.push(FOLDER_MIME_TYPE);
    queries.push(FOLDER_PARENT.replace('{0}', parent ? parent.id : 'root'));

    return queries.join(' and ');
  }

  private getFolderListWithParent(parentId: string, folders) {
    const rootFolder = { id: parentId, name: '..' };

    return [rootFolder].concat(folders);
  }

  private mapToGdriveFiles(folders, parentId: string) {
    return folders.map(folder => new GdriveFile(folder, parentId));
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
