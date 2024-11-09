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
  edicion:boolean=false;
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
    private router: Router,
    private route: ActivatedRoute){}

  listaRoles: { value: string; viewValue: string }[] = [
    { value: 'Agricultor', viewValue: 'Agricultor' },
    { value: 'Distribuidor', viewValue: 'Distribuidor' },
    { value: 'Administrador', viewValue: 'Administrador' },
  ];

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      hcodigo:new FormControl('',[]),
      hdni:new FormControl('',[Validators.required, Validators.pattern('^[0-9]{8}$')]),
      hnombre:new FormControl('',[Validators.required]),
      hdireccion:new FormControl('',[Validators.required]),
      htelefono:new FormControl('',[Validators.required]),
      hfecha:new FormControl([{ value: new Date(), disabled: true }, Validators.required]),
      henabled:new FormControl([true,Validators.required]),
      husername:new FormControl('',[Validators.required]),
      hpassword:new FormControl('',[Validators.required]),
    });
  }

  insertar():void{
    if(this.form.valid){
      this.usuarios.idUsuarios=this.form.value.hcodigo;
      this.usuarios.dni=this.form.value.hdni;
      this.usuarios.nombre=this.form.value.hnombre;
      this.usuarios.direccion=this.form.value.hdireccion;
      this.usuarios.telefono=this.form.value.htelefono;
      this.usuarios.fecha_registro=this.form.get('hfecha')?.value;
      this.usuarios.enabled=this.form.get('henabled')?.value;
      this.usuarios.username=this.form.value.husername;
      this.usuarios.password=this.form.value.hpassword;
      
      
      this.uS.insert(this.usuarios).subscribe((data)=>{
        this.uS.list().subscribe((data)=>{
           this.uS.setList(data);
        });
      });
    }
    this.router.navigate(['/'])
  }

  
}
