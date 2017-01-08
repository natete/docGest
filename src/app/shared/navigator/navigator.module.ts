import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorComponent } from './navigator.component';
import { MaterialModule } from '@angular/material';
import { ContentSizeService } from './content-size.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot()
  ],
  exports: [NavigatorComponent],
  declarations: [NavigatorComponent],
  providers: [ContentSizeService]
})
export class NavigatorModule {
}
