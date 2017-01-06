import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../core/base.component';
import { ConfigurationService } from './configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent extends BaseComponent implements OnInit {

  isAuthorized: boolean = true;

  constructor(private configurationService: ConfigurationService, private changeDetector: ChangeDetectorRef) {
    super();

    const subscription = this.configurationService.isAuthorized().subscribe(isAuthorized => {
      this.isAuthorized = isAuthorized;
      this.changeDetector.detectChanges();
    });

    this.addSubscription(subscription);
  }

  ngOnInit() {
  }

  authorize(): void {
    this.configurationService.authorizeInGdrive();
  }
}
