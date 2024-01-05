import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$!: WebSocket;
  private subject$!: Subject<MessageEvent>;

  public connect(url: string): Subject<MessageEvent> {
    this.socket$ = new WebSocket(url);

    this.subject$ = new Subject<MessageEvent>();

    this.socket$.onopen = (event) => {
      console.log('WebSocket connected.');
    };

    this.socket$.onclose = (event) => {
      console.log('WebSocket disconnected.');
    };

    this.socket$.onmessage = (event) => {
      this.subject$.next(event);
    };

    return this.subject$;
  }

  public sendMessage(message: any): void {
    if (this.socket$) {
      this.socket$.send(JSON.stringify(message));
    }
  }

  public closeConnection(): void {
    if (this.socket$) {
      this.socket$.close();
    }
  }
}
