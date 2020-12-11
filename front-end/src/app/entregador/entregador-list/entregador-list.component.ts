import { Component, OnInit } from '@angular/core';
import { EntregadorService } from '../entregador.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-entregador-list',
  templateUrl: './entregador-list.component.html',
  styleUrls: ['./entregador-list.component.scss']
})
export class EntregadorListComponent implements OnInit {

    entregadores : any = [] // Vetor vazio
    displayedColumns : string[] = ['entregador','cpf','telefone','editar','excluir']

  constructor(private entregadorSrv : EntregadorService, 
  private snackBar: MatSnackBar
  ) { }
  
  async ngOnInit() {
    this.entregadores = await this.entregadorSrv.listar() 
    console.log(this.entregadores)
    }
    async excluir(id: string){
        if(confirm('Deseja realmente excluir este item?')) {
            try{
               // 1) Efetuar a exclusão
               await this.entregadorSrv.excluir(id)
               // 2) Atualizar os dados da tabela
               this.ngOnInit()
               // 3) dar um feedback para o usuario
               this.snackBar.open('Item excluido com sucesso', 'Entendi',{
                   duration:5000 // 5 segundos
               })

            }
            catch(erro){
                // 4) Dar um feedlback de erro para o usuario
                this.snackBar.open('ERRO: não foi possivel excluir este item.', 'Que pena',{
                   duration:5000 // 5 segundos
               })
            }       
            
        }
    }
}
