import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GdriveFile } from './gdrive-file';
import { SpinnerService } from '../spinner/spinner.service';

const CLIENT_ID = '714707421933-9nqjome3tjml56epmet0c860c43tbjnt.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const FOLDER_MIME_TYPE = 'mimeType=\'application/vnd.google-apps.folder\'';
const FILE_MIME_TYPE = 'mimeType!=\'application/vnd.google-apps.folder\'';
const FOLDER_PARENT = '\'{0}\' in parents';
const ROOT_FOLDER = 'root';

@Injectable()
export class GdriveService {

  private authState: Subject<GoogleApiOAuth2TokenObject> = new Subject<GoogleApiOAuth2TokenObject>();
  private currentFile: GdriveFile;
  private currentFolderStream: Subject<any> = new Subject<any>();
  private foldersStream: Subject<GdriveFile[]> = new Subject<GdriveFile[]>();
  folders: Observable<GdriveFile[]> = this.foldersStream.asObservable();
  private filesStream: Subject<GdriveFile[]> = new Subject<GdriveFile[]>();
  files: Observable<GdriveFile[]> = this.filesStream.asObservable();
  private fileStream: Subject<GdriveFile> = new Subject<GdriveFile>();
  file: Observable<GdriveFile> = this.fileStream.asObservable();


  constructor(private zone: NgZone,
              private spinnerService: SpinnerService) {
    this.currentFolderStream.subscribe(update => {
      this.updateFolders(update.folder);
      if (update.updateFiles) {
        this.updateFiles(update.folder);
      }
    });
  }

  init(): void {
    const authConfig = {
      client_id: CLIENT_ID,
      scope: SCOPES.join(' '),
      immediate: true
    };

    this.spinnerService.addLoadingThread();
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

  setOpenedFolder(folder?: GdriveFile, updateFiles?: boolean): void {
    this.currentFolderStream.next({ folder: folder, updateFiles: updateFiles });
  }

  openFile(fileId: string): void {
    if (this.currentFile && this.currentFile.id === fileId) {
      this.fileStream.next(this.currentFile);
    } else {
      this.spinnerService.addLoadingThread();
      const params = {
        fileId: fileId,
        fields: 'id,name,mimeType,thumbnailLink'
      };

      gapi.client.drive.files.get(params).execute(response => {
        if (!!response && response.result) {
          const requestedFile = new GdriveFile(response.result);
          this.zone.run(() => {
            this.fileStream.next(requestedFile);
            this.currentFile = requestedFile;
            this.spinnerService.removeLoadingThread();
          });
        } else {
          this.zone.run(() => this.spinnerService.removeLoadingThread());
        }
      });
    }
  }

  setCurrentFile(file: GdriveFile): void {
    this.fileStream.next(file);
  }

  private updateFolders(folder?: GdriveFile): void {
    this.spinnerService.addLoadingThread();

    const openedFolder: GdriveFile = this.getOpenedFolderId(folder);

    const q = this.getFolderQuery(folder);

    const params = {
      q: q,
      orderBy: 'name'
    };

    gapi.client.drive.files.list(params)
        .execute(response => {
          if (!!response && response.result) {
            const responseFolders = response.result.files || [];
            const mappedFolders = this.mapToGdriveFiles(responseFolders, openedFolder);
            this.zone.run(() => {
              this.foldersStream.next(mappedFolders);
              this.spinnerService.removeLoadingThread();
            });
          } else {
            this.zone.run(() => this.spinnerService.removeLoadingThread());
          }
        });
  }

  private updateFiles(folder?: GdriveFile): void {
    this.spinnerService.addLoadingThread();

    const q = this.getFileQuery(folder);

    const params = {
      q: q,
      orderBy: 'name',
      fields: 'files(id,name,mimeType,thumbnailLink)'
    };

    gapi.client.drive.files.list(params)
        .execute(response => {
          if (!!response && response.result) {
            const responseFolders = response.result.files || [];
            const mappedFolders = this.mapToGdriveFiles(responseFolders);
            this.zone.run(() => {
              this.filesStream.next(mappedFolders);
              this.spinnerService.removeLoadingThread();
            });
          } else {
            this.zone.run(() => this.spinnerService.removeLoadingThread());
          }
        });
  }

  private getOpenedFolderId(openedFolder?: GdriveFile): GdriveFile {
    if (openedFolder) {
      return new GdriveFile({ id: openedFolder.id, name: openedFolder.name });
    } else {
      return new GdriveFile({ id: ROOT_FOLDER, name: ROOT_FOLDER });
    }
  }

  private getFolderQuery(parentFolder?: GdriveFile) {
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

  private mapToGdriveFiles(folders, parentFolder?: GdriveFile): GdriveFile[] {
    return folders.map(folder => new GdriveFile(folder, parentFolder));
  }

  private manageAuth(authResult: GoogleApiOAuth2TokenObject) {
    if (authResult && !authResult.error) {
      this.authState.next(authResult);
    } else {
      this.authState.next(null);
    }
    this.spinnerService.removeLoadingThread();
  }

  private mapAuthStateToBoolean(): Observable<boolean> {
    return this.authState
        .asObservable()
        .map(authState => authState && !authState.error);
  }
}
