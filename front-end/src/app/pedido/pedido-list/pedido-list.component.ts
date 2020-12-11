import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../pedido.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.scss']
})
export class EntregadorListComponent implements OnInit {

    pedidoes : any = [] // Vetor vazio
    displayedColumns : string[] = ['pedido','cpf','telefone','editar','excluir']

  constructor(private pedidoSrv : PedidoService, 
  private snackBar: MatSnackBar
  ) { }
  
  async ngOnInit() {
    this.pedidoes = await this.pedidoSrv.listar() 
    console.log(this.pedidoes)
    }
    async excluir(id: string){
        if(confirm('Deseja realmente excluir este item?')) {
            try{
               // 1) Efetuar a exclusão
               await this.pedidoSrv.excluir(id)
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
