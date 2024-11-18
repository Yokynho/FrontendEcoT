import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CotizacionesService } from '../../../services/cotizaciones.service';

@Component({
  selector: 'app-totalcotizacionesporusuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './totalcotizacionesporusuario.component.html',
  styleUrl: './totalcotizacionesporusuario.component.css'
})
export class TotalcotizacionesporusuarioComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  doughnutChartLegend = true;
  barChartData: ChartDataset[] = [];
  
  constructor(private cS: CotizacionesService) {}

  ngOnInit(): void {
    this.cS.getSum().subscribe((data) => {
            this.barChartLabels = data.map((item) => item.nombre);
            this.barChartData = [
        {
          data: data.map((item) => item.precio),
          label: 'Total Cotizaciones por Usuario',
          backgroundColor: ['#ff5733', '#ffbd33', '#33b5ff', '#ff1493', '#00b894', '#e17055', '#0984e3', '#fd79a8', '#f39c12', '#9b59b6'],  // Colores llamativos para los segmentos
          borderColor: '#ff5733',  // Color de borde a juego con el primer color
          borderWidth: 1,  // Borde más grueso para resaltar los segmentos
        },
      ];
    });
  }
}
