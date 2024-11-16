import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Soluciones } from '../../../models/Soluciones';
import {  SolucionesService } from '../../../services/soluciones.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listarreportes',
  standalone: true,
  imports: [MatTableModule,
            CommonModule,
            MatIconModule,
            RouterLink,
            RouterModule,
            MatButtonModule,
            MatPaginatorModule
  ],
  templateUrl: './listarreportes.component.html',
  styleUrl: './listarreportes.component.css'
})
export class ListarreportesComponent implements OnInit{
  dataSource: MatTableDataSource<Soluciones>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private rS: SolucionesService,
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
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
