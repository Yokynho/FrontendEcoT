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
import { RolesService } from '../../../services/roles.service';
import { Roles } from '../../../models/Roles';

@Component({
  selector: 'app-creaeditaroles',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  templateUrl: './creaeditaroles.component.html',
  styleUrl: './creaeditaroles.component.css',
})
export class CreaeditarolesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuarios[] = [];
  rol: Roles = new Roles();
  id:number=0;
  edicion:boolean=false;

  listaTipo: { value: String; viewValue: string }[] = [
    { value: 'ADMINISTRADOR', viewValue: 'ADMINISTRADOR' },
    { value: 'AGRICULTOR', viewValue: 'AGRICULTOR' },
    { value: 'DISTRIBUIDOR', viewValue: 'DISTRIBUIDOR' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private rS: RolesService,
    protected uS: UsuariosService,
    private router: Router,
    private route:ActivatedRoute
  ) {}
  ngOnInit():void {
    this.route.params.subscribe((data: Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init();
    });
    this.form = this.formBuilder.group({
      hcodigo: [''],
      htipo: ['', Validators.required],
      husuarios: ['', Validators.required],
    });
    this.uS.list().subscribe((data)=>{
      this.listaUsuarios=data;
    });
  }
  insertar():void{
    if(this.form.valid){
      this.rol.idRoles=this.form.value.hcodigo;
      this.rol.tipo=this.form.value.htipo;
      this.rol.usuario.idUsuarios=this.form.value.husuarios;
      if(this.edicion){
        this.rS.update(this.rol).subscribe((data)=>{
          this.rS.list().subscribe((data)=>{
            this.rS.setList(data);
          });
        });
      }else{
      this.rS.insert(this.rol).subscribe((data)=>{
        this.rS.list().subscribe((data)=>{
          this.rS.setList(data);
        });
      });
    }
  }
  this.router.navigate(['/home/roles']);
}
init(){
  if(this.edicion){
    this.rS.listId(this.id).subscribe((data)=>{
      this.form=new FormGroup({
        hcodigo:new FormControl(data.idRoles),
        htipo:new FormControl(data.tipo),
        husuarios:new FormControl(data.usuario.nombre),
      });
    });
  }
}
}
