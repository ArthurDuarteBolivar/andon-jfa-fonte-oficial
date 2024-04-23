import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { HostListener } from '@angular/core';
import { DialogAvisoComponent } from 'src/app/shared/dialog-aviso/dialog-aviso.component';
import { state } from '@angular/animations';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit, OnDestroy, AfterViewInit {
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
  realizadoInterval!: NodeJS.Timer;
  minutos10: number = 0;
  minutos11: number = 0;
  minutos12: number = 0;
  minutos13: number = 0;
  minutos14: number = 0;
  minutos15: number = 0;
  minutos16: number = 0;
  minutos17: number = 0;
  realizadoHora!: Realizado;
  realizadoHoraAtual: number = 0;
  currentState: string = '';
  azulStateCalled: boolean = false;
  vermelhoStateCalled: boolean = false;
  verificarSeFoiUmaVez: boolean = true;
  localData: Date | undefined;
  intervalo!: NodeJS.Timer;
  tempoOcioso: number = 0;
  stateButton: boolean = true;
  loadingButton: boolean = false;
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
  nomeOperador: string = ''
  qrcodeValue: string = ''
  qrcodeProduto: string = ""
  onQrcode: boolean = false
  operation: Operation = {
    id: 0,
    name: '',
    limitedTime: 0,
    ocupado: false,
    pausa: false
  };
  storage: Storage = localStorage;

  @HostListener('window:beforeunload', ['$event'])
  async onBeforeUnload(event: Event) {
    this.operationService
      .atualizarOcupado(this.nomeOperacao.toString(), false)
      .subscribe();
  }
  @ViewChild('meuInput') meuInputRef!: ElementRef;

  ngAfterViewInit(): void {
    this.meuInputRef.nativeElement.focus();
  }

  ngOnInit() {

    setInterval(() => {
      this.meuInputRef.nativeElement.focus();
    }, 100)

    this.nomeOperador = this.storage.getItem("nome")!;

    this.route.params.subscribe(
      (params) => {
        this.nomeOperacao = params['name'];
        this.operationService.get(params['name']).subscribe(
          (res) => {
            if (res == null) {
              this.router.navigate([
                `http://172.16.34.147:4200/counter/${this.nomeOperacao}`,
              ]);
            }
            this.operation = res;
            // if (this.operation.name == '020' && this.operation.ocupado == false) {
            //   this.router.navigate(['/qrcode/020'])
            //   return;
            // }

            // if (this.operation.ocupado == true && this.operation.name != '020') {
            //   this.router.navigate(['/error']);
            // }
            this.operationService
              .atualizarOcupado(this.nomeOperacao.toString(), true)
              .subscribe();

            this.operationService.getByName(this.operation.name).subscribe(
              (res) => {
                this.count = res.count;
                this.maintenance = res.maintenance;
                var newOperation = this.storage.getItem('operation')!;
                this.newConter = parseInt(this.storage.getItem('counter')!);
                this.newMaintenance = parseInt(
                  this.storage.getItem('maintenance')!
                );
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
                this.newMaintenance = parseInt(
                  this.storage.getItem('maintenance')!
                );
              },
              (errr) => {
                this.openSnackBar('Erro no Service', 'Ok');
              }
            );
          },
          (errr) => {
            this.router.navigate([
              `http://172.16.34.147:4200/counter/${this.nomeOperacao}`,
            ]);
          }
        );
        this.operationService
          .getRealizadoHoraria(`${this.nomeOperacao}`)
          .subscribe((res: any) => {
            this.realizadoHora = res;
          });
      },
      (errr) => {
        this.router.navigate([
          `http://172.16.34.147:4200/counter/${this.nomeOperacao}`,
        ]);
      }
    );
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

    setInterval(() => {
      this.operationService.get(this.operation.name).subscribe(res => {
        if (res.pausa == true) {
          clearInterval(this.intervalo);
          this.azulStateCalled = false;
          this.vermelhoStateCalled = false;
          this.tempoOcioso = 0;


          this.operationService.atualizarState(this.operation.name, 'azul');
        } else {
          clearInterval(this.intervalo)
          this.intervaloCounter()
        }
      })
    }, 3000)
    this.operationService.getTCimposto().subscribe((res: Main[]) => {
      this.imposto = res[0].imposto;
      this.shiftTime = res[0].shiftTime;
    });
    this.realizadoInterval = setInterval(() => {
      this.operationService
        .getRealizadoHoraria(`${this.nomeOperacao}`)
        .subscribe((res: any) => {
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
          var horas = new Date().getHours();
          if (horas == 7) {
            this.realizadoHoraAtual = this.realizadoHora.horas7;
          } else if (horas == 8) {
            this.realizadoHoraAtual = this.realizadoHora.horas8;
          } else if (horas == 9) {
            this.realizadoHoraAtual = this.realizadoHora.horas9;
          } else if (horas == 10) {
            this.realizadoHoraAtual = this.realizadoHora.horas10;
          } else if (horas == 11) {
            this.realizadoHoraAtual = this.realizadoHora.horas11;
          } else if (horas == 12) {
            this.realizadoHoraAtual = this.realizadoHora.horas12;
          } else if (horas == 13) {
            this.realizadoHoraAtual = this.realizadoHora.horas13;
          } else if (horas == 14) {
            this.realizadoHoraAtual = this.realizadoHora.horas14;
          } else if (horas == 15) {
            this.realizadoHoraAtual = this.realizadoHora.horas15;
          } else if (horas == 16) {
            this.realizadoHoraAtual = this.realizadoHora.horas16;
          }
        });
      var horas = new Date().getHours();
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
    }, 1000);
  }

  qrCodeStart() {
    this.onQrcode = true;
    this.qrcodeProduto = this.qrcodeValue
    if (
      (this.qrcodeValue[0] == "J" && this.qrcodeValue[1] == "f" && this.qrcodeValue[2] == "a") || (this.qrcodeValue[0] == "J" && this.qrcodeValue[1] == "F" && this.qrcodeValue[2] == "a") || (this.qrcodeValue[0] == "J" && this.qrcodeValue[1] == "f" && this.qrcodeValue[2] == "A") || (this.qrcodeValue[0] == "J" && this.qrcodeValue[1] == "F" && this.qrcodeValue[2] == "A") ||
      (this.qrcodeValue[0] == "j" && this.qrcodeValue[1] == "F" && this.qrcodeValue[2] == "a") || (this.qrcodeValue[0] == "j" && this.qrcodeValue[1] == "F" && this.qrcodeValue[2] == "A") || (this.qrcodeValue[0] == "j" && this.qrcodeValue[1] == "f" && this.qrcodeValue[2] == "A") || (this.qrcodeValue[0] == "j" && this.qrcodeValue[1] == "f" && this.qrcodeValue[2] == "a")
    ) {

      this.toggleContagem('count');
      this.qrcodeValue = ''
      this.meuInputRef.nativeElement.focus();
    }
    setTimeout(() => {
      this.qrcodeValue = ""
    }, 100);
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
      console.log(this.tempoOcioso)
      if (
        this.tempoOcioso > this.lmitedTime / 2 &&
        this.tempoOcioso < this.lmitedTime / 2 + 10
      ) {
        if (!this.azulStateCalled) {
          this.operationService.atualizarState(this.operation.name, 'azul');
          this.azulStateCalled = true;
          this.vermelhoStateCalled = false;
        }
      } else if (this.tempoOcioso > this.lmitedTime) {
        if (!this.vermelhoStateCalled) {
          this.operationService.atualizarState(this.operation.name, 'vermelho');
          this.vermelhoStateCalled = true;
          this.azulStateCalled = false;
        }
      }
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.realizadoInterval)
    clearInterval(this.intervalo)
    this.stopTimer('');
  }

  openDialogAviso(): void {
    this.dialog.open(DialogAvisoComponent, {
      width: '900px',
      height: '400px'
    });
  }

  toggleContagem(state: string) {
    clearInterval(this.intervalo);
    this.azulStateCalled = false;
    this.vermelhoStateCalled = false;
    this.tempoOcioso = 0;
    if (this.contadorRodando) {
      if (this.contador >= 15) {
        if(this.onQrcode){
          var qrcodeState = false;
          if(state == "refuse"){
            qrcodeState = false;
          }else{
            qrcodeState = true;
          }
          console.log(this.contador)
          this.operationService.postQrcode(this.nomeOperador, this.qrcodeProduto, qrcodeState, this.operation.name, this.contador).subscribe(res => {
            console.log(res)
          })
          this.onQrcode = false;
        }
        this.tempoOcioso = 0;
        this.intervaloCounter();
        this.stopTimer(state);
        this.stateButton = true;
        this.contador = 0;
        this.operationService.atualizar(this.operation.name, this.contador);
        this.meuInputRef.nativeElement.focus();
      } else {
        this.openDialogAviso();

      }
    } else {
      if (state != 'refuse') {
        this.iniciarContagem(state);
        this.stateButton = false;
      }
    }
  }

  iniciarContagem(state: string) {
    this.currentState = 'verde';
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
        this.currentState = 'vermelho';
        this.operationService.atualizarState(this.operation.name, 'azul');
      } else if (
        this.contador > this.lmitedTime * 3 &&
        this.currentState == 'vermelho'
      ) {
        this.currentState = 'verde';
        this.operationService.atualizarState(this.operation.name, 'vermelho');
      } else if (
        this.contador < this.lmitedTime &&
        this.currentState == 'verde'
      ) {
        this.currentState = 'azul';
        this.operationService.atualizarState(this.operation.name, 'verde');
      }
    }, 1000);
  }

  stopTimer(state: string) {
    this.operationService.getTCimposto().subscribe((res: Main[]) => {
      this.imposto = res[0].imposto;
      this.shiftTime = res[0].shiftTime;
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
      this.operationService.post(body).subscribe((res) => { });
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
      this.operationService.post(body).subscribe((res) => { });
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
      this.operationService.post(body).subscribe((res) => { });
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
    if (this.operation.name === '010') {
      var data = [
        'https://www.youtube.com/embed/s2vDuQ9jpdw?si=h07QbnjSl0jEzYEs&vq=small&quality=tiny',
        'https://www.youtube.com/embed/rxv7e7Q674o?si=uGlDJIR8IjAWV5RG&vq=small&quality=tiny',
        'https://www.youtube.com/embed/YHZJN-4buiE?si=kkcZ-RiDkB38b7aT&vq=small&quality=tiny',
      ];
    } else if (this.operation.name === '020') {
      var data = [
        'https://www.youtube.com/embed/ksfYL1ODJc4?si=WaeJV80yrAZehXRC&vq=small&quality=tiny',
        'https://www.youtube.com/embed/G7QpqSFGRwA?si=VXnRWLg37Bq4SGBF&vq=small&quality=tiny',
      ];
    } else if (this.operation.name === '030') {
      var data = [
        'https://www.youtube.com/embed/V04k--C6glc?si=i7Cwq_-1H9ImWc61&vq=small&quality=tiny',
        'https://www.youtube.com/embed/ve0iyZQNgoE?si=bbLCed56ugwpOuev&vq=small&quality=tiny',
        'https://www.youtube.com/embed/3WzWK5FljUk?si=vjg3KuK__ZSBxCBU&vq=small&quality=tiny',
        'https://www.youtube.com/embed/4V7teTOoY7o?si=341KTg7DCQK3UWD5&vq=small&quality=tiny',
        'https://www.youtube.com/embed/hUMEiPy0iSY?si=A0DfDvwoPVj6H1K6&vq=small&quality=tiny',
      ];
    } else if (this.operation.name === '040') {
      var data = [
        'https://www.youtube.com/embed/CI4bpJHTd6k?si=B-J52p_lGieAE30t&vq=small&quality=tiny',
        'https://www.youtube.com/embed/87iOvOalQTU?si=O_83t60bDhpBYvt3&vq=small&quality=tiny',
        'https://www.youtube.com/embed/1hweE7SAzSk?si=KLF6R2x2I6nievGd&vq=small&quality=tiny',
        'https://www.youtube.com/embed/aMIgqDLO9xM?si=NC_qz-A5ByjoTSLj&vq=small&quality=tiny',
        'https://www.youtube.com/embed/97u5Yn5SrF8?si=aPZissTsNpSA_jDv&vq=small&quality=tiny',
        'https://www.youtube.com/embed/GnSZxDvBdG0?si=RQI5ShH4Qwcb1Lx&vq=small&quality=tiny',
      ];
    } else if (this.operation.name === '050') {
      var data = [
        'https://www.youtube.com/embed/89FzrMcU98w?si=sfgR7DU-cAe8YdQT&vq=small&quality=tiny',
        'https://www.youtube.com/embed/nowHrrIdK1U?si=JL_EYs8aBGeh06A7&vq=small&quality=tiny',
        'https://www.youtube.com/embed/vH2h3_Y382A?si=uyE7wDv4wTO5Mo5C&vq=small&quality=tiny',
        'https://www.youtube.com/embed/d4fxfI7M83Y?si=AEnAi-CILl9RP-GU&vq=small&quality=tiny',
      ];
    } else if (this.operation.name === '060') {
      var data = [
        'https://www.youtube.com/embed/asjtADC5zHM?si=p88jYkIbApne_Z5p&vq=small&quality=tiny',
        'https://www.youtube.com/embed/S6uU0SKhCx4?si=yZ-81pxccbsAPkjv&vq=small&quality=tiny',
        'https://www.youtube.com/embed/oUeZDmqscg8?si=dOs2QYjsUrFsWhhY&vq=small&quality=tiny',
        'https://www.youtube.com/embed/YBZmn44HAVA?si=ZzoWvbK2_rioJQKt&vq=small&quality=tiny',
        'https://www.youtube.com/embed/0RLwkBGf7Dg?si=8daMVu68eE8jshxG&vq=small&quality=tiny',
        'https://www.youtube.com/embed/7shXjAPdUPM?si=k1vRvSgbDUdp1I1L&vq=small&quality=tiny',
      ];
    } else if (this.operation.name === '070') {
      var data = [
        'https://www.youtube.com/embed/f_Y0nA5R7c0?si=h3NZc4WvN8ySyCDj&vq=small&quality=tiny',
        'https://www.youtube.com/embed/fIIWSzsaef8?si=wHbOjDJrJRABB5eE&vq=small&quality=tiny',
        'https://www.youtube.com/embed/d5VfZ86xgCc?si=xSFoMmsXlp4oWqWV&vq=small&quality=tiny',
      ];
    } else if (this.operation.name === '080') {
      var data = [''];
    } else if (this.operation.name === '090') {
      var data = [''];
    } else if (this.operation.name === '100') {
      var data = [''];
    } else if (this.operation.name === '110') {
      var data = [''];
    } else if (this.operation.name === '120') {
      var data = [
        'https://www.youtube.com/embed/Zk5dbikqDBI?si=ubTcELeTBqyL6MtT&vq=small&quality=tiny',
        'https://www.youtube.com/embed/LJtG77ykPYg?si=WmCdkVrYAMAp6KQC&vq=small&quality=tiny',
        'https://www.youtube.com/embed/tE_1_L7oeHs?si=RYMny-JDuMBFnwV8&vq=small&quality=tiny',
      ];
    } else if (this.operation.name === '130') {
      var data = [
        'https://www.youtube.com/embed/RfbnWqIAsSY?si=vdFdd7SyPBOmzGPE&vq=small&quality=tiny',
        'https://www.youtube.com/embed/oMz8IRonqJg?si=BchG-LtU0nNuoMR1&vq=small&quality=tiny',
        'https://www.youtube.com/embed/rxufZSFBSNA?si=sdLKoeZ7Uj6WFR26&vq=small&quality=tiny',
      ];
    } else if (this.operation.name === '140') {
      var data = [
        'https://www.youtube.com/embed/wFuwL9Q34cM?si=7JUFOt4y7hSeSgsS&vq=small&quality=tiny',
        'https://www.youtube.com/embed/C6C7eSEPlDI?si=bhLwUiZZewxGk2_V&vq=small&quality=tiny',
      ];
    } else if (this.operation.name === '150') {
      var data = [
        'https://www.youtube.com/embed/-fn6pTvqKOg?si=fA4ZEeGblNc-opbx&vq=small&quality=tiny',
        'https://www.youtube.com/embed/QZeiNWH3KnU?si=KSfPf1gIU3ANMgE1&vq=small&quality=tiny',
        'https://www.youtube.com/embed/lcek13SiARA?si=6aY5r2ARxXlLtzX2&vq=small&quality=tiny',
      ];
    } else if (this.operation.name === '160') {
      var data = [
        'https://www.youtube.com/embed/na9x9Cw8bLQ?si=gY2AuxXj0PRQSjAV&vq=small&quality=tiny',
      ];
    } else {
      data = [''];
    }
    const dialogRef = this.dialog.open(DialogHelpComponent, {
      data: data,
    });
  }
}
