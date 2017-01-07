import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GdriveFile } from '../gdrive/gdrive-file';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {

  @Input() items: GdriveFile[];
  @Input() icon: string;
  @Input() title: string;
  @Input() loading: boolean;
  @Output() itemClicked = new EventEmitter();
  @Output() itemDblClicked = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onClick(item): void {
    this.itemClicked.emit(item);
  }

  onDblClick(item) {
    this.itemDblClicked.emit(item);
  }
}
