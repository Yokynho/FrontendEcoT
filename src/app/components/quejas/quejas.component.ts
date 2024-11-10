import { Component } from '@angular/core';
import { ListarquejasComponent } from "./listarquejas/listarquejas.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-quejas',
  standalone: true,
  imports: [ListarquejasComponent, RouterOutlet],
  templateUrl: './quejas.component.html',
  styleUrl: './quejas.component.css'
})
export class QuejasComponent {
  constructor(public route:ActivatedRoute){}
}
