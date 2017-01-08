import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { ExploreService } from './explore.service';
import { MaterialModule } from '@angular/material';
import { NavigatorModule } from '../shared/navigator/navigator.module';
import { FileDetailsModule } from '../file-details/file-details.module';

@NgModule({
  imports: [
    CommonModule,
    FileDetailsModule,
    MaterialModule.forRoot(),
    NavigatorModule
  ],
  declarations: [ExploreComponent],
  providers: [ExploreService]
})
export class ExploreModule {
}
