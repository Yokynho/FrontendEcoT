import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { vehiculosService } from '../../../services/vehiculos.service';

@Component({
  selector: 'app-reporteplacaporcantidadcarga',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporteplacaporcantidadcarga.component.html',
  styleUrl: './reporteplacaporcantidadcarga.component.css'
})
export class ReporteplacaporcantidadcargaComponent implements OnInit{
    barChartOptions: ChartOptions = {
      responsive: true,
    };
    barChartLabels: string[] = [];
    barChartType: ChartType = 'pie';
    barChartLegend = true;
    barChartData: ChartDataset[] = [];
    constructor(private vS:vehiculosService){}
    ngOnInit(): void {
      this.vS.getQuantity().subscribe((data) => {
        this.barChartLabels = data.map((item) => item.placa);
        this.barChartData = [
          {
            data: data.map((item) => item.capacidad_carga),
            label: 'Cantidad de Capacidad de carga',
            backgroundColor:['#22712e','#8cdf99','#30f54f'],
            borderColor:'#22712e',
            borderWidth:1
          },
        ];
      });
    }
  }
