import { Component } from '@angular/core';
import { ListarvehiculosComponent } from "./listarvehiculos/listarvehiculos.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [RouterOutlet, ListarvehiculosComponent],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent {
  constructor(public route:ActivatedRoute){}
}
