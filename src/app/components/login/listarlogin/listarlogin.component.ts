import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, RouterOutlet } from '@angular/router';
import {ChangeDetectionStrategy, signal} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-listarlogin',
  standalone: true,
  imports: [MatIconModule,
            RouterOutlet, 
            RouterModule, 
            MatButtonModule,
            FormsModule, 
            MatFormFieldModule, 
            MatInputModule,
            MatCheckboxModule,
          ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './listarlogin.component.html',
  styleUrl: './listarlogin.component.css'
})

export class ListarloginComponent {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
