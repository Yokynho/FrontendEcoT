import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-reportequejasxusuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportequejasxusuario.component.html',
  styleUrl: './reportequejasxusuario.component.css'
})
export class ReportequejasxusuarioComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private uS:UsuariosService){}
  ngOnInit(): void {
    this.uS.obtenerCantidad().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombre);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad de Quejas',
          backgroundColor: ['#ff5733', '#ffbd33', '#33b5ff', '#ff1493', '#00b894', '#e17055', '#0984e3', '#fd79a8', '#f39c12', '#9b59b6'],  // Colores más brillantes y contrastantes
          borderColor: '#333333',  // Borde oscuro para buen contraste
          borderWidth: 1,  // Borde con grosor de 1px   
        },
      ];
    });
  }
}
