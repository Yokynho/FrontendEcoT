import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuarios } from '../../../models/Usuarios';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-listarusuarios',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarusuarios.component.html',
  styleUrl: './listarusuarios.component.css'
})
export class ListarusuariosComponent implements OnInit{
  dataSource:MatTableDataSource<Usuarios>=new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','accion01','accion02',]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private uS:UsuariosService,
    private snackBar: MatSnackBar
  ){}
  
  ngOnInit(): void {
    this.uS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      if (this.dataSource.data.length === 0) {
        this.mostrarMensajeSinDatos();
      }
    });
    this.uS.getList().subscribe((data)=>{
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
    this.uS.delete(id).subscribe((data)=>{
      this.uS.list().subscribe((data)=>{
        this.uS.setList(data);
      })
    })
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
