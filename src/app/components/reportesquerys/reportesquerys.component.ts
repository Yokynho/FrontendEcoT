import { Component } from '@angular/core';
import { ReportequejasxusuarioComponent } from "./reportequejasxusuario/reportequejasxusuario.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportesquerys',
  standalone: true,
  imports: [RouterOutlet, ReportequejasxusuarioComponent],
  templateUrl: './reportesquerys.component.html',
  styleUrl: './reportesquerys.component.css'
})
export class ReportesquerysComponent {
  constructor(public route: ActivatedRoute) {}

}
