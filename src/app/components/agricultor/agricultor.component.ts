import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-agricultor',
  standalone: true,
  imports: [RouterModule,
            RouterOutlet,
            MatIconModule,
            MatMenuModule,
            MatToolbarModule
  ],
  templateUrl: './agricultor.component.html',
  styleUrl: './agricultor.component.css'
})
export class AgricultorComponent {

}
