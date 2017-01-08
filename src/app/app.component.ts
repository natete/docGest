import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GdriveService } from './shared/gdrive/gdrive.service';
import { Router, NavigationEnd } from '@angular/router';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sideNav: MdSidenav;

  constructor(private gdriveService: GdriveService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
    this.gdriveService.init();

    this.router.events
        .filter(e => e instanceof NavigationEnd)
        .map((e: NavigationEnd) => e.url.indexOf('(sidebar:') !== -1)
        .subscribe(isOpen => {
          this.sideNav.toggle(isOpen);
          this.changeDetectorRef.detectChanges();
        });
  }
}
