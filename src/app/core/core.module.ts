import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from './auth/auth.service';
import { SearchComponent } from '../search/search.component';
import { RouterGuardService } from './router/router-guard.service';
import { LoginComponent } from '../login/login.component';
import { CategoriesComponent } from '../categories/categories.component';

const firebaseConfig = {
  apiKey: 'AIzaSyCTCuZKAWziGCQSGWoGjzt0G8foJ4Zjick',
  authDomain: 'gestdoc-a28c0.firebaseapp.com',
  databaseURL: 'https://gestdoc-a28c0.firebaseio.com',
  storageBucket: 'gestdoc-a28c0.appspot.com',
  messagingSenderId: '714707421933'
};

const routes = [
  { path: '', pathMatch: 'full', redirectTo: '/search' },
  { path: 'search', component: SearchComponent, canActivate: [RouterGuardService] },
  { path: 'categories', component: CategoriesComponent, canActivate: [RouterGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [RouterGuardService] }
];


@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    }),
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthService,
    RouterGuardService
  ],
  declarations: []
})
export class CoreModule {
}
