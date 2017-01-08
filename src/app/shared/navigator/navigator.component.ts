import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { GdriveFile } from '../gdrive/gdrive-file';
import { ContentSizeService } from './content-size.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements AfterViewInit {

  @Input() items: GdriveFile[];
  @Input() icon: string;
  @Input() title: string;
  @Input() showThumbnail: boolean;
  @Output() itemClicked = new EventEmitter();
  @Output() itemDblClicked = new EventEmitter();

  @ViewChild('container') container: ElementRef;
  columns: number = 5;

  constructor(private contentSizeService: ContentSizeService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.contentSizeService.getElementWidth(this.container).subscribe(width => {
      this.columns = Math.floor(width / 170) || 1;
      this.changeDetectorRef.detectChanges();
    });
  }

  onClick(item): void {
    this.itemClicked.emit(item);
  }

  onDblClick(item) {
    this.itemDblClicked.emit(item);
  }
}
