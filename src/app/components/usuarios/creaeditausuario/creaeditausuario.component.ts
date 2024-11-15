import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuarios } from '../../../models/Usuarios';
import { UsuariosService } from '../../../services/usuarios.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-creaeditausuario',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './creaeditausuario.component.html',
  styleUrl: './creaeditausuario.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreaeditausuarioComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  usuarios:Usuarios=new Usuarios();
  id:number=0;
  edicion:boolean=false;
  hide = signal(true);
  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  ngOnInit()  {
    this.route.params.subscribe((data: Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init();
    });
    this.form=this.formBuilder.group({
      hcodigo:[''],
      hdni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')]),
      hnombre:new FormControl('',Validators.required),
      hdireccion:new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,.-/]+$')]),
      htelefono:new FormControl('',[Validators.required, Validators.pattern('^[0-9]{8,12}$')]),
      hfecha:new FormControl({ value: new Date(), disabled: true }, Validators.required),
      henabled:new FormControl(true, Validators.required),
      husername:new FormControl('',Validators.required),
      hpassword:new FormControl('',Validators.required),
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
      if(this.edicion){
        this.uS.update(this.usuarios).subscribe((data)=>{
          this.uS.list().subscribe((data)=>{
            this.uS.setList(data);
          });
        });
      } else{
        this.uS.insert(this.usuarios).subscribe((data)=>{
          this.uS.list().subscribe((data)=>{
            this.uS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['home/usuarios'])
  }

  init(){
    if(this.edicion){
      this.uS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          hcodigo: new FormControl(data.idUsuarios),
          hdni: new FormControl(data.dni),
          hnombre: new FormControl(data.nombre),
          hdireccion: new FormControl(data.direccion),
          htelefono: new FormControl(data.telefono),
          hfecha: new FormControl(data.fecha_registro),
          henabled:new FormControl(data.enabled),
          husername: new FormControl(data.username),
          hpassword: new FormControl(data.password),
        });
      });
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}


