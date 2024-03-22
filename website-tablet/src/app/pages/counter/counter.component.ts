import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips/chips-module';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Main } from 'src/app/model/main';
import { Nodemcu } from 'src/app/model/nodemcu';
import { Operation } from 'src/app/model/operation/operation';
import { Realizado } from 'src/app/model/realizado';
import { OperationService } from 'src/app/service/operation.service';
import { SheetsService } from 'src/app/service/sheets.service';
import { DialogHelpComponent } from 'src/app/shared/dialog-help/dialog-help.component';

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
    private router: Router
    ) { }
  imposto: number = 0;
  shiftTime: number = 8.66;
  minutos8: number = 0;
  minutos9: number = 0;
  minutos10: number = 0;
  minutos11: number = 0;
  minutos12: number = 0;
  minutos13: number = 0;
  minutos14: number = 0;
  minutos15: number = 0;
  minutos16: number = 0;
  minutos17: number = 0;
  realizadoHora!: Realizado;
  realizadoHoraAtual : number = 0;
  currentState: string = ""
  azulStateCalled: boolean = false;
  vermelhoStateCalled: boolean = false;
  verificarSeFoiUmaVez: boolean = true;
  localData: Date | undefined;
  intervalo!: NodeJS.Timer
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
  nomeOperacao: number = 0;
  newMaintenance: number = 0;
  operation: Operation = {
    id: 0,
    name: '',
    limitedTime: 0,
  };
  storage: Storage = localStorage;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.nomeOperacao = params['name'];
      this.operationService.get(params['name']).subscribe((res) => {
        if (res == null) {
          this.router.navigate([`http://172.16.34.147:4200/counter/${this.nomeOperacao}`])
        }
        this.operation = res;
        this.operationService.getByName(this.operation.name).subscribe(
          (res) => {
            this.count = res.count;
            this.maintenance = res.maintenance;
            var newOperation = this.storage.getItem('operation')!;
            this.newConter = parseInt(this.storage.getItem('counter')!);
            this.newMaintenance = parseInt(this.storage.getItem('maintenance')!);
            if (isNaN(this.newConter)) {
              this.storage.setItem('operation', this.operation.name);
              this.storage.setItem('counter', '0');
              this.storage.setItem('maintenance', '0');
            } else {
              if (newOperation != this.operation.name) {
                this.storage.setItem('operation', this.operation.name);
                this.storage.setItem('counter', '0');
                this.storage.setItem('maintenance', '0');
              }
            }
            this.newConter = parseInt(this.storage.getItem('counter')!);
            this.newMaintenance = parseInt(this.storage.getItem('maintenance')!);
          },
          (errr) => {
            this.openSnackBar('Erro no Service', 'Ok');
          }
        );
      }, (errr) => {
        this.router.navigate([`http://172.16.34.147:4200/counter/${this.nomeOperacao}`])
      })
      this.operationService.getRealizadoHoraria(`${this.nomeOperacao}`).subscribe((res: any) => {
        this.realizadoHora = res;
      })
    }, (errr) => {
      this.router.navigate([`http://172.16.34.147:4200/counter/${this.nomeOperacao}`])
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
      } else if (data.getMinutes() == 1) {
        this.verificarSeFoiUmaVez = true;
      }
    }, 40000);
    setTimeout(() => {
      this.intervaloCounter();
    }, 1000);
    this.operationService.getTCimposto().subscribe((res: Main[]) => {
      this.imposto = res[0].imposto
      this.shiftTime = res[0].shiftTime
    })
    setInterval(() => {
      this.operationService.getRealizadoHoraria(`${this.nomeOperacao}`).subscribe((res: any) => {
        this.count = 0;
        this.realizadoHora = res;
        this.count += res.horas7;
        this.count += res.horas8;
        this.count += res.horas9;
        this.count += res.horas10;
        this.count += res.horas11;
        this.count += res.horas12;
        this.count += res.horas13;
        this.count += res.horas14;
        this.count += res.horas15;
        this.count += res.horas16;
        this.count += res.horas17;
        var horas = new Date().getHours()
        if(horas == 7){
          this.realizadoHoraAtual = this.realizadoHora.horas7;
        }else if(horas == 8){
          this.realizadoHoraAtual = this.realizadoHora.horas8;
        }else if(horas == 9){
          this.realizadoHoraAtual = this.realizadoHora.horas9;
        }else if(horas == 10){
          this.realizadoHoraAtual = this.realizadoHora.horas10;
        }else if(horas == 11){
          this.realizadoHoraAtual = this.realizadoHora.horas11;
        }else if(horas == 12){
          this.realizadoHoraAtual = this.realizadoHora.horas12;
        }else if(horas == 13){
          this.realizadoHoraAtual = this.realizadoHora.horas13;
        }else if(horas == 14){
          this.realizadoHoraAtual = this.realizadoHora.horas14;
        }else if(horas == 15){
          this.realizadoHoraAtual = this.realizadoHora.horas15;
        }else if(horas == 16){
          this.realizadoHoraAtual = this.realizadoHora.horas16;
        }
      })
      var horas = new Date().getHours()
      if (horas == 7) {
        this.minutos8 = new Date().getMinutes();
      } else if (horas == 8) {
        this.minutos8 = 60;
        this.minutos9 = new Date().getMinutes();
      } else if (horas == 9) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = new Date().getMinutes();
      } else if (horas == 10) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = new Date().getMinutes();
      } else if (horas == 11) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = new Date().getMinutes();
      } else if (horas == 12) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = new Date().getMinutes();
      } else if (horas == 13) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = 60;
        this.minutos14 = new Date().getMinutes();
      } else if (horas == 14) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = 60;
        this.minutos14 = 60;
        this.minutos15 = new Date().getMinutes();
      } else if (horas == 15) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = 60;
        this.minutos14 = 60;
        this.minutos15 = 60;
        this.minutos16 = new Date().getMinutes();
      } else if (horas == 16) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = 60;
        this.minutos14 = 60;
        this.minutos15 = 60;
        this.minutos16 = 60;
        this.minutos17 = new Date().getMinutes();
      } else if (horas == 17) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = 60;
        this.minutos14 = 60;
        this.minutos15 = 60;
        this.minutos16 = 60;
        this.minutos17 = 60;
        this.minutos17 = new Date().getMinutes();
      }
    }, 1000)
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
        this.tempoOcioso < this.lmitedTime / 2 + 10
      ) {
        if (!this.azulStateCalled) {
          this.operationService.atualizarState(this.operation.name, 'azul');
          this.azulStateCalled = true;
          this.vermelhoStateCalled = false; // Redefine a variável de vermelho
        }
      } else if (this.tempoOcioso > this.lmitedTime) {
        if (!this.vermelhoStateCalled) {
          this.operationService.atualizarState(this.operation.name, 'vermelho');
          this.vermelhoStateCalled = true;
          this.azulStateCalled = false; // Redefine a variável de azul
        }
      }
    }, 1000);
  }
  ngOnDestroy() {
    this.stopTimer('');
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
    this.currentState = "verde";
    this.contadorRodando = true;
    this.intervalRef = setInterval(() => {
      this.contador++;
      this.operationService.atualizar(this.operation.name, this.contador);
      if (this.contador > 9999) {
        this.stopTimer(state);
      } else if (
        this.contador > this.lmitedTime &&
        this.currentState == 'azul'
      ) {
        this.currentState = "vermelho"
        this.operationService.atualizarState(this.operation.name, 'azul');
      } else if (this.contador > this.lmitedTime * 3 && this.currentState == "vermelho") {
        this.currentState = "verde";
        this.operationService.atualizarState(this.operation.name, 'vermelho');
      } else if (
        this.contador < this.lmitedTime &&
        this.currentState == 'verde'
      ) {
        this.currentState = "azul";
        this.operationService.atualizarState(this.operation.name, 'verde');
      }
    }, 1000);
  }

  stopTimer(state: string) {
    this.operationService.getTCimposto().subscribe((res: Main[]) => {
      this.imposto = res[0].imposto
      this.shiftTime = res[0].shiftTime
      this.operationService.atualizar(this.operation.name, this.contador);
      res.forEach((res) => {
        this.lmitedTime = res.tcimposto;
      });
    });
    if (state == 'count') {
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
      this.operationService.post(body).subscribe((res) => {});
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
      this.operationService.post(body).subscribe((res) => {});
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
      this.operationService.post(body).subscribe((res) => {});
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
    const dialogRef = this.dialog.open(DialogHelpComponent, {
      data: this.operation.name,
    });
  }
}
