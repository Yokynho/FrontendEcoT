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
  barChartType: ChartType = 'doughnut';
  doughnutChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private qS:QuejasService){}
  ngOnInit(): void {
    this.qS.getQuantity().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.tipo);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
label: 'Cantidad de Quejas',
backgroundColor: ['#ff6347', '#ff7f50', '#ff1493', '#1e90ff', '#32cd32', '#ff8c00', '#9b30ff', '#ffb6c1'],
borderColor: '#333333',  // Borde oscuro para buen contraste
borderWidth: 1,
        },
      ];
    });
  }
}
