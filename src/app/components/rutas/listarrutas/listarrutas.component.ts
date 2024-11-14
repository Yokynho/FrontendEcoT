import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Rutas } from '../../../models/Rutas';
import { RutasService } from '../../../services/rutas.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarrutas',
  standalone: true,
  imports: [MatTableModule,
            CommonModule,
            MatIconModule,
            RouterLink,
            RouterModule,
            MatButtonModule
  ],
  templateUrl: './listarrutas.component.html',
  styleUrl: './listarrutas.component.css'
})
export class ListarrutasComponent implements OnInit{
  dataSource: MatTableDataSource<Rutas>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'accion01',
    'accion02',
  ];

  constructor(private rS: RutasService,
    private snackBar: MatSnackBar
  ){

  }
 
  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      if (this.dataSource.data.length === 0) {
        this.mostrarMensajeSinDatos();
      }
    });
    this.rS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
 }

 mostrarMensajeSinDatos() {
  this.snackBar.open('No hay datos agregados...', 'Cerrar', {
    duration: 3000, // Duración en milisegundos
    horizontalPosition: 'center',
    verticalPosition: 'top',
    });
  }

 eliminar(id:number){
  this.rS.delete(id).subscribe((data)=>{
    this.rS.list().subscribe((data)=>{
      this.rS.setList(data);
      })
    })
  }
}
