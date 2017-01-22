import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SpinnerService {

  private loadingStream: Subject<boolean> = new Subject<boolean>();
  isLoading: Observable<boolean> = this.loadingStream.asObservable();
  private loadingThreads: number = 0;

  constructor() {
  }

  addLoadingThread() {
    this.loadingThreads++;
    this.loadingStream.next(this.loadingThreads > 0);
  }

  removeLoadingThread() {
    this.loadingThreads--;
    this.loadingStream.next(this.loadingThreads > 0);
  }
}
