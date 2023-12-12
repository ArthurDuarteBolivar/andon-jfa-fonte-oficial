import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationService } from './service/operation.service';
import { Operation } from './model/operation/operation';
import { ActivatedRoute } from '@angular/router';
import { Nodemcu } from './model/nodemcu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
   
  }

}
