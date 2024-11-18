import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PagosService } from '../../../services/pagos.service';

@Component({
  selector: 'app-reportepagoporfecha',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportepagoporfecha.component.html',
  styleUrl: './reportepagoporfecha.component.css'
})
export class ReportepagoporfechaComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private pS:PagosService){}
  ngOnInit(): void {
    this.pS.obtenerCantidad().subscribe((data) => {
      this.barChartLabels = data.map((item) =>
        new Date(item.fecha_pago).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      ); // Convierte las fechas al formato "dd MMM yyyy"
  
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad de Pagos',
          backgroundColor: ['#ff5733', '#ffbd33', '#33b5ff', '#ff1493', '#00b894', '#e17055', '#0984e3', '#fd79a8', '#f39c12', '#9b59b6'],
          borderColor: '#333333',
          borderWidth: 1,
          
        },
      ];
    });
  }  
}
