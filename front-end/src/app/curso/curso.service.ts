import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private server = environment.apiServer

  constructor(private http : HttpClient) {}

   listar(){
      return this.http.get(this.server + 'curso').toPromise()
    }
  
}
