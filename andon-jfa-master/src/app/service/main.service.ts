import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Main } from '../module/main';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }


  put(imposto: number, tcimposto: number, shiftTime: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(
      'http://172.16.34.147:8090/api/v1/main/1',{imposto, tcimposto, shiftTime}, {headers});
  }

  getAllMain(): Observable<Main[]> {
    return this.http.get<Main[]>('http://172.16.34.147:8090/api/v1/main');
  }
}
