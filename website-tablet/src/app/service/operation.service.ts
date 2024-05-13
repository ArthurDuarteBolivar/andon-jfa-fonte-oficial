import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../model/operation/operation';
import { Nodemcu } from '../model/nodemcu';
import { Main } from '../model/main';
import { Realizado } from '../model/realizado';
import { environment } from 'src/environments/environment';

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
    return this.http.get<Operation>(environment.url + "operation/" + name)
  }

  post(body: Nodemcu): Observable<Nodemcu> {
    return this.http.patch<Nodemcu>(environment.url + "nodemcu/" + body.nameId.name, body)

  }

  getByName(name: string){
    return this.http.get<Nodemcu>(environment.url + "nodemcu/" + name)
  }

  getTCimposto(): Observable<Main[]> {
    return this.http.get<Main[]>(environment.url + "main")
  }

  atualizar(name: string, tempo: number) {
    this.http.get(environment.url + "nodemcu/atualizarTempo/" + name + "/" + tempo).subscribe()

  }

  atualizarState(name: string, state: string){
    this.http.get(environment.url + "nodemcu/atualizarState/" + name + "/" + state).subscribe();
  }

  getRealizadoHoraria(name: string): Observable<Realizado>{
    return this.http.get<Realizado>(environment.url + "realizadoHorariaTablet/" + name)
  }

  atualizarOcupado(name: string, ocupado: boolean): Observable<Operation>{
    return this.http.get<Operation>(environment.url + `operation/${name}/${ocupado}`)
  }

  postQrcode(nome: string, cod: string, aprovado: boolean, op: string, execucao: number) {
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}-${dataAtual.getDate().toString().padStart(2, '0')}`;
    const horaFormatada = dataAtual.toLocaleTimeString();
  
    return this.http.post("http://172.16.34.229:3000/qrcode", {
      "nome": nome,
      "cod": cod,
      "data": dataFormatada,
      "hora": horaFormatada,
      "aprovado": aprovado,
      "op": op,
      "execucao": execucao,
    });
  }

  postIndisponivel(op: string) {
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}-${dataAtual.getDate().toString().padStart(2, '0')}`;
    const horaFormatada = dataAtual.toLocaleTimeString();
  
    return this.http.post("http://172.16.34.229:3000/indisponivel", {
      "op": op,
      "data": dataFormatada,
      "hora": horaFormatada,
    });
  }
  
}

