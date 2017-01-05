import { Component } from '@angular/core';
import { CategoriesService } from './categories.service';
import { BaseComponent } from '../core/base.component';
import { Observable } from 'rxjs';
import { Category } from './category';
import { MdDialog } from '@angular/material';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BaseComponent {

  categoryTree: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService,
              private dialog: MdDialog) {
    super();

    this.categoryTree = this.categoriesService
        .getCategories();
  }

  ngOnInit() {
  }

  addCategory(parent): void {
    let dialogRef = this.dialog.open(CategoryDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result.save) {
        this.categoriesService.addCategory(result.name, parent);
        // this.categoryAdded.emit({ categoryName: result.name, parent: this.category });
      }
    });
  }

  // add(event): void {
  //   this.categoriesService.add(event.name, event.parent);
  // }
}
