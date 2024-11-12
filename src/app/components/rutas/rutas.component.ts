import { Component } from '@angular/core';
import { ListarrutasComponent } from "./listarrutas/listarrutas.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [RouterOutlet, ListarrutasComponent],
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.css'
})
export class RutasComponent {
  constructor(public route:ActivatedRoute){}

}
