import { PedidoFormComponent } from './pedido/pedido-form/pedido-form.component';
import { FuncionarioFormComponent } from './funcionario/funcionario-form/funcionario-form.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { EntregadorFormComponent } from './entregador/entregador-form/entregador-form.component';


    const routes: Routes = [
  // Pode haver outras rotas antes
  {path: 'entregador/:id',component: EntregadorFormComponent},    
  {path: 'funcionario/:id',component: FuncionarioFormComponent},
  {path: 'pedido/novo',component: PedidoFormComponent},


  // Pode haver outras rotas depois


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
