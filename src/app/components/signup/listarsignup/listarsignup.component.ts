import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, ValidationErrors, FormControl} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterModule, RouterOutlet } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { Usuarios } from '../../../models/Usuarios';
import { UsuariosService } from '../../../services/usuarios.service';
import { Roles } from '../../../models/Roles';
import { RolesService } from '../../../services/roles.service';
import { timeoutProvider } from 'rxjs/internal/scheduler/timeoutProvider';


@Component({
  selector: 'app-listarsignup',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [MatIconModule, 
            RouterModule, 
            RouterOutlet, 
            MatButtonModule,
            FormsModule, 
            MatFormFieldModule, 
            MatInputModule,
            MatCheckboxModule,
            MatSelectModule,
            MatDatepickerModule,
            ReactiveFormsModule,
            CommonModule,
          ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './listarsignup.component.html',
  styleUrl: './listarsignup.component.css'
})
export class ListarsignupComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  usuarios:Usuarios=new Usuarios();
  roles:Roles=new Roles();
  idUSER:number=0
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
    private rS: RolesService,
  ){}

  listaRoles: { value: String; viewValue: string }[] = [
    { value: 'Administrador', viewValue: 'Administrador' },
    { value: 'Distribuidor', viewValue: 'Distribuidor' },
    { value: 'Agricultor', viewValue: 'Agricultor' },
  ];

  ngOnInit() {
    this.form=this.formBuilder.group({
      hcodigo: [''],
      hdni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')]),
      hnombre:new FormControl('',Validators.required),
      hdireccion:new FormControl('',Validators.required),
      htelefono:new FormControl('',Validators.required),
      hfecha:new FormControl({ value: new Date(), disabled: true }, Validators.required),
      henabled:new FormControl(true,Validators.required),
      husername:new FormControl('',Validators.required),
      hpassword:new FormControl('',Validators.required),
      hrol:new FormControl(''),
    });
    
  }


  
  
  insertar():void{
    if (this.form.valid) {
      const formValues = this.form.value;
      this.usuarios = {
        idUsuarios: 0,
        dni: formValues.hdni,
        nombre: formValues.hnombre,
        direccion: formValues.hdireccion,
        telefono: formValues.htelefono,
        fecha_registro: this.form.get('hfecha')?.value,
        enabled: this.form.get('henabled')?.value,
        username: formValues.husername,
        password: formValues.hpassword,
      };
      
      this.uS.insert(this.usuarios).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
          this.idUSER =  this.usuarios.idUsuarios;
          
          
        });
      });
      this.insertarRol(this.idUSER);
      this.router.navigate(['/signup']);
    }
  }
  
  insertarRol(id:number):void{
    if (this.form.valid) {
      this.roles.idRoles=0;
      this.roles.tipo=this.form.value.hrol;
      this.roles.usuario.idUsuarios=id;
      this.rS.insert(this.roles).subscribe(() => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
    }
  }

}
