import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Lotes } from '../../../models/Lotes';
import { LotesService } from '../../../services/lotes.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { ControlesService } from '../../../services/controles.service';
import { Usuarios } from '../../../models/Usuarios';
import { Controles } from '../../../models/Controles';

@Component({
  selector: 'app-creaeditalote',
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
  templateUrl: './creaeditalote.component.html',
  styleUrls: ['./creaeditalote.component.css']
})
export class CreaeditaloteComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  lote: Lotes = new Lotes();
  id: number = 0;
  edicion: boolean = false;
  listaU: Usuarios[] = [];
  listaC: Controles[] = [];
  idUsuarioSeleccionado: number = 0;
  idControlSeleccionado: number = 0;

  listaTipos: { value: string; viewValue: string }[] = [
    { value: 'Granos y Cereales', viewValue: 'Granos y Cereales' },
    { value: 'Tuberculos', viewValue: 'Tuberculos' },
    { value: 'Frutas', viewValue: 'Frutas' },
    { value: 'Vegetales y Hortalizas', viewValue: 'Vegetales y Hortalizas' },
    { value: 'Legumbres', viewValue: 'Legumbres' },
    { value: 'Cafe y Cacao', viewValue: 'Cafe y Cacao' },
    { value: 'Plantas Medicinales', viewValue: 'Plantas Medicinales' },

  ];

  listaEstados: { value: string; viewValue: string }[] = [
    { value: 'En cultivo', viewValue: 'En cultivo' },
    { value: 'Cosechado', viewValue: 'Cosechado' },
    { value: 'En almacenamiento', viewValue: 'En almacenamiento' },
    { value: 'En transporte', viewValue: 'En transporte' },
    { value: 'En procesamiento', viewValue: 'En procesamiento' },
    { value: 'En cuarentena', viewValue: 'En cuarentena' },
    { value: 'Disponible para venta', viewValue: 'Disponible para venta' },
    { value: 'Vendido', viewValue: 'Vendido' },
    { value: 'Rechazado', viewValue: 'Rechazado' },
    { value: 'En devolucion', viewValue: 'En devolucion' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private lS: LotesService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private uS: UsuariosService,
    private cS: ControlesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.uS.list().subscribe((data) => { this.listaU = data });
    this.cS.list().subscribe((data) => { this.listaC = data });

    // Definir el FormGroup solo una vez
    this.form = this.formBuilder.group({
      hcodigo: new FormControl(''),
      hnombre: new FormControl('', Validators.required),
      htipo: new FormControl('', Validators.required),
      hfecha: new FormControl('', [Validators.required, this.maxDateValidator]),
      hestado: new FormControl('', Validators.required),
      hcantidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      husuario: new FormControl('', Validators.required),
      hcontrol: new FormControl('', Validators.required),
    });
  }

  maxDateValidator(control: AbstractControl): ValidationErrors | null {
    const today = new Date();
    const selectedDate = new Date(control.value);
    if (selectedDate > today) {
      return { 'maxDate': true };
    }
    return null; 
  }

  aceptar(): void {
    // Asignar valores del formulario al modelo `lote`
    this.lote.idLotes = this.form.value['hcodigo'];
    this.lote.nombre = this.form.value['hnombre'];
    this.lote.tipo_cultivo = this.form.value['htipo'];
    this.lote.fecha_siembra = this.form.value['hfecha'];
    this.lote.estado = this.form.value['hestado'];
    this.lote.cantidad = this.form.value['hcantidad'];

    // Crear instancias de `Usuarios` y `Controles` usando los ID seleccionados
    let usuario = new Usuarios();
    usuario.idUsuarios = this.form.value['husuario'];
    this.lote.usuario = usuario;

    let control = new Controles();
    control.idControles = this.form.value['hcontrol'];
    this.lote.controles = control;

    // Agregar console.log para verificar valores
    console.log("Datos del lote antes de enviar:", this.lote);

    if (this.edicion) {
      this.lS.update(this.lote).subscribe(() => {
        this.lS.list().subscribe((data) => {
          this.lS.setList(data);
          this.router.navigate(['/home//lotes']);
        });
      });
    } else {
      this.lS.insert(this.lote).subscribe(() => {
        this.lS.list().subscribe((data) => {
          this.lS.setList(data);
          this.router.navigate(['/home//lotes']);
        });
      });
    }
  }


  init() {
    if (this.edicion) {
      this.lS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          hcodigo: data.idLotes,
          hnombre: data.nombre,
          htipo: data.tipo_cultivo,
          hfecha: data.fecha_siembra,
          hestado: data.estado,
          hcantidad: data.cantidad,
          husuario: data.usuario ? data.usuario.idUsuarios : null,
          hcontrol: data.controles ? data.controles.idControles : null,
        });
        this.idUsuarioSeleccionado = data.usuario ? data.usuario.idUsuarios : 0;
        this.idControlSeleccionado = data.controles ? data.controles.idControles : 0;
      });
    }
  }

  ingresarTodosDatos(): void {
    this._snackBar.open("Debe ingresar todos los campos para agregar un nuevo Lote", '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
