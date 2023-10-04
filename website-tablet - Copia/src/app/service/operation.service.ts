import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../model/operation/operation';
import { Nodemcu } from '../model/nodemcu';
import { Main } from '../model/main';

const headers = new HttpHeaders({
  'Authorization': 'Bearer meu-token-de-autenticacao',
  'Content-Type': 'application/json',
});


@Injectable({
  providedIn: 'root'
})

export class OperationService {

  constructor(private http: HttpClient) { }


  get(name: string): Observable<Operation> {
    return this.http.get<Operation>("http://172.16.34.147:8090/api/v1/operation/" + name)
  }

  post(body: Nodemcu): Observable<Nodemcu> {
    return this.http.patch<Nodemcu>("http://172.16.34.147:8090/api/v1/nodemcu/" + body.nameId.name, body)

  }

  getByName(name: string){
    return this.http.get<Nodemcu>("http://172.16.34.147:8090/api/v1/nodemcu/" + name)
  }

  getTCimposto(): Observable<Main[]> {
    return this.http.get<Main[]>("http://172.16.34.147:8090/api/v1/main")
  }

  atualizar(name: string, tempo: number) {
    this.http.get("http://172.16.34.147:8090/api/v1/nodemcu/atualizarTempo/" + name + "/" + tempo).subscribe()

  }

  atualizarState(name: string, state: string){
    this.http.get("http://172.16.34.147:8090/api/v1/nodemcu/atualizarState/" + name + "/" + state).subscribe();
  }
}
