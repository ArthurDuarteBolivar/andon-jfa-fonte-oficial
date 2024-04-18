import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ResultadoGeral } from 'src/app/module/resultadoGeral';
import { NodemcuService } from 'src/app/service/nodemcu.service';

@Component({
  selector: 'app-controle-geral',
  templateUrl: './controle-geral.component.html',
  styleUrls: ['./controle-geral.component.scss']
})
export class ControleGeralComponent implements OnInit{
  
  constructor(private nodemcuService: NodemcuService){}

  public chart: any;
  resultadoGeral: ResultadoGeral[] = []
  dataImposto: Number[] = []
  dataRealizado: Number[] = []
  data: string[] = []

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
