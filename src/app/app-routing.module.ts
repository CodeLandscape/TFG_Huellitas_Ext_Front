import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar cada uno de los componentes a los que apuntan las rutas
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Por defecto
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
