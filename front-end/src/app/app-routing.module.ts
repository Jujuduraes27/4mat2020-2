import { EntregadorListComponent } from './entregador/entregador-list/entregador-list.component';

import { PedidoFormComponent } from './pedido/pedido-form/pedido-form.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { EntregadorFormComponent } from './entregador/entregador-form/entregador-form.component';


    const routes: Routes = [
  // Pode haver outras rotas antes
  {path:'entregador',component: EntregadorListComponent },
  {path: 'entregador/novo',component:EntregadorFormComponent},
  {path: 'entregador/:id',component: EntregadorFormComponent},  
  {path: 'pedido/novo',component: PedidoFormComponent},


  // Pode haver outras rotas depois


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
