import { Component, OnInit } from '@angular/core';
import { ExploreService } from './explore.service';
import { GdriveFile } from '../shared/gdrive/gdrive-file';
import { SelectionComponent } from '../shared/selection-component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpinnerService } from '../shared/spinner/spinner.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent extends SelectionComponent implements OnInit {

  parentFolder: GdriveFile;
  isLoading: Observable<boolean>;
  folders: Observable<GdriveFile[]>;
  files: Observable<GdriveFile[]>;

  constructor(private exploreService: ExploreService,
              private router: Router,
              private spinnerService: SpinnerService) {
    super();

    this.folders = this.exploreService.folders;
    this.files = this.exploreService.files;
    this.isLoading = this.spinnerService.isLoading;
  }

  ngOnInit() {
    this.exploreService.openFolder();
  }

  openFolder(folder?: GdriveFile) {
    this.exploreService.openFolder(folder);
    this.parentFolder = folder.name === '..' ? null : folder;
  }

  toggleSelection(item) {
    super.toggleSelection(item);
    // this.exploreService.setCurrentFile(item);
    this.router.navigate([{ outlets: { sidebar: ['details', item.id] } }]);
  }
}
