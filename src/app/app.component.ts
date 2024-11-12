import { Component } from '@angular/core';
import { Router,RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './components/usuarios/usuarios.component';


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
  constructor(public route:Router){}
  title = 'FrontEcotrack';
  shouldShowForm(): boolean {
    const excludedRoutes = [
      '/login',
      '/signup',
      '/usuarios',
      '/usuarios/nuevo',
      '/agricultor',
      '/agricultor/cultivos',
      '/agricultor/cultivos/nuevo',
      '/agricultor/lotes',
      '/agricultor/lotes/nuevo',
      '/agricultor/quejas',
      '/agricultor/quejas/nuevo',
      '/agricultor/metodospago',
      '/agricultor/metodospago/nuevo',
      '/agricultor/rastreos',
      '/administrador',
      '/administrador/roles',
      '/administrador/roles/nuevo',
      '/administrador/usuarios',
      '/administrador/usuarios/nuevo',
      '/administrador/controles',
      '/administrador/controles/nuevo',
      '/administrador/reportes',
      '/administrador/reportes/nuevo',
      '/administrador/pagos',
      '/distribuidor',
      '/distribuidor/vehiculos',
      '/distribuidor/vehiculos/nuevo',
      '/distribuidor/rutas',
      '/distribuidor/rutas/nuevo',
      '/distribuidor/rastreos',
      '/distribuidor/rastreos/nuevo',
      '/distribuidor/quejas',
      '/distribuidor/quejas/nuevo',
      '/distribuidor/cotizaciones',
      '/distribuidor/cotizaciones/nuevo',
      '/distribuidor/pagos',
      '/distribuidor/lotes',
    ];

    // Verifica si la ruta actual es alguna de las excluidas o contiene una de las rutas dinámicas
    return !excludedRoutes.some(route => this.route.url.startsWith(route)) &&
           !this.route.url.startsWith('/agricultor/cultivos/ediciones') &&
           !this.route.url.startsWith('/agricultor/lotes/ediciones') &&
           !this.route.url.startsWith('/agricultor/quejas/ediciones') &&
           !this.route.url.startsWith('/agricultor/metodospago/ediciones') &&
           !this.route.url.startsWith('/administrador/roles/ediciones')  &&
           !this.route.url.startsWith('/administrador/usuarios/ediciones') &&
           !this.route.url.startsWith('/administrador/controles/ediciones') &&
           !this.route.url.startsWith('/administrador/reportes/ediciones') &&
           !this.route.url.startsWith('/distribuidor/vehiculos/ediciones') &&
           !this.route.url.startsWith('/distribuidor/rutas/ediciones') &&
           !this.route.url.startsWith('/distribuidor/rastreos/ediciones') &&
           !this.route.url.startsWith('/distribuidor/quejas/ediciones') &&
           !this.route.url.startsWith('/distribuidor/cotizaciones/ediciones');
  }
}
