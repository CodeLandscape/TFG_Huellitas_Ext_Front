import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar cada uno de los componentes a los que apuntan las rutas
import {LoginComponent} from './components/login/login.component';
import {RegisterUserComponent} from './components/register-user/register-user.component';
import {RegisterAssociationComponent} from './components/register-association/register-association.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ListAssociationsComponent } from './components/list-associations/list-associations.component';
import {TipoAnimalComponent} from './components/tipo-animal/tipo-animal.component';
import {RazaComponent} from './components/raza/raza.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Por defecto
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'register-association', component: RegisterAssociationComponent },
  { path: 'list-associations', component: ListAssociationsComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'tipo-animal', component: TipoAnimalComponent },
  { path: 'raza/:id', component: RazaComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
