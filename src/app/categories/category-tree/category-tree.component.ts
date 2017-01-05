import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Output } from '@angular/core/src/metadata/directives';
import { Category } from '../category';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit {

  @Input() category: Category;
  children: Array<Category> = [];
  @Output() addCategory = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.children = this.category.children;
  }

  add(): void {
    this.addCategory.emit(this.category);
  }

  onAdd(parent): void {
    this.addCategory.emit(parent);
  }
}
