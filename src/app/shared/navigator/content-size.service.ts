import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ContentSizeService {

  constructor() {
  }

  getElementWidth(elem: ElementRef): Observable<number> {
    const contentSize = new BehaviorSubject(getContentWidth());

    const width = (contentSize.pluck('width') as Observable<number>).distinctUntilChanged();

    Observable.fromEvent(window, 'resize')
        .map(getContentWidth)
        .subscribe(contentSize);

    function getContentWidth() {
      return {
        width: elem.nativeElement.offsetWidth
      };
    }

    return width;
  }
}
