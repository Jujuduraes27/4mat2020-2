import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entregador-form',
  templateUrl: './entregador-form.component.html',
  styleUrls: ['./entregador-form.component.scss']
})
export class EntregadorFormComponent implements OnInit {
    title: string = 'Novo Entregador'
    entregador:  any = {}

  constructor() { }

  ngOnInit(): void {
  }

}
