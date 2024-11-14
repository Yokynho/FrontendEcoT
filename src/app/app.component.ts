import { Component } from '@angular/core';
import { Router,RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    UsuariosComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEcotrack';
  role: string=''
  constructor(public route:Router,
              private loginService: LoginService
  ){}

  shouldShowForm(): boolean {
    const excludedRoutes = [
      '/login',
      '/home',
      '/signup',
      '/usuarios',
      '/usuarios/nuevo',
      '/home/cultivos',
      '/home/cultivos/nuevo',
      '/home/lotes',
      '/home/lotes/nuevo',
      '/home/quejas',
      '/home/quejas/nuevo',
      '/home/metodospago',
      '/home/metodospago/nuevo',
      '/home/roles',
      '/home/roles/nuevo',
      '/home/controles',
      '/home/controles/nuevo',
      '/home/soluciones',
      '/home/soluciones/nuevo',
      '/home/pagos',
      '/home/pagos/nuevo',
      '/home/vehiculos',
      '/home/vehiculos/nuevo',
      '/home/rutas',
      '/home/rutas/nuevo',
      '/home/rastreos',
      '/home/rastreos/nuevo',
      '/home/cotizaciones',
      '/home/cotizaciones/nuevo',
    ];

    // Verifica si la ruta actual es alguna de las excluidas o contiene una de las rutas dinámicas
    return !excludedRoutes.some(route => this.route.url.startsWith(route)) &&
           !this.route.url.startsWith('/home/cultivos/ediciones') &&
           !this.route.url.startsWith('/home/lotes/ediciones') &&
           !this.route.url.startsWith('/home/metodospago/ediciones') &&
           !this.route.url.startsWith('/home/roles/ediciones')  &&
           !this.route.url.startsWith('/home/usuarios/ediciones') &&
           !this.route.url.startsWith('/home/controles/ediciones') &&
           !this.route.url.startsWith('/home/soluciones/ediciones') &&
           !this.route.url.startsWith('/home/vehiculos/ediciones') &&
           !this.route.url.startsWith('/home/rutas/ediciones') &&
           !this.route.url.startsWith('/home/rastreos/ediciones') &&
           !this.route.url.startsWith('/home/quejas/ediciones') &&
           !this.route.url.startsWith('/home/cotizaciones/ediciones') &&
           !this.route.url.startsWith('/home/pagos/ediciones');
  }
  
}
