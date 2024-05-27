import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Importar cada uno de los componentes a los que apuntan las rutas
import {LoginComponent} from './components/login/login.component';
import {RegisterUserComponent} from './components/register-user/register-user.component';
import {RegisterAssociationComponent} from './components/register-association/register-association.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ListAssociationsComponent } from './components/list-associations/list-associations.component';
import {TipoAnimalComponent} from './components/tipo-animal/tipo-animal.component';
import {RazaComponent} from './components/raza/raza.component';
import {AnimalComponent} from './components/animal/animal.component';
import {PerfilAnimalComponent} from './components/perfil-animal/perfil-animal.component';
import {AuthGuard} from './guards/auth.guard';
import {ArchivosAsociacionComponent} from './components/documentos-asociacion/archivos-asociacion.component';
import {DocumentosAnimalComponent} from './components/documentos-animal/documentos-animal.component';
import {AnimalesAsociacionComponent} from './components/animales-asociacion/animales-asociacion.component';
import {SolicitudesAdminComponent} from './components/solicitudes-admin/solicitudes-admin.component';
import {SolicitudesUsuarioComponent} from './components/solicitudes-usuario/solicitudes-usuario.component';
import {SolicitudesAsociacionComponent} from './components/solicitudes-asociacion/solicitudes-asociacion.component';
import {SolicitudesAnimalComponent} from './components/solicitudes-animal/solicitudes-animal.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' }, // Por defecto
  {path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'register-association', component: RegisterAssociationComponent },
  { path: 'list-associations', component: ListAssociationsComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  { path: 'listadoAnimales', component: AnimalComponent, canActivate: [AuthGuard]},
  { path: 'animales-asociacion', component: AnimalesAsociacionComponent, canActivate: [AuthGuard]},
  { path: 'tipo-animal', component: TipoAnimalComponent, canActivate: [AuthGuard] },
  { path: 'raza/:id', component: RazaComponent, canActivate: [AuthGuard] },
  { path: 'animal/:id', component: PerfilAnimalComponent, canActivate: [AuthGuard] },
  { path: 'ArchivosAsociacion', component: ArchivosAsociacionComponent, canActivate: [AuthGuard] },
  { path: 'animal/:id/documentos', component: DocumentosAnimalComponent, canActivate: [AuthGuard] },
  { path: 'solicitudes-admin', component: SolicitudesAdminComponent, canActivate: [AuthGuard] },
  { path: 'solicitudes-user', component: SolicitudesUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'solicitudes-asoc', component: SolicitudesAsociacionComponent, canActivate: [AuthGuard] },
  { path: 'solicitudes-animal/:id', component: SolicitudesAnimalComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
