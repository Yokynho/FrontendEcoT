import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportecantidadComponent } from './reportecantidad/reportecantidad.component';

@Component({
  selector: 'app-quejaporusuario',
  standalone: true,
  imports: [RouterOutlet, ReportecantidadComponent],
  templateUrl: './quejaporusuario.component.html',
  styleUrl: './quejaporusuario.component.css'
})
export class QuejaporusuarioComponent {
  constructor(public route: ActivatedRoute) {}
}
