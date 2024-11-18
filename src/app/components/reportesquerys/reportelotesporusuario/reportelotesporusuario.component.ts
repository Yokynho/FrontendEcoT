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
          backgroundColor: ['#ff6f61', '#f39c12', '#1f77b4', '#e74c3c', '#2ecc71'],
          borderColor: '#2c3e50',
          borderWidth: 1,
        },
      ];
    });
  }
}
