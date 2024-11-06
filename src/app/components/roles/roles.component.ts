import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarolesComponent } from './listaroles/listaroles.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RouterOutlet, ListarolesComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  constructor(public route:ActivatedRoute){}

}
