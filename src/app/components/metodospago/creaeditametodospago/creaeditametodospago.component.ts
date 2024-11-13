import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MetodosPago } from '../../../models/MetodosPago';
import { Usuarios } from '../../../models/Usuarios';
import { MetodospagoService } from '../../../services/metodospago.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from '../../../services/usuarios.service';
import { Pagos } from '../../../models/Pagos';
import { PagosService } from '../../../services/pagos.service';

@Component({
  selector: 'app-creaeditametodospago',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creaeditametodospago.component.html',
  styleUrl: './creaeditametodospago.component.css',
})
export class CreaeditametodospagoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  metodopago: MetodosPago = new MetodosPago();
  id: number = 0;
  edicion: boolean = false;
  listaU: Usuarios[] = [];
  listaP: Pagos[] = [];
  idUsuarioSeleccionado: number = 0;
  idPagoSeleccionado: number = 0;

  listaEstados: { value: string; viewValue: string }[] = [
    { value: 'Tipo 1', viewValue: 'Tipo 1' },
    { value: 'Tipo 2', viewValue: 'Tipo 2' },
    { value: 'Tipo 3', viewValue: 'Tipo 3' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private mS: MetodospagoService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private uS: UsuariosService,
    private pS: PagosService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.uS.list().subscribe((data) => {
      this.listaU = data;
    });
    this.pS.list().subscribe((data) => {
      this.listaP = data;
    });

    // Definir el FormGroup solo una vez
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hestado: ['', Validators.required],
      husuario: ['', Validators.required],
      hpago: ['', Validators.required],
    });
  }
  aceptar(): void {
    // Asignar valores del formulario al modelo `lote`
    this.metodopago.idMetodosPago = this.form.value['hcodigo'];
    this.metodopago.nombre = this.form.value['hnombre'];
    this.metodopago.descripcion = this.form.value['hdescripcion'];
    this.metodopago.estado = this.form.value['hestado'];

    // Crear instancias de `Usuarios` y `Pagos` usando los ID seleccionados
    let usuario = new Usuarios();
    usuario.idUsuarios = this.form.value['husuario'];
    this.metodopago.usuario = usuario;

    let pagos = new Pagos();
    pagos.idPagos = this.form.value['hpago'];
    this.metodopago.pagos = pagos;

    // Agregar console.log para verificar valores
    console.log('Datos del metodo de pago antes de enviar:', this.metodopago);
    if (this.edicion) {
      this.mS.update(this.metodopago).subscribe(() => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
          this.router.navigate(['metodospago']);
        });
      });
    } else {
      this.mS.insert(this.metodopago).subscribe(() => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
          this.router.navigate(['metodospago']);
        });
      });
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          hcodigo: data.idMetodosPago,
          hnombre: data.nombre,
          hdescripcion: data.descripcion,
          hestado: data.estado,
          husuario: data.usuario ? data.usuario.idUsuarios : null,
          hpago: data.pagos ? data.pagos.idPagos : null,
        });
        this.idUsuarioSeleccionado = data.usuario ? data.usuario.idUsuarios : 0;
        this.idPagoSeleccionado = data.pagos ? data.pagos.idPagos : 0;
      });
    }
  }
  ingresarTodosDatos(): void {
    this._snackBar.open("Debe ingresar todos los campos para agregar un nuevo Metodo de pago", '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
