import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { MetodosPago } from '../../../models/MetodosPago';
import { Usuarios } from '../../../models/Usuarios';
import { MetodospagoService } from '../../../services/metodospago.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from '../../../services/usuarios.service';
import { Pagos } from '../../../models/Pagos';
import { PagosService } from '../../../services/pagos.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-creaeditametodospago',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule
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
  idUsuario:number=0

  listaMetodos: { value: string; viewValue: string }[] = [
    { value: 'Transferencia Bancaria', viewValue: 'Transferencia Bancaria' },
    { value: 'Deposito Bancario', viewValue: 'Deposito Bancario' },
    { value: 'Tarjeta de Credito', viewValue: 'Tarjeta de Credito' },
    { value: 'Tarjeta de Debito', viewValue: 'Tarjeta de Debito' },
    { value: 'Pago en Efectivo', viewValue: 'Pago en Efectivo' },
    { value: 'Pago Movil', viewValue: 'Pago Movil' },
    { value: 'Paypal', viewValue: 'Paypal' },
    { value: 'Pago contra Entrega', viewValue: 'Pago contra Entrega' },
    { value: 'Credito a Plazo', viewValue: 'Credito a Plazo' },
  ];
  username:string=''


  constructor(
    private formBuilder: FormBuilder,
    private mS: MetodospagoService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private uS: UsuariosService,
    private pS: PagosService,
    private loginService:LoginService
  ) {}

  ngOnInit():void  {
    this.username=this.loginService.showUsername();
    this.uS.obtenerIdPorUsername(this.username).subscribe(id => {
      this.idUsuario = id;
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hpago: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaU = data;
    });
    this.pS.list().subscribe((data) => {
      this.listaP = data;
    });
  }
  insertar(): void {
    this.metodopago.idMetodosPago = this.form.value.hcodigo;
    this.metodopago.nombre = this.form.value.hnombre;
    this.metodopago.descripcion=this.form.value.hdescripcion;
    this.metodopago.pagos.idPagos = this.form.value.hpago;
    this.metodopago.usuario.idUsuarios = this.idUsuario;
    if (this.edicion) {
      this.mS.update(this.metodopago).subscribe(() => {
        this.mS.listByUsername(this.username).subscribe((data) => {
          this.mS.setList(data);
        });
      });
    } else {
      this.mS.insert(this.metodopago).subscribe(() => {
        this.mS.listByUsername(this.username).subscribe((data) => {
          this.mS.setList(data);
          
        });
      });
    }
    this.router.navigate(['/home/metodospago']);
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idMetodosPago),
          hnombre: new FormControl(data.nombre),
          hdescripcion: new FormControl(data.descripcion),
          hpago: new FormControl(data.pagos.idPagos),

        });
    })
  }
  }
 
 
}
