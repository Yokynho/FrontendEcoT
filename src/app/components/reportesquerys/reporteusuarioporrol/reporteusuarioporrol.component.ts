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
  barChartType: ChartType = 'line';
  areaChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private rS:RolesService){}
  ngOnInit(): void {
    this.rS.getQuantity().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.tipo);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad de Usuarios',
          backgroundColor: ['#ff5733', '#ffbd33', '#33b5ff'],  // Colores más vibrantes
          borderColor: '#1a1a1a',  // Borde oscuro para mayor contraste
          borderWidth: 2,  // Borde más grueso para hacer que las barras resalten
          fill: true,  // Para rellenar el área debajo de las barras (para un gráfico tipo área)
          
        },
      ];
    });
  }
}
