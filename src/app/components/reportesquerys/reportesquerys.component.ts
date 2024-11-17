import { Component } from '@angular/core';
import { ReportequejasxusuarioComponent } from "./reportequejasxusuario/reportequejasxusuario.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TotalcotizacionesporusuarioComponent } from './totalcotizacionesporusuario/totalcotizacionesporusuario.component';

@Component({
  selector: 'app-reportesquerys',
  standalone: true,
  imports: [    RouterOutlet,
    ReportequejasxusuarioComponent,
    TotalcotizacionesporusuarioComponent,],
  templateUrl: './reportesquerys.component.html',
  styleUrl: './reportesquerys.component.css'
})
export class ReportesquerysComponent {
  constructor(public route: ActivatedRoute) {}

}
