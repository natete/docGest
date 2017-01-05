import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { CategoriesModule } from './categories/categories.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    CategoriesModule,
    CoreModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
