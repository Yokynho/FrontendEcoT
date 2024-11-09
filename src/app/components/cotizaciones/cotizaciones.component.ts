import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcotizacionesComponent } from './listarcotizaciones/listarcotizaciones.component';

@Component({
  selector: 'app-traffic-ticket',
  standalone: true,
  imports: [RouterOutlet, ListarcotizacionesComponent],
  templateUrl: './cotizaciones.component.html',
  styleUrl: './cotizaciones.component.css'
})
export class CotizacionesComponent {
  constructor(public route:ActivatedRoute) {}
}
