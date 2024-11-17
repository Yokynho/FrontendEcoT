import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-reporteusuarioporrol',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporteusuarioporrol.component.html',
  styleUrl: './reporteusuarioporrol.component.css'
})
export class ReporteusuarioporrolComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private rS:RolesService){}
  ngOnInit(): void {
    this.rS.getQuantity().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.tipo);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad de Usuarios',
          backgroundColor:['#22712e','#8cdf99','#30f54f'],
          borderColor:'#22712e',
          borderWidth:1
        },
      ];
    });
  }
}
