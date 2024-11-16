import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { vehiculosService } from '../../../services/vehiculos.service';
import { BaseChartDirective } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportecantidad',
  standalone: true,
  imports: [BaseChartDirective, ReactiveFormsModule],
  templateUrl: './reportecantidad.component.html',
  styleUrl: './reportecantidad.component.css'
})
export class ReportecantidadComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private vS:vehiculosService){}
  ngOnInit(): void {
    this.vS.obtenerCantidad().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.placa);
      this.barChartData = [
        {
          data: data.map((item) => item.capacidad_carga),
          label: 'Capacidad de Carga',
          backgroundColor: ['#22712e', '#8cdf99', '#30f54f'],
          borderColor: '#22712e',
          borderWidth: 1,
        },
        {
          data: data.map((item) => item.estado === 'activo' ? 1 : 0), // Ejemplo: 1 para 'activo', 0 para 'inactivo'
          label: 'Estado (Activo/Inactivo)',
          backgroundColor: ['#1e90ff', '#87cefa'],
          borderColor: '#1e90ff',
          borderWidth: 1,
        },
      ];
    });
  }
  

}
