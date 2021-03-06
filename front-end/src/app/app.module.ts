import { EntregadorListComponent } from './entregador/entregador-list/entregador-list.component';

import { PedidoFormComponent } from './pedido/pedido-form/pedido-form.component';
import { EntregadorFormComponent } from './entregador/entregador-form/entregador-form.component';


// Bem no início do arquivo app.module.ts
import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Na seção de imports do app.module.ts
// Habilitar formatação de moeda e data em português
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainToolbarComponent } from './ui/main-toolbar/main-toolbar.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { MainFooterComponent } from './ui/main-footer/main-footer.component';
import {​​ HttpClientModule }​​ from '@angular/common/http';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { PedidoListComponent } from './pedido/pedido-list/pedido-list.component';


const routes: Routes = [
    //Rotas na Angular NUNCA comecam com /
    
    {path: 'entregador/:id', component: EntregadorFormComponent},    
    {path: 'pedido/novo', component: PedidoFormComponent},
]

 @NgModule({
    declarations:[
    AppComponent,
    MainToolbarComponent,
    MainMenuComponent,
    MainFooterComponent,    
    EntregadorFormComponent,   
    PedidoFormComponent,
    EntregadorListComponent,
    PedidoListComponent
  ],   

  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatMomentDateModule,
    NgxMaskModule.forRoot()

  ],
  providers: [
      // No app.module.ts, dentro seção providers
  /**** Datas em português no MatDatepicker  ****/
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  /**********************************************/  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
