import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  @Input() name: string;

  constructor(public dialogRef: MdDialogRef<CategoryDialogComponent>) {
  }

  ngOnInit() {
  }

  save(): void {
    this.dialogRef.close({
      save: true,
      name: this.name
    });
  }

  cancel(): void {
    this.dialogRef.close({ save: false });
  }
}
