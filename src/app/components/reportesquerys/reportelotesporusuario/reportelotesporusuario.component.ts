import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LotesService } from '../../../services/lotes.service';

@Component({
  selector: 'app-reportelotesporusuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportelotesporusuario.component.html',
  styleUrl: './reportelotesporusuario.component.css'
})
export class ReportelotesporusuarioComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private lS:LotesService){}
  ngOnInit(): void {
    this.lS.getQuantity().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombre);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad de Lotes',
          backgroundColor: ['#ff5733', '#ffbd33', '#33b5ff', '#ff1493', '#00b894', '#e17055', '#0984e3', '#fd79a8', '#f39c12', '#9b59b6'],
          borderColor: '#2c3e50',
          borderWidth: 1,
        },
      ];
    });
  }
}
