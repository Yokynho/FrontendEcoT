import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportecantidadComponent } from './reportecantidad/reportecantidad.component';

@Component({
  selector: 'app-vehiculosdisponibles',
  standalone: true,
  imports: [RouterOutlet, ReportecantidadComponent],
  templateUrl: './vehiculosdisponibles.component.html',
  styleUrl: './vehiculosdisponibles.component.css'
})
export class VehiculosdisponiblesComponent {
  constructor(public route: ActivatedRoute) {}

}
