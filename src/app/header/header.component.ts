import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { BaseComponent } from '../core/base.component';
import { User } from '../core/auth/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent {

  user: User;

  constructor(private authService: AuthService,
              private router: Router) {
    super();
    const subscription = this.authService
        .getUser()
        .subscribe((user: User) => this.user = user);

    this.addSubscription(subscription);
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    const subscription = this.authService
        .logout()
        .subscribe(isLoggedOut => {
          isLoggedOut && this.router.navigate(['/login'])
        });

    this.addSubscription(subscription);
  }
}
