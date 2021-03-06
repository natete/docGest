import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../../search/search.component';
import { RouterGuardService } from './router-guard.service';
import { CategoriesComponent } from '../../categories/categories.component';
import { ConfigurationComponent } from '../../configuration/configuration.component';
import { LoginComponent } from '../../login/login.component';
import { ExploreComponent } from '../../explore/explore.component';
import { FileDetailsComponent } from '../../file-details/file-details.component';

const routes = [
  { path: '', pathMatch: 'full', redirectTo: '/search' },
  { path: 'search', component: SearchComponent, canActivate: [RouterGuardService] },
  { path: 'categories', component: CategoriesComponent, canActivate: [RouterGuardService] },
  { path: 'configuration', component: ConfigurationComponent, canActivate: [RouterGuardService] },
  { path: 'explore', component: ExploreComponent, canActivate: [RouterGuardService] },
  { path: 'details/:file', component: FileDetailsComponent, outlet: 'sidebar' },
  { path: 'login', component: LoginComponent, canActivate: [RouterGuardService] }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    RouterGuardService
  ],
  declarations: []
})
export class RoutesModule {
}
