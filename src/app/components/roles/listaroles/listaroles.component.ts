import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Roles } from '../../../models/Roles';
import { RolesService } from '../../../services/roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listaroles',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './listaroles.component.html',
  styleUrl: './listaroles.component.css'
})
export class ListarolesComponent implements OnInit {
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','accion02',]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private rS:RolesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void { 
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      if (this.dataSource.data.length === 0) {
        this.mostrarMensajeSinDatos();
      }
    });
    
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  };

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
