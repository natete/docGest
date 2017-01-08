import { Injectable } from '@angular/core';
import { GdriveService } from '../shared/gdrive/gdrive.service';
import { AngularFireDatabase } from 'angularfire2';
import { GdriveFile } from '../shared/gdrive/gdrive-file';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class ExploreService {
  private baseFolder: Observable<GdriveFile>;
  private openedFolder = new ReplaySubject<any>(1);
  private configBaseFolderId: string;

  constructor(private database: AngularFireDatabase,
              private gdriveService: GdriveService) {
    this.baseFolder = this.database.object('/gdriveConfiguration')
        .map(config => {
          this.configBaseFolderId = config.rootFolderId;
          return new GdriveFile({ id: config.rootFolderId, name: config.rootFolderName });
        });

    this.baseFolder.subscribe(folder => this.updateOpenedFolder(folder));
  }

  folder(): Observable<any> {
    return this.openedFolder.asObservable();
  }

  openFolder(folder: GdriveFile) {
    this.updateOpenedFolder(folder);
  }

  setCurrentFile(file: GdriveFile) {
    this.gdriveService.setCurrentFile(file);
  }

  private updateOpenedFolder(folder: GdriveFile): void {

    const foldersObservable = this.gdriveService.getSubFolders(folder);

    const filesObservable = this.gdriveService.getFiles(folder);

    Observable
        .combineLatest(foldersObservable, filesObservable)
        .map(result => {
          return {
            parentFolder: folder,
            folders: result[0],
            files: result[1]
          };
        })
        .map(result => this.addParentIfNeeded(result))
        .subscribe(result => this.openedFolder.next(result));
  }

  private addParentIfNeeded(result: any) {
    if (result.parentFolder.id !== this.configBaseFolderId) {
      const parentFolder = { id: result.parentFolder.parentId, name: '..' };

      return {
        parentFolder: result.parentFolder,
        folders: [parentFolder].concat(result.folders),
        files: result.files
      };
    } else {
      return result;
    }
  }
}
