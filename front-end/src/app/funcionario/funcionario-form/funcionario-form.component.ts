import { MatSnackBar } from '@angular/material/snack-bar';
import { FuncionarioService } from './../funcionario.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {​​ Location }​​ from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class EntregadorFormComponent implements OnInit {    
    title: string = 'Novo Funcionario'

    funcionario:  any = {} // Objeto vazio, nome da entidade no SINGULAR
    
    

  constructor(
      private funcionarioSrv : FuncionarioService,
      private snackBar : MatSnackBar,
      private location : Location,
      private actRoute : ActivatedRoute
  ) { }

  async ngOnInit()  {
      // Verificando se existe id na rota que trouxe ao formulario
      if(this.actRoute.snapshot.params['id']){
          try{
              // 1) Trazer o registro do back-end para edição
              this.funcionario = await this.funcionarioSrv.obterUm(this.actRoute.snapshot.params['id'])
              // 2) Mudar o titulo da pagina
              this.title = 'Editando funcionario'
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
        if(this.funcionario._id){
            //_id existe, esse registro ja foi salvo anteriormente
            // no BD é o caso de atualização
            await this.funcionarioSrv.atualizar(this.funcionario)            
        }
        else{
            await this.funcionarioSrv.novo(this.funcionario)
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