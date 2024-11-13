import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {ChangeDetectionStrategy, signal} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormBuilder} from '@angular/forms';
import { JwtRequest } from '../../../models/jwtRequest';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
            ReactiveFormsModule,
          ],
  templateUrl: './listarlogin.component.html',
  styleUrl: './listarlogin.component.css'
})

export class ListarloginComponent implements OnInit{
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService, 
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {}
  username: string = '';
  password: string = '';
  mensaje: string = '';
  ngOnInit(): void {
    
  }
  
  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }


 
}
