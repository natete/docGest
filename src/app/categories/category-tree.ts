import { Category } from './category';
export class CategoryTree {

  categories: Array<Category> = [];

  constructor(categories?: Array<any>) {
    categories.forEach(category => {
      if (!category.hasParent()) {
        this.categories.push(category);
      } else {
        const parentId = category.getParentId();

        const parent: Category = this.findParent(parentId);

        parent.children.push(category);
      }
    });
  }

  private findParent(parentId: string): Category {

    let parent: Category = null;

    for (let i = 0; i < this.categories.length && !parent; i++) {
      const category = this.categories[i];

      if (category.$key === parentId) {
        parent = category;
      } else {
        parent = this.findCategoryInChildren(parentId, category);
      }
    }

    return parent;
  }

  private findCategoryInChildren(categoryId: string, category: Category): Category {
    let result: Category = null;

    if (category.children.length > 0) {
      result = category.children.filter(c => c.$key === categoryId)[0];

      if (!result) {
        for (let i = 0; i < category.children.length && !result; i++) {
          result = this.findCategoryInChildren(categoryId, category.children[i]);
        }
      }
    }

    return result;
  }
}
