import { MatSnackBar } from '@angular/material/snack-bar';
import { EntregadorService } from './../entregador.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {​​ Location }​​ from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entregador-form',
  templateUrl: './entregador-form.component.html',
  styleUrls: ['./entregador-form.component.scss']
})
export class EntregadorFormComponent implements OnInit {    
    title: string = 'Novo Entregador'

    entregador:  any = {} // Objeto vazio, nome da entidade no SINGULAR
    
    

  constructor(
      private entregadorSrv : EntregadorService,
      private snackBar : MatSnackBar,
      private location : Location,
      private actRoute : ActivatedRoute
  ) { }

  async ngOnInit()  {
      // Verificando se existe id na rota que trouxe ao formulario
      if(this.actRoute.snapshot.params['id']){
          try{
              // 1) Trazer o registro do back-end para edição
              this.entregador = await this.entregadorSrv.obterUm(this.actRoute.snapshot.params['id'])
              // 2) Mudar o titulo da pagina
              this.title = 'Editando entregador'
              // carregar as listagens das entidades relacionadas
            
            this.entregador = await this.entregadorSrv.listar()
            }          
                        

            catch(erro){
                console.log(erro)
                this.snackBar.open('ERRO: NÃO FOI POSSIVEL CARREGAR OS DADOS PARA EDIÇAÕ', 'QUE PENA!!',{duration: 5000})
            }
        }
    }

  async salvar(form : NgForm){
    try{  
        if(form.valid){
        //1) Enviar os dados para o back-end para serem salvos
        if(this.entregador._id){
            //_id existe, esse registro ja foi salvo anteriormente
            // no BD é o caso de atualização
            await this.entregadorSrv.atualizar(this.entregador)            
        }
        else{
            await this.entregadorSrv.novo(this.entregador)
        }
        //2) Dar um feedback (mensagem) para o usuario
        this.snackBar.open('Dados salvos com sucesso', 'Entendi',
        {duration:5000})
        //3) Voltar para a tela de listagem
        this.location.back()

        }
    }
    catch(erro){
        console.log(erro)
        this.snackBar.open('ERRO: NÃO FOI POSSIVEL SALVAR OS DADOS','QUE PENA', {duration: 5000})
    }
      
  }
  voltar(form: NgForm){
      let result = true
      // form.dirty = formulario "sujo", não salvo (via código)
      // form.touched = o conteudo de algum campo foi alterado (via usuario)
      if(form.dirty && form.touched){
          result = confirm('HÁ DADOS NÃO SALVOS. DESEJA REALMENTEVOLTAR')
        }
      // Retorna á pagina anterior se resposta foi positiva ou se o formulario
      // estiver "limpo"
      if(result) this.location.back()

    }

}
