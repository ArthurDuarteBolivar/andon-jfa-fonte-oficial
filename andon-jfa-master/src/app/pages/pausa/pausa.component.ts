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
  OnCafe: boolean = false;
  OnAlmoco: boolean = false;

  ngOnInit(): void {
  }
  cafe() {
    this.nodemcuService.postPausa()
    this.OnCafe = true
    this.nodemcuService.pausa(true).subscribe()
    this.openSnackBar("Pausado com sucesso")
    setTimeout(() => {
      this.openSnackBar("Reiniciado com sucesso")
      this.nodemcuService.pausa(false).subscribe()
      this.OnCafe = false
    }, 60000); //10 minutos
  }
  almoco() {
    this.nodemcuService.postPausa()
    this.OnAlmoco = true
    this.openSnackBar("Pausado com sucesso")
    this.nodemcuService.pausa(true).subscribe()
    setTimeout(() => {
      this.OnAlmoco = false
      this.nodemcuService.pausa(false).subscribe()
      this.openSnackBar("Reiniciado com sucesso")
      
    }, 60000);//60 minutos
    //3600000
    
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, 'OK', {
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }
}