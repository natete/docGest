import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExploreService } from './explore.service';
import { GdriveFile } from '../shared/gdrive/gdrive-file';
import { SelectionComponent } from '../shared/selection-component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent extends SelectionComponent implements OnInit {

  parentFolder: GdriveFile;
  folders: GdriveFile[];
  files: GdriveFile[];
  loading: boolean = true;
  // selectedFile: GdriveFile;

  constructor(private exploreService: ExploreService,
              private changeDetector: ChangeDetectorRef) {
    super();

    const subscription = this.exploreService.folder()
        .subscribe(response => this.mapFolderResponse(response));

    this.addSubscription(subscription);
  }

  ngOnInit() {
  }

  openFolder(folder: GdriveFile) {
    this.loading = true;
    if (folder.name = '..') {
      folder.name = this.parentFolder.parentName;
    }
    this.exploreService.openFolder(folder);
  }

  toggleSelection(item) {
    super.toggleSelection(item);
    this.changeDetector.detectChanges();
  }

  private mapFolderResponse(response) {
    this.parentFolder = response.parentFolder;
    this.folders = response.folders;
    this.files = response.files;
    this.loading = false;
    this.changeDetector.detectChanges();
  }
}
