import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrastreosComponent } from './listarrastreos/listarrastreos.component';

@Component({
  selector: 'app-rastreos',
  standalone: true,
  imports: [RouterOutlet, ListarrastreosComponent],
  templateUrl: './rastreos.component.html',
  styleUrl: './rastreos.component.css'
})
export class RastreosComponent {
  constructor(public route:ActivatedRoute){}
}
