import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationService } from './service/operation.service';
import { Operation } from './model/operation/operation';
import { ActivatedRoute } from '@angular/router';
import { Nodemcu } from './model/nodemcu';
import { WebsocketService } from './service/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private webSocketService: WebsocketService){}

  ngOnInit(): void {
    // this.webSocketService.connect("ws://172.16.34.147:9002")
    // setTimeout(() => {
    //   this.webSocketService.sendMessage("testando")
    // }, 1000)
  }
  ngOnDestroy(): void {
    // this.webSocketService.closeConnection();
  }

}
