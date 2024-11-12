import { Component } from '@angular/core';
import { ListarreportesComponent } from "./listarreportes/listarreportes.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [ RouterOutlet, ListarreportesComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route:ActivatedRoute){}
}
