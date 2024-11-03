import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcontrolesComponent } from './listarcontroles/listarcontroles.component';

@Component({
  selector: 'app-controles',
  standalone: true,
  imports: [RouterOutlet,ListarcontrolesComponent],
  templateUrl: './controles.component.html',
  styleUrl: './controles.component.css'
})
export class ControlesComponent {
  constructor(public route:ActivatedRoute){}
}
