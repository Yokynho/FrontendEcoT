import { Component } from '@angular/core';
import { ActivatedRoute,RouterOutlet } from '@angular/router';
import { ListarcultivosComponent } from "./listarcultivos/listarcultivos.component";

@Component({
  selector: 'app-cultivos',
  standalone: true,
  imports: [RouterOutlet, ListarcultivosComponent],
  templateUrl: './cultivos.component.html',
  styleUrl: './cultivos.component.css'
})
export class CultivosComponent {
  constructor(public route:ActivatedRoute){}

}
