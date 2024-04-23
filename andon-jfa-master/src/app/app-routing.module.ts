import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ControleGeralComponent } from './pages/controle-geral/controle-geral.component';
import { PausaComponent } from './pages/pausa/pausa.component';

const routes: Routes = [
  {path: 'dashboard', component: ControleGeralComponent},
  {path: '', component: HomeComponent},
  {path: 'pausa', component: PausaComponent},
  {path: '**', redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
