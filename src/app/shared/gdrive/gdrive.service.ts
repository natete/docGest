import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const CLIENT_ID = '714707421933-9nqjome3tjml56epmet0c860c43tbjnt.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

@Injectable()
export class GdriveService {

  private authState: Subject<GoogleApiOAuth2TokenObject> = new Subject<GoogleApiOAuth2TokenObject>();

  constructor() {
  }

  init(): void {
    const authConfig = {
      client_id: CLIENT_ID,
      scope: SCOPES.join(' '),
      immediate: true
    };

    gapi.auth.authorize(authConfig, (authResult) => this.manageAuth(authResult));
  }

  authorize(): void {

    const authConfig = {
      client_id: CLIENT_ID,
      scope: SCOPES.join(' '),
      immediate: false
    };

    gapi.auth.authorize(authConfig, (authResult) => this.manageAuth(authResult));
  }

  isAuthorized(): Observable<boolean> {
    return this.mapAuthStateToBoolean();
  }

  private manageAuth(authResult: GoogleApiOAuth2TokenObject) {
    if (authResult && !authResult.error) {
      this.authState.next(authResult);
    } else {
      this.authState.next(null);
    }
  }

  private mapAuthStateToBoolean(): Observable<boolean> {
    return this.authState
        .asObservable()
        .map(authState => authState && !authState.error);
  }
}
