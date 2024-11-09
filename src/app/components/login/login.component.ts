import { Component } from '@angular/core';
import { RouterOutlet,ActivatedRoute } from '@angular/router';
import { ListarloginComponent } from './listarlogin/listarlogin.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ListarloginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(public route:ActivatedRoute){}
}
