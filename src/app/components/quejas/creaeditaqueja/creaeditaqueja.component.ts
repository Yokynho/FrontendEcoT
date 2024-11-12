import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Quejas } from '../../../models/Quejas';
import { Usuarios } from '../../../models/Usuarios';
import { QuejasService } from '../../../services/quejas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from '../../../services/usuarios.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditaqueja',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatMomentDateModule,
  ],
  templateUrl: './creaeditaqueja.component.html',
  styleUrl: './creaeditaqueja.component.css'
})
export class CreaeditaquejaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios:Usuarios[]=[];
  listaTipos: { value: String; viewValue: string }[] = [
    { value: 'M', viewValue: 'M' },
    { value: 'G', viewValue: 'G' },
    { value: 'L', viewValue: 'L' },
  ];

  queja: Quejas = new Quejas();

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private uS:UsuariosService,
    private qS: QuejasService
  ){}

  
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      hcodigo: [''],
      htitulo: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hfecha: ['', Validators.required],
      htipo: ['', Validators.required],
      hrespuesta: ['', Validators.required],
      husuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data)=>{
      this.listaUsuarios=data;
    });
  }


  insertar():void{
    if(this.form.valid){
      this.queja.idQuejas=this.form.value.hcodigo
      this.queja.titulo=this.form.value.htitulo
      this.queja.descripcion=this.form.value.hdescripcion
      this.queja.fecha_creacion=this.form.value.hfecha
      this.queja.tipo=this.form.value.htipo
      this.queja.respuesta=this.form.value.hrespuesta
      this.queja.usuario.idUsuarios=this.form.value.husuario

      if(this.edicion){
        this.qS.update(this.queja).subscribe((data)=>{
          this.qS.list().subscribe((data)=>{
            this.qS.setList(data);
          });
        });
      } else {
        this.qS.insert(this.queja).subscribe(data=>{
          this.qS.list().subscribe(data=>{
            this.qS.setList(data)
          });
        });
      }
    }
    this.router.navigate(['/distribuidor/quejas'])
  }

  init() {
    if (this.edicion) {
      this.qS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idQuejas),
          htitulo: new FormControl(data.titulo),
          hdescripcion: new FormControl(data.descripcion),
          hfecha: new FormControl(data.fecha_creacion),
          htipo: new FormControl(data.tipo),
          hrespuesta: new FormControl(data.respuesta),
          husuario: new FormControl(data.usuario.nombre),
        });
      });
    }
  }
}
