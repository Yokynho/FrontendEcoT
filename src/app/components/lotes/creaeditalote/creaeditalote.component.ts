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
import { LoginService } from '../../../services/login.service';

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
  listaC: Controles[] = [];
  idUsuario:number=0

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
  username:string=''

  constructor(
    private formBuilder: FormBuilder,
    private lS: LotesService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private uS: UsuariosService,
    private cS: ControlesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.username=this.loginService.showUsername();


    this.uS.obtenerIdPorUsername(this.username).subscribe(id => {
      this.idUsuario = id;
    });

    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: new FormControl(''),
      hnombre: new FormControl('', Validators.required),
      htipo: new FormControl('', Validators.required),
      hfecha: new FormControl('', [Validators.required, this.maxDateValidator]),
      hestado: new FormControl('', Validators.required),
      hcantidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      hcontrol: new FormControl('', Validators.required),
    });
    this.cS.list().subscribe((data) => {
       this.listaC = data });
  }

  maxDateValidator(control: AbstractControl): ValidationErrors | null {
    const today = new Date();
    const selectedDate = new Date(control.value);
    if (selectedDate > today) {
      return { 'maxDate': true };
    }
    return null; 
  }

  insertar(): void {
    if(this.form.valid){
      this.lote.idLotes=this.form.value.hcodigo;
      this.lote.nombre=this.form.value.hnombre;
      this.lote.tipo_cultivo=this.form.value.htipo;
      this.lote.fecha_siembra=this.form.value.hfecha;
      this.lote.estado=this.form.value.hestado;
      this.lote.cantidad=this.form.value.hcantidad;
      this.lote.usuario.idUsuarios=this.idUsuario;
      this.lote.controles.idControles=this.form.value.hcontrol;

      if (this.edicion) {
        this.lS.update(this.lote).subscribe(() => {
          this.lS.listByUsername(this.username).subscribe((data) => {
            this.lS.setList(data);
          });
        });
      } else {
        this.lS.insert(this.lote).subscribe(() => {
          this.lS.listByUsername(this.username).subscribe((data) => {
            this.lS.setList(data);
          });
        });
      }
    }    
    this.router.navigate(['/home/lotes']);
  }


  init() {
    if (this.edicion) {
      this.lS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          hcodigo: new FormControl(data.idLotes),
          hnombre: new FormControl(data.nombre),
          htipo: new FormControl(data.tipo_cultivo),
          hfecha: new FormControl(data.fecha_siembra),
          hestado: new FormControl(data.estado),
          hcantidad: new FormControl(data.cantidad),
          hcontrol: new FormControl(data.controles.idControles),
        })
      })
    }
  }


}
