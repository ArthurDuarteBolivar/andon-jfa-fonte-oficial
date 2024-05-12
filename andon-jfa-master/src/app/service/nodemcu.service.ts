import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nodemcu } from '../module/nodemcu';
import { Observable } from 'rxjs';
import { Realizado } from '../module/realizado';
import { ResultadoGeral } from '../module/resultadoGeral';

@Injectable({
  providedIn: 'root',
})
export class NodemcuService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {

    return this.http.get<Nodemcu>(
      'http://localhost:8090/api/v1/nodemcu',
    );
  }

  getAllRealizado(): Observable<Realizado[]>{
    return this.http.get<Realizado[]>("http://localhost:8090/api/v1/realizadoHoraria")
  }

  postResultsGeral(imposto: number, realizado: number){
    this.http.post("http://localhost:8090/api/v1/geral", {'imposto': imposto, 'realizado': realizado}).subscribe()
  }

  getAllResultadoGeral(): Observable<ResultadoGeral[]>{
    return this.http.get<ResultadoGeral[]>("http://localhost:8090/api/v1/geral")
  }
}
