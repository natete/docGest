import { NgModule } from '@angular/core';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

const firebaseConfig = {
  apiKey: 'AIzaSyCTCuZKAWziGCQSGWoGjzt0G8foJ4Zjick',
  authDomain: 'gestdoc-a28c0.firebaseapp.com',
  databaseURL: 'https://gestdoc-a28c0.firebaseio.com',
  storageBucket: 'gestdoc-a28c0.appspot.com',
  messagingSenderId: '714707421933'
};


@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    }),
  ],
  exports: [],
  providers: [],
  declarations: []
})
export class DatabaseModule {
}
