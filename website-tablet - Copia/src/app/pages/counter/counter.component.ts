import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips/chips-module';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription, delay } from 'rxjs';
import { Main } from 'src/app/model/main';
import { Nodemcu } from 'src/app/model/nodemcu';
import { Operation } from 'src/app/model/operation/operation';
import { OperationService } from 'src/app/service/operation.service';
import { SheetsService } from 'src/app/service/sheets.service';
import { WebsocketServiceService } from 'src/app/service/websocket-service.service';
// import { DialogHelpComponent } from 'src/app/shared/dialog-help/dialog-help.component';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit, OnDestroy {
  constructor(
    private operationService: OperationService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private sheetsService: SheetsService,
    private websocketService: WebsocketServiceService
  ) {}
  
  private subscription!: Subscription;

  verificarSeFoiUmaVez: boolean = true;
  localData: Date | undefined;
  intervalo: NodeJS.Timer | undefined;
  tempoOcioso: number = 0;
  stateButton: boolean = true;
  contadorRodando: boolean = false;
  contador: number = 0;
  intervalRef: any;
  count: number = 0;
  maintenance: number = 0;
  lmitedTime: number = 0;
  teste: any = true;
  labelPosition: string = '';
  newConter: number = 0;
  newMaintenance: number = 0;
  operation: Operation = {
    id: 0,
    name: '',
    limitedTime: 0,
  };
  storage: Storage = localStorage;

  ngOnInit() {
    this.subscription = this.websocketService.receiveMessage().subscribe();
    this.newConter = parseInt(this.storage.getItem('counter')!);
    this.newMaintenance = parseInt(this.storage.getItem('maintenance')!);
    if (this.newConter == undefined || null || NaN) {
      this.storage.setItem('counter', '0');
      this.storage.setItem('maintenance', '0');
    }
    this.route.params.subscribe((params) => {
      this.operationService.get(params['name']).subscribe((res) => {
        this.operation = res;
        this.operationService.getByName(this.operation.name).subscribe(
          (res) => {
            this.count = res.count;
            this.maintenance = res.maintenance;
          },
          (errr) => {
            this.openSnackBar('Erro no Service', 'Ok');
          }
        );
      });
    });
    this.operationService.getTCimposto().subscribe(
      (res: Main[]) => {
        res.forEach((res) => {
          this.lmitedTime = res.tcimposto;
        });
      },
      (error) => {
        this.openSnackBar('Erro no Service', 'Ok');
      }
    );
    setInterval(() => {
      this.operationService.getTCimposto().subscribe(
        (res: Main[]) => {
          res.forEach((res) => {
            this.lmitedTime = res.tcimposto;
          });
        },
        (error) => {
          this.openSnackBar('Erro no Service', 'Ok');
        }
      );
      const data = new Date();
      if (data.getMinutes() == 0 && this.verificarSeFoiUmaVez == true) {
        this.verificarSeFoiUmaVez = false;
        var body: Nodemcu = {
          count: this.newConter,
          time: 0,
          state: 'verde',
          currentTC: this.contador,
          nameId: this.operation,
          maintenance: this.newMaintenance,
          shortestTC: this.contador,
          modelo: this.labelPosition,
        };
        this.sheetsService.submitForm(body, true).subscribe();
        this.newConter = 0;
        this.newMaintenance = 0;
        this.storage.setItem('counter', this.newConter.toString());
        this.storage.setItem('maintenance', this.newMaintenance.toString());
      }else if(data.getMinutes() == 1){
          this.verificarSeFoiUmaVez = true;
      }
    }, 10000);
    setTimeout(() => {
      this.intervaloCounter();
    }, 1000);
  }

  enterFullscreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }

  intervaloCounter() {
    this.intervalo = setInterval(() => {
      this.tempoOcioso++;
      if (
        this.tempoOcioso > this.lmitedTime / 2 &&
        (this.tempoOcioso < (this.lmitedTime / 2) + 10)
      ) {
        this.operationService.atualizarState(this.operation.name, 'azul');
      } else if (this.tempoOcioso > this.lmitedTime) {
        this.operationService.atualizarState(this.operation.name, 'vermelho');
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.stopTimer('');
    this.subscription.unsubscribe();
    this.websocketService.closeConnection();
  }

  toggleContagem(state: string) {
    clearInterval(this.intervalo);
    this.tempoOcioso = 0;
    if (this.contadorRodando) {
      this.tempoOcioso = 0;
      this.intervaloCounter();
      this.stopTimer(state);
      this.stateButton = true;
      this.contador = 0;
      this.operationService.atualizar(this.operation.name, this.contador);
    } else {
      if (state != 'refuse') {
        this.iniciarContagem(state);
        this.stateButton = false;
      }
    }
  }

  iniciarContagem(state: string) {
    this.contadorRodando = true;
    this.intervalRef = setInterval(() => {
      this.contador++;
      this.websocketService.sendMessage(this.operation.name,this.contador.toString());
      if (this.contador > 9999) {
        this.stopTimer(state);
      } else if (
        this.contador > this.lmitedTime &&
        this.contador < this.lmitedTime * 3
      ) {
        this.operationService.atualizarState(this.operation.name, 'azul');
      } else if (this.contador > this.lmitedTime * 3) {
        this.operationService.atualizarState(this.operation.name, 'vermelho');
      } else if (this.contador < this.lmitedTime) {
        this.operationService.atualizarState(this.operation.name, 'verde');
      }
    }, 1000);
  }

  stopTimer(state: string) {
    this.operationService.getTCimposto().subscribe((res: Main[]) => {
      this.operationService.atualizar(this.operation.name, this.contador);
      res.forEach((res) => {
        this.lmitedTime = res.tcimposto;
      });
    });
    if (state == 'count') {
      this.count++;
      this.newConter++;
      this.storage.setItem('counter', this.newConter.toString());
    } else if (state == 'refuse') {
      this.maintenance++;
      this.newMaintenance++;
      this.storage.setItem('maintenance', this.newMaintenance.toString());
    }
    this.contadorRodando = false;
    clearInterval(this.intervalRef);
    if (
      this.contador > this.lmitedTime &&
      this.contador < this.lmitedTime * 3
    ) {
      var body: Nodemcu = {
        count: this.count,
        time: 0,
        state: 'azul',
        currentTC: this.contador,
        nameId: this.operation,
        maintenance: this.maintenance,
        shortestTC: this.contador,
        modelo: this.labelPosition,
      };
      this.operationService.post(body).subscribe((res) => {
        if (res) {
          this.openSnackBar('Enviado com sucesso', 'Ok');
        } else {
          this.openSnackBar('Erro ao enviar', 'Ok');
        }
      });
    } else if (this.contador >= this.lmitedTime * 3) {
      var body: Nodemcu = {
        count: this.count,
        time: 0,
        state: 'vermelho',
        currentTC: this.contador,
        nameId: this.operation,
        maintenance: this.maintenance,
        shortestTC: this.contador,
        modelo: this.labelPosition,
      };
      this.operationService.post(body).subscribe((res) => {
        if (res) {
          this.openSnackBar('Enviado com sucesso', 'Ok');
        } else {
          this.openSnackBar('Erro ao enviar', 'Ok');
        }
      });
    } else {
      var body: Nodemcu = {
        count: this.count,
        time: 0,
        state: 'verde',
        currentTC: this.contador,
        nameId: this.operation,
        maintenance: this.maintenance,
        shortestTC: this.contador,
        modelo: this.labelPosition,
      };
      this.operationService.post(body).subscribe((res) => {
        if (res) {
          this.openSnackBar('Enviado com sucesso', 'Ok');
        } else {
          this.openSnackBar('Erro ao enviar', 'Ok');
        }
      });
    }
    this.contador = 0; // Reseta o contador para 0 quando a contagem é parada
    this.operationService.atualizar(this.operation.name, 0);
    var body: Nodemcu = {
      count: this.newConter,
      time: 0,
      state: 'verde',
      currentTC: this.contador,
      nameId: this.operation,
      maintenance: this.newMaintenance,
      shortestTC: this.contador,
      modelo: this.labelPosition,
    };
    this.sheetsService.submitForm(body, false).subscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  openDialog() {
    // const dialogRef = this.dialog.open(DialogHelpComponent, {
    //   data: this.operation.name,
    // });
  }
}
