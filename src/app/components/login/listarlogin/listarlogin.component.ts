import { Component } from '@angular/core';
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

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService, 
    private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      husername: ['', Validators.required],
      hpassword: ['', Validators.required]
    });
  }  
  



  onLogin(): void {
    this.uS.login(this.loginForm.value.husername,this.loginForm.value.hpassword).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        // Aquí podrías almacenar el token en localStorage o cookies
        this.router.navigate(['/']); // Redirige a la página de inicio o dashboard
      },
      error: (error) => {
        console.error('Error en la autenticación:', error);
        // Aquí puedes mostrar un mensaje de error en la UI
        alert('Credenciales incorrectas');
      }
    });
  }
}
