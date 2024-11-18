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
          backgroundColor: ['#ff6347', '#ffcc00', '#32cd32'],  // Colores más brillantes y contrastantes
          borderColor: '#000000',  // Borde oscuro para buen contraste
          borderWidth: 1,  // Borde con grosor de 1px   
        },
      ];
    });
  }
}
