import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExploreService } from './explore.service';
import { GdriveFile } from '../shared/gdrive/gdrive-file';
import { SelectionComponent } from '../shared/selection-component';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private exploreService: ExploreService,
              private changeDetector: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    const subscription = this.exploreService.folder()
        .subscribe(response => this.mapFolderResponse(response));

    this.addSubscription(subscription);
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
    this.exploreService.setCurrentFile(item);
    this.router.navigate([{ outlets: { sidebar: ['details', item.id] } }]);
  }

  private mapFolderResponse(response) {
    this.parentFolder = response.parentFolder;
    this.folders = response.folders;
    this.files = response.files;
    this.loading = false;
    this.changeDetector.detectChanges();
  }
}
