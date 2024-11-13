import { Component,OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,

} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cultivos } from '../../../models/Cultivos';
import { CultivosService } from '../../../services/cultivos.service';
import { Lotes } from '../../../models/Lotes';
import { LotesService } from '../../../services/lotes.service';


@Component({
  selector: 'app-creaeditacultivo',
  standalone: true,
  imports: [MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatMomentDateModule,],
  templateUrl: './creaeditacultivo.component.html',
  styleUrl: './creaeditacultivo.component.css'
})
export class CreaeditacultivoComponent implements OnInit{


  form: FormGroup = new FormGroup({});
  cultivo: Cultivos = new Cultivos();
  id: number = 0;
  edicion: boolean = false;
  listaL: Lotes[] = [];
  idLoteSeleccionado: number = 0;

  listaTipos: { value: string; viewValue: string }[] = [
    { value: 'Granos y Cereales', viewValue: 'Granos y Cereales' },
    { value: 'Tuberculos', viewValue: 'Tuberculos' },
    { value: 'Frutas', viewValue: 'Frutas' },
    { value: 'Vegetales y Hortalizas', viewValue: 'Vegetales y Hortalizas' },
    { value: 'Legumbres', viewValue: 'Legumbres' },
    { value: 'Cafe y Cacao', viewValue: 'Cafe y Cacao' },
    { value: 'Plantas Medicinales', viewValue: 'Plantas Medicinales' },

  ];
  constructor(
    private formBuilder: FormBuilder,
    private cS: CultivosService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackvar:MatSnackBar,
    private lS:LotesService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init();
    })

    this.lS.list().subscribe(data => { this.listaL = data });
     this.form = new FormGroup({
      hcodigo: new FormControl(),
      hnombre: new FormControl(),
      htipo: new FormControl(),
      hlote: new FormControl(),

    });

    this.form = this.formBuilder.group({
      hcodigo: [],
      hnombre: ['', Validators.required],
      htipo: ['', Validators.required],
      hlote: ['', Validators.required],
    });
  }
  aceptar(): void {
    this.cultivo.idCultivos = this.form.value['hcodigo'];
    this.cultivo.nombre = this.form.value['hnombre'];
    this.cultivo.tipo = this.form.value['htipo'];
    this.cultivo.lotes.nombre= this.form.value['hlote.nombre'];

      if(this.edicion==true)
      {
        this.cS.update(this.cultivo).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data);
          })
        })
      } else{
        this.cS.insert(this.cultivo).subscribe(data  => {
          this.cS.list().subscribe(data  =>{
            this.cS.setList(data)
          })
        })
      }
      this.router.navigate(['home/cultivos']);
      


    if (this.idLoteSeleccionado>0) {
      let l = new Lotes();
      l.idLotes = this.idLoteSeleccionado;
      this.cultivo.lotes=l;

      this.cS.update(this.cultivo).subscribe(() => {
      this.cS.list().subscribe(data => {
            this.cS.setList(data);
          })
        })

      this.router.navigate(['/cultivos']);
  }
}

init()
    {
      if(this.edicion)
      {
      this.cS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.idCultivos),
          hnombre:new FormControl(data.nombre),
          htipo:new FormControl(data.tipo),
          hlote:new FormControl(data.lotes.idLotes),
                  })
      })
    }
  }
  ingresarTodosDatos():void{
    this._snackvar.open("Debe ingresar todos los campos para agregar un nuevo Alumno",'',{
      duration:5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })
  }
}
