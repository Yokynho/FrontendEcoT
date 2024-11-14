import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Vehiculos } from '../../../models/Vehiculos';
import { vehiculosService } from '../../../services/vehiculos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarvehiculos',
  standalone: true,
  imports: [MatTableModule,
            CommonModule,
            MatIconModule,
            RouterLink,
            RouterModule,
            MatButtonModule
  ],
  templateUrl: './listarvehiculos.component.html',
  styleUrl: './listarvehiculos.component.css'
})
export class ListarvehiculosComponent implements OnInit {
  dataSource: MatTableDataSource<Vehiculos>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'accion01',
    'accion02',
  ];
  
  constructor(private vS: vehiculosService,
    private snackBar: MatSnackBar
  ){

  }
  
  ngOnInit(): void {
    this.vS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      if (this.dataSource.data.length === 0) {
        this.mostrarMensajeSinDatos();
      }
    });
    this.vS.getList().subscribe((data)=>{
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
    this.vS.delete(id).subscribe((data)=>{
      this.vS.list().subscribe((data)=>{
        this.vS.setList(data);
      })
    })
  }
}
