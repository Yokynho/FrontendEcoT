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
      'home/cultivos',
      'home/cultivos/nuevo',
      '/lotes',
      '/lotes/nuevo',
      '/quejas',
      '/quejas/nuevo',
      '/metodospago',
      '/metodospago/nuevo',
      '/roles',
      '/roles/nuevo',
      '/controles',
      '/controles/nuevo',
      '/reportes',
      '/reportes/nuevo',
      '/pagos',
      '/pagos/nuevo',
      '/vehiculos',
      '/vehiculos/nuevo',
      '/rutas',
      '/rutas/nuevo',
      '/rastreos',
      '/rastreos/nuevo',
      '/cotizaciones',
      '/cotizaciones/nuevo',
    ];

    // Verifica si la ruta actual es alguna de las excluidas o contiene una de las rutas dinámicas
    return !excludedRoutes.some(route => this.route.url.startsWith(route)) &&
           !this.route.url.startsWith('/cultivos/ediciones') &&
           !this.route.url.startsWith('/lotes/ediciones') &&
           !this.route.url.startsWith('/metodospago/ediciones') &&
           !this.route.url.startsWith('/roles/ediciones')  &&
           !this.route.url.startsWith('/usuarios/ediciones') &&
           !this.route.url.startsWith('/controles/ediciones') &&
           !this.route.url.startsWith('/reportes/ediciones') &&
           !this.route.url.startsWith('/vehiculos/ediciones') &&
           !this.route.url.startsWith('/rutas/ediciones') &&
           !this.route.url.startsWith('/rastreos/ediciones') &&
           !this.route.url.startsWith('/quejas/ediciones') &&
           !this.route.url.startsWith('/cotizaciones/ediciones') &&
           !this.route.url.startsWith('/pagos/ediciones');
  }
  
}
