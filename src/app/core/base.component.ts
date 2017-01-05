import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class BaseComponent implements OnDestroy {

  protected subscriptions: Array<Subscription> = [];

  constructor() {
  }

  ngOnDestroy(): void {
    this.subscriptions
        .forEach(subscription => subscription.unsubscribe());
  }

  protected addSubscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }
}