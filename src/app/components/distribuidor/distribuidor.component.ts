import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-distribuidor',
  standalone: true,
  imports: [RouterModule,
            RouterOutlet,
            MatIconModule,
            MatMenuModule,
            MatToolbarModule
  ],
  templateUrl: './distribuidor.component.html',
  styleUrl: './distribuidor.component.css'
})
export class DistribuidorComponent {

}
