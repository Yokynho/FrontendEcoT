import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Rastreos } from '../../../models/Rastreos';
import { RastreosService } from '../../../services/rastreos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listarrastreos',
  standalone: true,
  imports: [MatTableModule,
            CommonModule,
            MatPaginator,
            MatIconModule,
            RouterLink,
            MatButtonModule
  ],
  templateUrl: './listarrastreos.component.html',
  styleUrl: './listarrastreos.component.css'
})
export class ListarrastreosComponent implements OnInit{
  role: string = '';
  dataSource: MatTableDataSource<Rastreos> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
  ];
  constructor(private rS: RastreosService,
    private snackBar: MatSnackBar,
    private loginService: LoginService

  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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
    this.role=this.loginService.showRole();
    
    if(this.isDistribuidor()){
      this.displayedColumns.push('accion01');
    }
    if(this.isDistribuidor()){
      this.displayedColumns.push('accion02');
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
