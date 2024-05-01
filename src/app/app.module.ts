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
import { FormPerfilAsociacionComponent } from './components/form-perfil-asociacion/form-perfil-asociacion.component';
import { FormPerfilPersonaComponent } from './components/form-perfil-persona/form-perfil-persona.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListAssociationsComponent} from './components/list-associations/list-associations.component';
import { TipoAnimalComponent } from './components/tipo-animal/tipo-animal.component';



@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterUserComponent, RegisterAssociationComponent, FormPerfilAsociacionComponent, FormPerfilPersonaComponent, PerfilComponent, NavbarComponent, ListAssociationsComponent, TipoAnimalComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
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
