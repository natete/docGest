import { Component, OnInit, NgZone } from '@angular/core';
import { GdriveService } from '../../shared/gdrive/gdrive.service';
import { GdriveFile } from '../../shared/gdrive/gdrive-file';
import { MdDialogRef } from '@angular/material';
import { SelectionComponent } from '../../shared/selection-component';
import { Observable, Subject } from 'rxjs';
import { SpinnerService } from '../../shared/spinner/spinner.service';

@Component({
  selector: 'app-root-folder-dialog',
  templateUrl: './root-folder-dialog.component.html',
  styleUrls: ['./root-folder-dialog.component.scss']
})
export class RootFolderDialogComponent extends SelectionComponent implements OnInit {

  private foldersStream: Subject<GdriveFile[]> = new Subject<GdriveFile[]>();
  folders: Observable<GdriveFile[]> = this.foldersStream.asObservable();
  openedFolder: GdriveFile;
  isLoading: Observable<boolean>;

  constructor(private gdriveService: GdriveService,
              private zone: NgZone,
              private dialogRef: MdDialogRef<RootFolderDialogComponent>,
              private spinnerService: SpinnerService) {
    super();

    this.gdriveService.folders
        .subscribe(folders => {
          let result: GdriveFile[];
          if (this.openedFolder && this.openedFolder.id !== 'root') {
            const parentFolder = new GdriveFile({ id: this.openedFolder.parentId, name: '..' });
            result = [parentFolder].concat(folders);
          } else {
            result = folders;
          }

          this.zone.run(() => {
            this.foldersStream.next(result);
          });
        });

    this.isLoading = this.spinnerService.isLoading;
  }

  ngOnInit() {
    this.openFolder();
  }

  toggleSelection(item): void {
    super.toggleSelection(item);
  }

  openFolder(folder?): void {
    this.openedFolder = folder;

    this.gdriveService.setOpenedFolder(folder);
  }

  save(): void {
    this.dialogRef.close({
      save: true,
      rootFolderId: this.selectedItem.id,
      rootFolderName: this.selectedItem.name
    });
  }

  cancel(): void {
    this.dialogRef.close({ save: false });
  }
}
