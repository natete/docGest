import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Category } from './category';
import { CategoryTree } from './category-tree';

@Injectable()
export class CategoriesService {

  private categories: FirebaseListObservable<Category[]>;

  constructor(private database: AngularFireDatabase) {
    this.categories = this.database.list('/categories');
  }

  getCategories(): Observable<Category[]> {
    return this.categories
        .map(categories => new CategoryTree(categories.map(dbCategory => new Category(dbCategory))))
        .map(categoryTree => categoryTree.categories);
  }

  addCategory(caetegoryName: string, parent: Category) {
    const category = new Category();
    category.name = caetegoryName;

    if (parent) {
      category.path = parent.getFullPath();
      category.namesPath = parent.getFullNamesPath();
    }

    this.categories.push(category.toDbCategory());
  }
}
