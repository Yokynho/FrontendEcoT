import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,
    RouterOutlet,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  role: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isAgricultor() {
    return this.role === 'AGRICULTOR';
  }

  isDistribuidor() {
    return this.role === 'DISTRIBUIDOR';
  }
  isAdministrador(){
    return this.role === 'ADMINISTRADOR';
  }
}
