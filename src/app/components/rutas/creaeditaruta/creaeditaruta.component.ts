import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Rastreos } from '../../../models/Rastreos';
import { Rutas } from '../../../models/Rutas';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RutasService } from '../../../services/rutas.service';
import { RastreosService } from '../../../services/rastreos.service';

@Component({
  selector: 'app-creaeditaruta',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule],
  templateUrl: './creaeditaruta.component.html',
  styleUrl: './creaeditaruta.component.css'
})
export class CreaeditarutaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  id: number = 0;
  edicion: boolean = false;
  listaRastreos: Rastreos[]=[];
  rutas:Rutas= new Rutas();

  listaUbicaciones:{ value: string; viewValue: string }[] = [
    { value: 'Lima ', viewValue: 'Lima' },
    { value: 'La Libertad ', viewValue: 'La Libertad ' },
    { value: 'Piura', viewValue: 'Piura' },
    { value: 'Lambayeque', viewValue: 'Lambayeque' },
    { value: 'Ica', viewValue: 'Ica' },
    { value: 'Ancash', viewValue: 'Ancash' },
    { value: 'Cusco', viewValue: 'Cusco' },
    { value: 'Cajamarca ', viewValue: 'Cajamarca' },
    { value: 'Ayacucho', viewValue: 'Ayacucho' },
    { value: 'Huancavelica', viewValue: 'Huancavelica' },
    { value: 'Puno', viewValue: 'Puno' },
    { value: 'Junin', viewValue: 'Junin' },
    { value: 'Apurimac', viewValue: 'Apurimac' },
    { value: 'Loreto', viewValue: 'Loreto' },
    { value: 'San Martin', viewValue: 'San Martin' },
    { value: 'Ucayali', viewValue: 'Ucayali' },
    { value: 'Madre de Dios', viewValue: 'Madre de Dios' },
    { value: 'Amazonas', viewValue: 'Amazonas' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private rS:RutasService,
    private rrS: RastreosService
  ){}



  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      hcodigo: [''],
      horigen: ['', Validators.required],
      hdestino: ['', Validators.required],
      hduracion: ['', Validators.required],
      hrastreo: ['', Validators.required],
    });
    this.rrS.list().subscribe((data)=>{
      this.listaRastreos=data;
    });
  }


  insertar():void{
    if(this.form.valid){
      this.rutas.idRutas=this.form.value.hcodigo
      this.rutas.origen=this.form.value.horigen
      this.rutas.destino=this.form.value.hdestino
      this.rutas.duracion_estimada=this.form.value.hduracion
      this.rutas.ra.idRastreos=this.form.value.hrastreo

      if(this.edicion){
        this.rS.update(this.rutas).subscribe((data)=>{
          this.rS.list().subscribe((data)=>{
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rutas).subscribe(data=>{
          this.rS.list().subscribe(data=>{
            this.rS.setList(data)
          });
        });
      }
    }
    this.router.navigate(['/home/rutas'])
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idRutas),
          horigen: new FormControl(data.origen),
          hdestino: new FormControl(data.destino),
          hduracion: new FormControl(data.duracion_estimada),
          hrastreo: new FormControl(data.ra.idRastreos),
        });
      });
    }
  }
}
