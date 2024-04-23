import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Modules */
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

/* Services / Providers */
// import { AuthTokenService } from './services/authToken.service';
import { HttpClient } from '@angular/common/http';
// import { ComunService } from './services/comun.service';
import { ConfigService } from './services/config.service';
import { CookieService } from 'ng2-cookies';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterUserComponent} from "./components/register-user/register-user.component";
import { RegisterAssociationComponent } from './components/register-association/register-association.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterUserComponent, RegisterAssociationComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    // AuthTokenService,
    // ComunService,
    HttpClient,
    CookieService,
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
