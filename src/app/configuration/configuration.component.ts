import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../core/base.component';
import { ConfigurationService } from './configuration.service';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Configuration } from './configuration';
import { RootFolderDialogComponent } from './root-folder-dialog/root-folder-dialog.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent extends BaseComponent implements OnInit {

  isAuthorized: boolean = true;
  configuration: Configuration = new Configuration();

  constructor(private configurationService: ConfigurationService,
              private dialog: MdDialog) {
    super();

    const authSubscription = this.configurationService.isAuthorized()
        .subscribe(isAuthorized => this.isAuthorized = isAuthorized);

    const configSubscription = this.configurationService
        .getGdriveConfiguration()
        .subscribe(configuration => this.configuration = configuration);

    this.addSubscription(authSubscription);
    this.addSubscription(configSubscription);
  }

  ngOnInit() {
  }

  authorize(): void {
    this.configurationService.authorizeInGdrive();
  }

  selectGdriveRootFolder(): void {
    const dialogConfig: MdDialogConfig = new MdDialogConfig();
    dialogConfig.height = '75%';
    dialogConfig.width = '60%';

    const dialogRef = this.dialog.open(RootFolderDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result.save) {
        this.configuration.rootFolderId = result.rootFolderId;
        this.configuration.rootFolderName = result.rootFolderName;

        this.configurationService.updateGdriveConfiguration(this.configuration);
      }
    });
  }
}
