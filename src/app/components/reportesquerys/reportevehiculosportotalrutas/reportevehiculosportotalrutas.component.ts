import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { vehiculosService } from '../../../services/vehiculos.service';
import { RutasService } from '../../../services/rutas.service';

@Component({
  selector: 'app-reportevehiculosportotalrutas',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportevehiculosportotalrutas.component.html',
  styleUrl: './reportevehiculosportotalrutas.component.css'
})
export class ReportevehiculosportotalrutasComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'scatter';
  scatterChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private vS:vehiculosService){}
  ngOnInit(): void {
    this.vS.getQuantityRutas().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.placa);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad de rutas por Vehículo',
          backgroundColor: '#22712e',  // Color de los puntos en el gráfico
          borderColor: '#22712e',
          borderWidth: 1,
        },
      ];
    });
  }
}

