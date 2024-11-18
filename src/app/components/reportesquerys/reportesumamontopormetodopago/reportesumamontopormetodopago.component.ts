import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { MetodospagoService } from '../../../services/metodospago.service';


@Component({
  selector: 'app-reportesumamontopormetodopago',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportesumamontopormetodopago.component.html',
  styleUrl: './reportesumamontopormetodopago.component.css'
})
export class ReportesumamontopormetodopagoComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private mS:MetodospagoService){}
  ngOnInit(): void {
    this.mS.getQuantity().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.metodo_pago);
      this.barChartData = [
        {
          data: data.map((item) => item.total_pagos),
          label: 'Cantidad de rutas por Vehículo',
          backgroundColor: ['#ff5733', '#ffbd33', '#33b5ff', '#ff1493', '#00b894', '#e17055', '#0984e3', '#fd79a8', '#f39c12', '#9b59b6'],  // Un rojo vibrante para los puntos
          borderColor: '#ffbd33',  // Un amarillo brillante para el borde, creando contraste
          borderWidth: 1,  // Borde más grueso para destacar los puntos
          
        },
      ];
    });
  }

}
