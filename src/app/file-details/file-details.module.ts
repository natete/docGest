import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDetailsComponent } from './file-details.component';
import { MaterialModule } from '@angular/material';
import { FileDetailsService } from './file-details.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule.forRoot()
  ],
  declarations: [FileDetailsComponent],
  providers: [FileDetailsService]
})
export class FileDetailsModule {
}
