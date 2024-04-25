import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar cada uno de los componentes a los que apuntan las rutas
import {LoginComponent} from './components/login/login.component';
import {RegisterUserComponent} from "./components/register-user/register-user.component";
import {RegisterAssociationComponent} from "./components/register-association/register-association.component";
import {ListAssociationsComponent} from "./components/list-associations/list-associations.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Por defecto
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'register-association', component: RegisterAssociationComponent },
  { path: 'list-associations', component: ListAssociationsComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
