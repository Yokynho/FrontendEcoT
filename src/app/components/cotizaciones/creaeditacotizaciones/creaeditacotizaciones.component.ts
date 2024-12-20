import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuarios } from '../../../models/Usuarios';
import { Cotizaciones } from '../../../models/Cotizaciones';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CotizacionesService } from '../../../services/cotizaciones.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-creaeditacotizaciones',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule, 
    MatSelectModule, 
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './creaeditacotizaciones.component.html',
  styleUrl: './creaeditacotizaciones.component.css',
})
export class CreaeditacotizacionesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuarios[] = [];
  coti: Cotizaciones = new Cotizaciones();
  id:number=0;
  edicion:boolean=false;
  username:string=''
  idUsuario:number=0

  constructor(
    private formBuilder: FormBuilder,
    private cS: CotizacionesService,
    private uS: UsuariosService,
    private router: Router,
    private route:ActivatedRoute,
    private loginService: LoginService

  ) {}

  ngOnInit(): void {

    this.username=this.loginService.showUsername();


    this.uS.obtenerIdPorUsername(this.username).subscribe(id => {
      this.idUsuario = id;
    });


    this.route.params.subscribe((data: Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init();
    });
    this.form = this.formBuilder.group({
      hcodigo: new FormControl(''),
      hprecio: new FormControl('', Validators.required),
      hfecha: new FormControl({ value: new Date(), disabled: true }, Validators.required),
    });
    
  }
  

  insertar(): void {
    if (this.form.valid) {
      this.coti.idCotizaciones=this.form.value.hcodigo;
      this.coti.precio = this.form.value.hprecio;
      this.coti.fecha_cotizacion = this.form.get('hfecha')?.value;
      this.coti.usuario.idUsuarios = this.idUsuario;

      if(this.edicion){
        this.cS.update(this.coti).subscribe((data)=>{
          this.cS.listByUsername(this.username).subscribe((data)=>{
            this.cS.setList(data);
          });
        });
      }else{
      this.cS.insert(this.coti).subscribe((data) => {
        this.cS.listByUsername(this.username).subscribe((data) => {
          this.cS.setList(data);
          
        });
      });
    }
  }
  this.router.navigate(['/home/cotizaciones']);
}
init() {
  if (this.edicion) {
    this.cS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        hcodigo: new FormControl(data.idCotizaciones),
        hprecio: new FormControl(data.precio),
        hfecha: new FormControl(data.fecha_cotizacion),
      });
    });
  }
}
}
