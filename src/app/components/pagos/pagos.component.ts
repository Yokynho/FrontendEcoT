import { Component } from '@angular/core';
import { ListarpagosComponent } from "./listarpagos/listarpagos.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [RouterOutlet, ListarpagosComponent],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent {
  constructor(public route:ActivatedRoute){}
}
