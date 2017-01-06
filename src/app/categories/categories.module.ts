import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { CategoriesService } from './categories.service';
import { CategoriesComponent } from './categories.component';
import { CategoryTreeComponent } from './category-tree/category-tree.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { FormsModule } from '@angular/forms';
import { DatabaseModule } from '../shared/database/database.module';

@NgModule({
  imports: [
    CommonModule,
    DatabaseModule,
    FormsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    CategoriesComponent,
    CategoryTreeComponent,
    CategoryDialogComponent
  ],
  entryComponents: [CategoryDialogComponent],
  providers: [CategoriesService]
})
export class CategoriesModule {
}
