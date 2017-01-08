import { Component, OnInit } from '@angular/core';
import { Category } from '../categories/category';
import { ActivatedRoute } from '@angular/router';
import { FileDetails } from './file-details';
import { FileDetailsService } from './file-details.service';
import { BaseComponent } from '../core/base.component';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent extends BaseComponent implements OnInit {

  categories: Array<Category> = [];
  file: FileDetails;

  constructor(private route: ActivatedRoute,
              private fileDetailsService: FileDetailsService) {
    super();

    this.fileDetailsService.file.subscribe(file => {
      this.file = file;
      // this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit() {
    const subscription = this.route.params
        .subscribe(params => {
          if (this.file) {
            this.fileDetailsService.saveFile(this.file);
          }

          this.updateFile(params['file']);
        });

    this.addSubscription(subscription);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    // this.changeDetectorRef.detach();
    this.fileDetailsService.saveFile(this.file);
  }

  updateFile(fileId: string) {
    this.fileDetailsService.updateFileId(fileId);
  }
}
