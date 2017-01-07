import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { CategoriesModule } from './categories/categories.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ExploreModule } from './explore/explore.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SearchComponent
  ],
  imports: [
    CategoriesModule,
    ConfigurationModule,
    CoreModule,
    ExploreModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
