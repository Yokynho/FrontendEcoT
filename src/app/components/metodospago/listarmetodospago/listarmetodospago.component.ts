import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MetodosPago } from '../../../models/MetodosPago';
import { MetodospagoService } from '../../../services/metodospago.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarmetodospago',
  standalone: true,
  imports: [MatTableModule,MatIconModule, MatPaginator,MatButtonModule,RouterModule],
  templateUrl: './listarmetodospago.component.html',
  styleUrl: './listarmetodospago.component.css'
})
export class ListarmetodospagoComponent implements OnInit{
  dataSource: MatTableDataSource<MetodosPago> = new MatTableDataSource();
  totalItems: number = 0;//Manejar la cantidad
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'accion01',
    'accion02',
  ];
  constructor(private mS: MetodospagoService,
    private snackBar: MatSnackBar,
    private loginService:LoginService
  ) {}
  username:string=''
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.username=this.loginService.showUsername();

    this.mS.listByUsername(this.username).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;//agregado
      if (this.dataSource.data.length === 0) {
        this.mostrarMensajeSinDatos();
      }
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;//agregado
    });
  }

  mostrarMensajeSinDatos() {
    this.snackBar.open('No hay datos agregados...', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  eliminar(id: number) {
    this.mS.delete(id).subscribe((data) => {
      this.mS.listByUsername(this.username).subscribe((data) => {
        this.mS.setList(data);
      });
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
