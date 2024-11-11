import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-creaeditaqueja',
  standalone: true,
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
  queja: Quejas = new Quejas();
  id: number = 0;
  edicion: boolean = false;
  listaU: Usuarios[] = [];
  idUsuarioSelecionado: number = 0;

  listaTipos: { value: string; viewValue: string }[] = [
    { value: 'Tipo 1', viewValue: 'Tipo 1' },
    { value: 'Tipo 2', viewValue: 'Tipo 2' },
    { value: 'Tipo 3', viewValue: 'Tipo 3' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private qS: QuejasService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private uS: UsuariosService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
    this.uS.list().subscribe((data) => { this.listaU = data });
    // Definir el FormGroup solo una vez
    this.form = this.formBuilder.group({
      hcodigo: [''],
      htitulo: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hfecha: ['', Validators.required],
      htipo: ['', Validators.required],
      hrespuesta: ['', Validators.required],
      husuario: ['', Validators.required],
    });
  }
  aceptar(): void {
    // Asignar valores del formulario al modelo `lote`
    this.queja.idQuejas = this.form.value['hcodigo'];
    this.queja.titulo = this.form.value['htitulo'];
    this.queja.descripcion = this.form.value['hdescripcion'];
    this.queja.fecha_creacion = this.form.value['hfecha'];
    this.queja.tipo = this.form.value['htipo'];
    this.queja.respuesta = this.form.value['hrespuesta'];

    // Crear instancias de `Usuarios` y `Controles` usando los ID seleccionados
    let usuario = new Usuarios();
    usuario.idUsuarios = this.form.value['husuario'];
    this.queja.usuarios = usuario;

    // Agregar console.log para verificar valores
    console.log("Datos de la queja antes de enviar:", this.queja);

    if (this.edicion) {
      this.qS.update(this.queja).subscribe(() => {
        this.qS.list().subscribe((data) => {
          this.qS.setList(data);
          this.router.navigate(['/quejas']);
        });
      });
    } else {
      this.qS.insert(this.queja).subscribe(() => {
        this.qS.list().subscribe((data) => {
          this.qS.setList(data);
          this.router.navigate(['/quejas']);
        });
      });
    }
  }


  init() {
    if (this.edicion) {
      this.qS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          hcodigo: data.idQuejas,
          htitulo: data.titulo,
          hdescripcion: data.descripcion,
          hfecha: data.fecha_creacion,
          htipo: data.tipo,
          hrespuesta: data.respuesta,
          husuario: data.usuarios ? data.usuarios.idUsuarios : null,
        });
        this.idUsuarioSelecionado = data.usuarios ? data.usuarios.idUsuarios : 0;
      });
    }
  }

  ingresarTodosDatos(): void {
    this._snackBar.open("Debe ingresar todos los campos para agregar una nueva Queja", '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
