import { Injectable } from '@angular/core';
import { GdriveService } from '../shared/gdrive/gdrive.service';
import { AngularFireDatabase } from 'angularfire2';
import { GdriveFile } from '../shared/gdrive/gdrive-file';
import { Observable } from 'rxjs';

@Injectable()
export class ExploreService {
  private baseFolder: Observable<GdriveFile>;
  private configBaseFolderId: string;
  private openedFolder: GdriveFile;
  folders: Observable<GdriveFile[]>;
  files: Observable<GdriveFile[]>;


  constructor(private database: AngularFireDatabase,
              private gdriveService: GdriveService) {

    this.baseFolder = this.database.object('/gdriveConfiguration')
        .map(config => {
          this.configBaseFolderId = config.rootFolderId;
          return new GdriveFile({ id: config.rootFolderId, name: config.rootFolderName });
        });

    this.baseFolder.subscribe(folder => this.openFolder(folder));

    this.folders = this.gdriveService.folders.map(folders => {
      return this.addParentIfNeeded(folders);
    });

    this.files = this.gdriveService.files;
  }

  openFolder(folder?: GdriveFile) {
    const folderToOpen = folder || new GdriveFile({ id: this.configBaseFolderId });
    if (folderToOpen.id) {
      this.openedFolder = folderToOpen;
      this.gdriveService.setOpenedFolder(folderToOpen, true);
    }
  }

  setCurrentFile(file: GdriveFile) {
    this.gdriveService.setCurrentFile(file);
  }

  private addParentIfNeeded(folders: GdriveFile[]): GdriveFile[] {
    let result: GdriveFile[];

    if (this.openedFolder.id !== this.configBaseFolderId) {
      result = [new GdriveFile({ id: this.openedFolder.parentId, name: '..' })].concat(folders);
    } else {
      result = folders;
    }

    return result;
  }
}
