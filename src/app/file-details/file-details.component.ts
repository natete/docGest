import { Component, OnInit } from '@angular/core';
import { Category } from '../categories/category';
import { ActivatedRoute, Router } from '@angular/router';
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
              private fileDetailsService: FileDetailsService,
              private router: Router) {
    super();

    const fileSubscription = this.fileDetailsService.file.subscribe(file => {
      file ? this.file = file : null;
    });

    this.addSubscription(fileSubscription);

    const categoriesSubscription = this.fileDetailsService.categories
        .subscribe(categories => this.categories = categories);

    this.addSubscription(categoriesSubscription);
  }

  ngOnInit() {
    const subscription = this.route.params
        .subscribe(params => {
          if (this.file) {
            this.fileDetailsService.saveFile(this.file)
                .then(() => this.updateFile(params['file']));
          } else {
            this.updateFile(params['file']);
          }
        });

    this.addSubscription(subscription);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.fileDetailsService.saveFile(this.file);
  }

  updateFile(fileId: string) {
    this.fileDetailsService.updateFileId(fileId);
  }

  closeDetails() {
    this.router.navigate([{ outlets: { sidebar: null } }]);
  }

  toggleCategory(category: Category) {
    const index = this.file.categories.indexOf(category.$key);
    if (index === -1) {
      this.file.categories.push(category.$key)
    } else {
      this.file.categories.splice(index, 1);
    }
  }

  getMargin(category: Category): string {
    return `${-25 + 20 * category.getNumberOfParents()}px`;
  }
}
