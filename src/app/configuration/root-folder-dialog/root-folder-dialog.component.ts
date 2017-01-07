import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GdriveService } from '../../shared/gdrive/gdrive.service';
import { GdriveFile } from '../../shared/gdrive/gdrive-file';
import { MdDialogRef } from '@angular/material';
import { SelectionComponent } from '../../shared/selection-component';

@Component({
  selector: 'app-root-folder-dialog',
  templateUrl: './root-folder-dialog.component.html',
  styleUrls: ['./root-folder-dialog.component.scss']
})
export class RootFolderDialogComponent extends SelectionComponent implements OnInit {

  folders: GdriveFile[];
  loading: boolean = true;

  constructor(private gdriveService: GdriveService,
              private changeDetector: ChangeDetectorRef,
              private dialogRef: MdDialogRef<RootFolderDialogComponent>) {
    super();
  }

  ngOnInit() {
    this.openFolder();
  }

  toggleSelection(item): void {
    super.toggleSelection(item);
    this.changeDetector.detectChanges();
  }

  openFolder(folder?): void {
    this.loading = true;
    this.changeDetector.detectChanges();
    this.gdriveService.getSubFolders(folder).subscribe(folders => {
      if (folder) {
        folder.name = '';
        this.folders = [folder].concat(folders);
      } else {
        this.folders = folders;
      }
      this.loading = false;
      this.changeDetector.detectChanges();
    });
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
