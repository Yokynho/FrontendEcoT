import { Component } from '@angular/core';
import { ListarmetodospagoComponent } from "./listarmetodospago/listarmetodospago.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-metodospago',
  standalone: true,
  imports: [ListarmetodospagoComponent, RouterOutlet],
  templateUrl: './metodospago.component.html',
  styleUrl: './metodospago.component.css'
})
export class MetodospagoComponent {
  constructor(public route:ActivatedRoute){}
}
