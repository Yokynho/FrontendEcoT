import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Pagos } from '../../../models/Pagos';
import { PagosService } from '../../../services/pagos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listarpagos',
  standalone: true,
  imports: [MatTableModule,
            CommonModule,
            MatIconModule,
            RouterLink,
            RouterModule,
            MatButtonModule,
            MatPaginatorModule
  ],
  templateUrl: './listarpagos.component.html',
  styleUrl: './listarpagos.component.css'
})
export class ListarpagosComponent implements OnInit{
  role: string = '';
  dataSource: MatTableDataSource<Pagos>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pS: PagosService,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ){}  
  
  ngOnInit(): void {
    this.pS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      if (this.dataSource.data.length === 0) {
        this.mostrarMensajeSinDatos();
      }
    });
    this.pS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });

    this.role=this.loginService.showRole();
    
    if(this.isAdministrador()){
      this.displayedColumns.push('accion01');
    }
  }

  mostrarMensajeSinDatos() {
    this.snackBar.open('No hay datos agregados...', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  eliminar(id:number){
    this.pS.delete(id).subscribe((data)=>{
      this.pS.list().subscribe((data)=>{
        this.pS.setList(data);
      })
    })
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isAgricultor() {
    return this.role === 'AGRICULTOR';
  }

  isDistribuidor() {
    return this.role === 'DISTRIBUIDOR';
  }
  isAdministrador(){
    return this.role === 'ADMINISTRADOR';
  }
}
