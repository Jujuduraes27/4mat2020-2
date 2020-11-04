import { Injectable } from '@angular/core';
import { HttoCliente } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private server = environment.apiServer

  constructor(private http : HttpClient) {}

  listar(){
      this.http.get(this.server + 'curso').toPromise()
    }
  
}
