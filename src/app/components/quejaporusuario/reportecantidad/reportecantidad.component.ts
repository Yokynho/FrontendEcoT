import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsuariosService } from '../../../services/usuarios.service';
import { ReactiveFormsModule } from '@angular/forms';
Chart.register(...registerables);

@Component({
  selector: 'app-reportecantidad',
  standalone: true,
  imports: [BaseChartDirective, ReactiveFormsModule],
  templateUrl: './reportecantidad.component.html',
  styleUrl: './reportecantidad.component.css'
})
export class ReportecantidadComponent implements OnInit{
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
          label: 'Cantidad de Queas',
          backgroundColor:['#22712e','#8cdf99','#30f54f'],
          borderColor:'#22712e',
          borderWidth:1
        },
      ];
    });
  }

}
