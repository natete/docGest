import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ConfigurationService } from './configuration.service';
import { ConfigurationComponent } from './configuration.component';
import { DatabaseModule } from '../shared/database/database.module';
import { GdriveModule } from '../shared/gdrive/gdrive.module';
import { RootFolderDialogComponent } from './root-folder-dialog/root-folder-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    DatabaseModule,
    GdriveModule,
    FormsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    ConfigurationComponent,
    RootFolderDialogComponent
  ],
  entryComponents: [RootFolderDialogComponent],
  providers: [ConfigurationService]
})
export class ConfigurationModule {
}
