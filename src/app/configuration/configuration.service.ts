import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs';
import { GdriveService } from '../shared/gdrive/gdrive.service';

@Injectable()
export class ConfigurationService {

  private gdriveConfiguration: FirebaseObjectObservable<any>;


  constructor(private database: AngularFireDatabase,
              private gdriveService: GdriveService) {
    this.gdriveConfiguration = this.database.object('/gdriveConfiguration');
  }

  authorizeInGdrive(): void {

    this.gdriveService.authorize();
  }

  isAuthorized(): Observable<boolean> {
    return this.gdriveService.isAuthorized();
  }


  getGdriveConfiguration(): Observable<any> {
    return this.gdriveConfiguration;
  }
}
