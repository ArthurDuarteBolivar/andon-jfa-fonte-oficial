import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NodemcuService } from 'src/app/service/nodemcu.service';

@Component({
  selector: 'app-pausa',
  templateUrl: './pausa.component.html',
  styleUrls: ['./pausa.component.scss']
})
export class PausaComponent implements OnInit {

  constructor(private nodemcuService: NodemcuService, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
  }
  cafe() {
    this.nodemcuService.pausa(true).subscribe()
    this.openSnackBar("Pausado com sucesso")
    setTimeout(() => {
      this.openSnackBar("Reiniciado com sucesso")
      this.nodemcuService.pausa(false).subscribe()
    }, 600000); //10 minutos
  }
  almoco() {
    this.openSnackBar("Pausado com sucesso")
    this.nodemcuService.pausa(true).subscribe()
    setTimeout(() => {
      this.nodemcuService.pausa(false).subscribe()
      this.openSnackBar("Reiniciado com sucesso")
    }, 3600000);//60 minutos
    
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, 'OK', {
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }
}
