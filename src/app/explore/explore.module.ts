import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { ExploreService } from './explore.service';
import { MaterialModule } from '@angular/material';
import { NavigatorModule } from '../shared/navigator/navigator.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    NavigatorModule
  ],
  declarations: [ExploreComponent],
  providers: [ExploreService]
})
export class ExploreModule {
}
