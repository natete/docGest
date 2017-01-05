import { Injectable } from '@angular/core';
import { AuthProviders, FirebaseAuth } from 'angularfire2';
import { Observable } from 'rxjs';
import { User } from './user';


@Injectable()
export class AuthService {

  // private authState: Subject<User> = new Subject<User>();
  private user: Observable<User>;

  constructor(private firebaseAuth: FirebaseAuth) {
    this.user = this.firebaseAuth
        .asObservable()
        .map(googleUser => googleUser ? new User(googleUser) : googleUser);
  }

  login() {
    this.firebaseAuth.login({
      provider: AuthProviders.Google
    });
  }

  logout(): Observable<boolean> {
    this.firebaseAuth.logout();

    return this.user
        .map(authState => {
          return !authState
        });
  }

  getUser(): Observable<User> {
    return this.user;
  }

  isAuthenticated(): Observable<boolean> {
    return this.firebaseAuth
        .asObservable()
        .map(authState => !!authState);
  }
}
