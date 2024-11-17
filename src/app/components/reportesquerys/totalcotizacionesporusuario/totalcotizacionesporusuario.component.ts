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
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  
  constructor(private cS: CotizacionesService) {}

  ngOnInit(): void {
    this.cS.getSum().subscribe((data) => {
            this.barChartLabels = data.map((item) => item.usuario);
            this.barChartData = [
        {
          data: data.map((item) => item.total_precio),
          label: 'Total Cotizaciones por Usuario',
          backgroundColor: ['#22712e', '#8cdf99', '#30f54f'],
          borderColor: '#22712e',
          borderWidth: 1,
        },
      ];
    });
  }
}
