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
import { ArchivosAsociacionComponent } from './components/documentos-asociacion/archivos-asociacion.component';
import { FormSubirArchivoAsocComponent } from './components/form-subir-archivo-asoc/form-subir-archivo-asoc.component';
import { FormEditarArchivoAsocComponent } from './components/form-editar-archivo-asoc/form-editar-archivo-asoc.component';
import { DocumentosAnimalComponent } from './components/documentos-animal/documentos-animal.component';
import { FormSubirDocumentoAnimalComponent } from './components/form-subir-documento-animal/form-subir-documento-animal.component';
import {FormEditarDocumentoAnimalComponent} from './components/form-editar-documento-animal/form-editar-documento-animal.component';
import { AnimalesAsociacionComponent } from './components/animales-asociacion/animales-asociacion.component';
import { SolicitudesAdminComponent } from './components/solicitudes-admin/solicitudes-admin.component';
import { SolicitudesUsuarioComponent } from './components/solicitudes-usuario/solicitudes-usuario.component';
import { SolicitudesAnimalComponent } from './components/solicitudes-animal/solicitudes-animal.component';
import { SolicitudesAsociacionComponent } from './components/solicitudes-asociacion/solicitudes-asociacion.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';



@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AppComponent, LoginComponent, RegisterUserComponent, RegisterAssociationComponent, FormPerfilAsociacionComponent, FormPerfilPersonaComponent, PerfilComponent, NavbarComponent, ListAssociationsComponent, AnimalComponent, FormCrearAnimalComponent, PaginacionComponent, FormEditarAnimalComponent, PerfilAnimalComponent, TipoAnimalComponent, RazaComponent, FooterComponent, ArchivosAsociacionComponent, FormSubirArchivoAsocComponent, FormEditarArchivoAsocComponent, DocumentosAnimalComponent, FormSubirDocumentoAnimalComponent, FormEditarDocumentoAnimalComponent, AnimalesAsociacionComponent, SolicitudesAdminComponent, SolicitudesUsuarioComponent, SolicitudesAnimalComponent, SolicitudesAsociacionComponent, LandingPageComponent ],
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
