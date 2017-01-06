import { Component } from '@angular/core';
import { GdriveService } from './shared/gdrive/gdrive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private gdriveService: GdriveService) {
    this.gdriveService.init();
  }
}
