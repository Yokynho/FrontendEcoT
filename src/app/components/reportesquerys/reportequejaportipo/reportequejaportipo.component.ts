import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { QuejasService } from '../../../services/quejas.service';

@Component({
  selector: 'app-reportequejaportipo',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportequejaportipo.component.html',
  styleUrl: './reportequejaportipo.component.css'
})
export class ReportequejaportipoComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'radar';
  radarChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private qS:QuejasService){}
  ngOnInit(): void {
    this.qS.getQuantity().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.tipo);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad de Quejas',
          backgroundColor:['#22712e','#8cdf99','#30f54f'],
          borderColor:'#22712e',
          borderWidth:1
        },
      ];
    });
  }
}
