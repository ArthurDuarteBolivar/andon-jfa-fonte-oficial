import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { RealizadoGeral } from 'src/app/module/realizadoGeral';
import { ResultadoGeral } from 'src/app/module/resultadoGeral';
import { MainService } from 'src/app/service/main.service';
import { NodemcuService } from 'src/app/service/nodemcu.service';

@Component({
  selector: 'app-controle-geral',
  templateUrl: './controle-geral.component.html',
  styleUrls: ['./controle-geral.component.scss']
})
export class ControleGeralComponent implements OnInit{

  constructor(private nodemcuService: NodemcuService, private mainService: MainService){}

  public chart: any;
  resultadoGeral: ResultadoGeral[] = []
  dataImposto: Number[] = []
  dataRealizado: Number[] = []
  data: string[] = []
  controleRealizado: RealizadoGeral[] = []

  ngOnInit(): void {
    this.nodemcuService.getAllResultadoGeral().subscribe(res => {
      this.resultadoGeral = res
      this.resultadoGeral.forEach(item => {
        this.dataImposto.push(item.imposto)
        this.dataRealizado.push(item.realizado)
        this.data.push(new Date(item.data).toLocaleDateString())
      })
      this.createChart();
    })

    this.mainService.getControleRealizadoByDate().subscribe(res => {
      this.controleRealizado = res
    })
  }

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: this.data,
	       datasets: [
          {
            label: "Previsto",
            data: this.dataImposto,
            backgroundColor: 'blue'
          },
          {
            label: "Realizado",
            data: this.dataRealizado,
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
}
