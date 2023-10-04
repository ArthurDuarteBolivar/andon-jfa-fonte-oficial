import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://172.16.34.147:8070/ws'); // Certifique-se de usar o esquema "ws"
  }

  sendMessage(name: string, message: string): void {
    this.socket$.next({  name, message });
  }

  receiveMessage(): Observable<any> {
    return this.socket$;
  }

  closeConnection(): void {
    this.socket$.complete();
  }
}