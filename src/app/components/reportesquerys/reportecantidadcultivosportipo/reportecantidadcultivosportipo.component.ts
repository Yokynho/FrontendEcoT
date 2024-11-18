import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CultivosService } from '../../../services/cultivos.service';

@Component({
  selector: 'app-reportecantidadcultivosportipo',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportecantidadcultivosportipo.component.html',
  styleUrl: './reportecantidadcultivosportipo.component.css'
})
export class ReportecantidadcultivosportipoComponent implements OnInit{
  
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private cS:CultivosService){}
  ngOnInit(): void {
    this.cS.getQuantity().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.tipo);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad de Cultivos por Tipo',
          backgroundColor: ['#ff5733', '#ffbd33', '#33b5ff', '#ff1493', '#00b894', '#e17055', '#0984e3', '#fd79a8', '#f39c12', '#9b59b6'],  // Un rojo vibrante para los puntos
          borderColor: '#ffbd33',  // Un amarillo brillante para el borde, creando contraste
          borderWidth: 1,  // Borde más grueso para destacar los puntos
          
        },
      ];
    });
  }
}
