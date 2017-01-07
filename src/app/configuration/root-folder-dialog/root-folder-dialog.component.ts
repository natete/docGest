import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GdriveService } from '../../shared/gdrive/gdrive.service';
import { GdriveFile } from '../../shared/gdrive/gdrive-file';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-root-folder-dialog',
  templateUrl: './root-folder-dialog.component.html',
  styleUrls: ['./root-folder-dialog.component.scss']
})
export class RootFolderDialogComponent implements OnInit {

  folders: GdriveFile[];
  selectedFolder: GdriveFile;
  loading: boolean = true;

  constructor(private gdriveService: GdriveService,
              private changeDetector: ChangeDetectorRef,
              private dialogRef: MdDialogRef<RootFolderDialogComponent>) {
  }

  ngOnInit() {
    this.openFolder();
  }

  toggleSelection(folder): void {

    if (this.selectedFolder) {
      this.selectedFolder.selected = false;
    }

    if (this.selectedFolder === folder) {
      this.selectedFolder = null;
      folder.selected = false;
    } else {
      this.selectedFolder = folder;
      folder.selected = true;
    }
    this.changeDetector.detectChanges();
  }

  openFolder(folder?): void {
    this.loading = true;
    this.changeDetector.detectChanges();
    this.gdriveService.getSubFolders(folder).subscribe(folders => {
      this.folders = folders;
      this.loading = false;
      this.changeDetector.detectChanges();
    });
  }

  save(): void {
    this.dialogRef.close({
      save: true,
      rootFolderId: this.selectedFolder.id,
      rootFolderName: this.selectedFolder.name
    });
  }

  cancel(): void {
    this.dialogRef.close({ save: false });
  }
}
