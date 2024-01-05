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
import { GoogleApiService } from 'src/app/service/google-api.service';
import { OperationService } from 'src/app/service/operation.service';
import { SheetsService } from 'src/app/service/sheets.service';
import { WebsocketService } from 'src/app/service/websocket.service';
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
    private router: Router,
    private webSocketService: WebsocketService,
    // private location: Location
  ) { }

  currentState: string = ""
  azulStateCalled: boolean = false;
  vermelhoStateCalled: boolean = false;
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
      // this.webSocketService.connect("ws://172.16.34.147:9002")
      setTimeout(() => {
        // this.webSocketService.sendMessage(this.nomeOperacao)
        if(new Date().getHours() >= 7 && new Date().getMinutes() >= 0 && new Date().getMinutes() <= 10){
          if(this.count > 30){
            this.router.navigate(['/conter/' + this.nomeOperacao]);
          }
        }
      }, 1000)
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
    }, (errr) => {
      this.router.navigate([`http://172.16.34.147:4200/counter/${this.nomeOperacao}`])
    });
    console.log()
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
          this.count--;
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
          this.count--;
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
          this.count--;
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
    var data: string[] = []
    if (this.operation.name == "010") {
      var data = ["https://www.youtube.com/embed/BvXm18IAZIQ?si=2tt4rxf8jbv1SCdv", "https://www.youtube.com/embed/15CDvcsOVhY?si=8TvCGIziEAt8ZMON", "https://www.youtube.com/embed/Gyapq5Icndo?si=SQuMWdi_pBIxFe5V"]
    } else if (this.operation.name == "020") {
      var data = ["https://www.youtube.com/embed/5FH1rWUJ2iU?si=c9rfbgYcfv6Mh1S5", "https://www.youtube.com/embed/3SQ7AKfPJ7I?si=jgAWsKbv2SOCZEU4"]
    } else if (this.operation.name == "030") {
      var data = ["https://www.youtube.com/embed/IZOz-y7xibc?si=J8FZGVW_W74TVctB","https://www.youtube.com/embed/N8ou3pIdwSs?si=V3dnb2pQKx0PKLiX", "https://www.youtube.com/embed/Q3xioyloBxM?si=s5q9qRCbkat7cTae", "https://www.youtube.com/embed/rDjy7VIXe9g?si=91BzlrgXiDj8uCgp", "https://www.youtube.com/embed/Sp2orVH2L7k?si=uqaMMZ4TNWz3AhkQ"]
    } else if(this.operation.name == "040"){
      var data = ["https://www.youtube.com/embed/9Ae5H33H76g?si=A7ro3t5KbGaW3Cgf", "https://www.youtube.com/embed/7fhVvdY_99I?si=gzY53wY1j3HSMoJY", "https://www.youtube.com/embed/lCPotFAG5VA?si=DiOkblulgCtaq_2R", "https://www.youtube.com/embed/oH-J-eqGKxk?si=tTvJQzVpu5Zl9l6o", "https://www.youtube.com/embed/MiwZtbyHows?si=Gva5UwPeddCGngWI", "https://www.youtube.com/embed/j8A9RCK_b18?si=ApMSwvEWfUhOooNJ"]
    }else if(this.operation.name == "050"){
      var data = ["https://www.youtube.com/embed/0e_6fwhztNg?si=lBh76eIxuNm9RApi", "https://www.youtube.com/embed/rkz4FRKadCg?si=8IWpIZS7VemIWqQ7", "https://youtu.be/xkF0Ou4RLTA"]
    }else if(this.operation.name == "060"){
      var data = ["https://www.youtube.com/embed/pEL38XOYGmM?si=dllUgPDhRcYKLqAA","https://www.youtube.com/embed/pHKs3Ku1vTA","https://www.youtube.com/embed/dwkcDlDKMD8", "https://www.youtube.com/embed/dwkcDlDKMD8",'https://www.youtube.com/embed/oKDGvy9P1QQ',"https://www.youtube.com/embed/3kjdZu2-rCw", "https://www.youtube.com/embed/WRTnK3HVdzc" ]
    }else if(this.operation.name == "070"){
      var data = ["https://www.youtube.com/embed/h8qRJuvlXvw","https://www.youtube.com/embed/ghIo5CdV23Y" ,"https://www.youtube.com/embed/Xyj-ggn7wbI", "https://www.youtube.com/embed/uUonDbVf05g" , "https://www.youtube.com/embed/h8qRJuvlXvw"]
    }else if(this.operation.name == "080"){
      var data = [""]
    }else if(this.operation.name == "090"){
      var data = [""]
    }else if(this.operation.name == "100"){
      var data = [""]
    }else if(this.operation.name == "110"){
      var data = [""]
    }else if(this.operation.name == "120"){
      var data = ["https://www.youtube.com/embed/vfHB-FDG44g" , "https://www.youtube.com/embed/V-RYV4kToIo" , "https://www.youtube.com/embed/uCK7PgbiIkE"]
    }else if(this.operation.name == "130"){
      var data = ["https://www.youtube.com/embed/wZbMxJsF0g0", "https://www.youtube.com/embed/ure4crglQaQ" ]
    }else if(this.operation.name == "140"){
      var data = ["https://www.youtube.com/embed/mxkWrsilmK8", "https://www.youtube.com/embed/NyIWe5pAYqY"]
    }else if(this.operation.name == "150"){
      var data = ["https://www.youtube.com/embed/J4mZHMUEJj8" , "https://www.youtube.com/embed/iJD48h1r0tE", "https://www.youtube.com/embed/KhszgRqs5UQ"]
    }else if(this.operation.name == "160"){
      var data = ["https://www.youtube.com/embed/kzmR2EyHGLs"]
    }
    const dialogRef = this.dialog.open(DialogHelpComponent, {
      data: data,
    });
  }
}
