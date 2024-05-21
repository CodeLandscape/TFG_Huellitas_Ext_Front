import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Modules */
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

/* Services / Providers */
import { HttpClient } from '@angular/common/http';
import { ComunService } from './services/comun.service';
import { ConfigService } from './services/config.service';
import { CookieService } from 'ng2-cookies';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterUserComponent} from './components/register-user/register-user.component';
import { RegisterAssociationComponent } from './components/register-association/register-association.component';
import { FormPerfilAsociacionComponent } from './components/form-perfil-asociacion/form-perfil-asociacion.component';
import { FormPerfilPersonaComponent } from './components/form-perfil-persona/form-perfil-persona.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListAssociationsComponent} from './components/list-associations/list-associations.component';
import { AnimalComponent } from './components/animal/animal.component';
import { FormCrearAnimalComponent } from './components/form-crear-animal/form-crear-animal.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {PaginacionComponent} from './components/paginacion/paginacion.component';
import {FormEditarAnimalComponent} from './components/form-editar-animal/form-editar-animal.component';
import { PerfilAnimalComponent } from './components/perfil-animal/perfil-animal.component';
import { TipoAnimalComponent } from './components/tipo-animal/tipo-animal.component';
import { RazaComponent } from './components/raza/raza.component';
import {AuthTokenService} from './services/auth-token.service';
import {interceptorProvider} from './interceptors/prod-interceptor.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { SolicitudesAdminComponent } from './components/solicitudes-admin/solicitudes-admin.component';
import { SolicitudesUsuarioComponent } from './components/solicitudes-usuario/solicitudes-usuario.component';



@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterUserComponent, RegisterAssociationComponent, FormPerfilAsociacionComponent, FormPerfilPersonaComponent, PerfilComponent, NavbarComponent, ListAssociationsComponent, AnimalComponent, FormCrearAnimalComponent, PaginacionComponent, FormEditarAnimalComponent, PerfilAnimalComponent, TipoAnimalComponent, RazaComponent, FooterComponent, SolicitudesAdminComponent, SolicitudesUsuarioComponent  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  providers: [
    interceptorProvider,
    AuthTokenService,
    ComunService,
    HttpClient,
    CookieService,
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
