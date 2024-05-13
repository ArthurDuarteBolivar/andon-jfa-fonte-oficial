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
      this.resultadoGeral = res;
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      // Get the number of days in the current month
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
      // Populate the data array with weekdays (Monday to Friday) of the current month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dayOfWeek = date.getDay();
        // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          this.data.push(date.toLocaleDateString());
          this.dataImposto.push(0)
          this.dataRealizado.push(0)
        }
      }
  
      this.resultadoGeral.forEach(item => {
        for(let i = 0; i < this.data.length; i++){
          // console.log(this.data[i])
          console.log(new Date(item.data).toLocaleDateString(), this.data[i])
          if(this.data[i] == new Date(item.data).toLocaleDateString()){
            this.dataImposto[i] = item.imposto;
            this.dataRealizado[i] = item.realizado;
          }
        }
      });
  
      this.createChart();
    });

    this.mainService.getControleRealizadoByDate().subscribe(res => {
      this.controleRealizado = res
    })
  }
  

  createChart(){
  
    this.chart = new Chart("MyChart", {
      data: {
        labels: this.data, 
	       datasets: [
          {
            type: 'line',
            label: "Previsto",
            data: this.dataImposto,
            fill: false,
            borderColor: 'orange'
          },
          {
            type: 'bar', 
            label: "Realizado",
            data: this.dataRealizado,
            backgroundColor: '#11548F'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
}
