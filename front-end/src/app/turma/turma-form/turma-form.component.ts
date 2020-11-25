import { SalaAulaService } from './../../sala-aula/sala-aula.service';
import { CursoService } from './../../curso/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TurmaService } from './../turma.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {​​ Location }​​ from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProfessorService } from 'src/app/professor/professor.service';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.scss']
})
export class TurmaFormComponent implements OnInit {    
    title: string = 'Nova Turma'

    turma:  any = {} // Objeto vazio, nome da entidade no SINGULAR
    
    diasSemana: any = [
        {val:'dom', descr: 'Domingo'},
        {val:'seg',descr: 'Segunda-feira'},
        {val:'ter',descr: 'Terça-feira'},
        {val:'qua', descr: 'Quarta-feira'},
        {val:'qui',descr: 'Quinta-feira'},
        {val:'sex',descr: 'Sexta-feira'},
        {val:'sab',descr: 'Sábado'}
    ]
    
    // Variaveis para armazenar as listagems das entidades relacionadas
    curso: any = [] // Nome no plural, vetor vazio
    professor: any = []
    salaAula: any = []

  constructor(
      private turmaSrv : TurmaService,
      private cursoSrv : CursoService,
      private professorSrv :ProfessorService,
      private snackBar : MatSnackBar,
      private location : Location,
      private actRoute : ActivatedRoute,
      private salaAulaSrv : SalaAulaService
  ) { }

  async ngOnInit()  {
      // Verificando se existe id na rota que trouxe ao formulario
      if(this.actRoute.snapshot.params['id']){
          try{
              // 1) Trazer o registro do back-end para edição
              this.turma = await this.turmaSrv.obterUm(this.actRoute.snapshot.params['id'])
              // 2) Mudar o titulo da pagina
              this.title = 'Editando turma'
            }
            catch(erro){
                console.log(erro)
                this.snackBar.open('ERRO: NÃO FOI POSSIVEL CARREGAR OS DADOS PARA EDIÇAÕ', 'QUE PENA!!',{duration: 5000})
            }
        }

        // carregar as listagens das entidades relacionadas
        try{
            this.curso = await this.cursoSrv.listar()
            this.professor = await this.professorSrv.listar()
            this.salaAula = await this.salaAulaSrv.listar()
        }
        catch(erro){
                console.log(erro)
                this.snackBar.open('ERRO: NÃO FOI POSSIVEL CARREGAR OS DADOS DO FORMULARIO', 'QUE PENA!!',{duration: 5000})
            }
        }


  async salvar(form : NgForm){
    try{  
        if(form.valid){
        //1) Enviar os dados para o back-end para serem salvos
        if(this.turma._id){
            //_id existe, esse registro ja foi salvo anteriormente
            // no BD é o caso de atualização
            await this.turmaSrv.atualizar(this.turma)            
        }
        else{
            await this.turmaSrv.novo(this.turma)
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

