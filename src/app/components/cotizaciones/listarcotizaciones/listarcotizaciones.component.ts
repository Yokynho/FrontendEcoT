import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Cotizaciones } from '../../../models/Cotizaciones';
import { CotizacionesService } from '../../../services/cotizaciones.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listarcotizaciones',
  standalone: true,
  imports: [MatPaginator,MatTableModule, MatIconModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './listarcotizaciones.component.html',
  styleUrl: './listarcotizaciones.component.css'
})
export class ListarcotizacionesComponent implements OnInit{
  dataSource: MatTableDataSource<Cotizaciones>=new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4']
  username:string=''
  role: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private cS:CotizacionesService,
    private snackBar: MatSnackBar,
    private loginService: LoginService

  ){}

  ngOnInit(): void { 

    this.username=this.loginService.showUsername();
    this.role=this.loginService.showRole();


    if(this.isAgricultor()){
      this.cS.list().subscribe((data)=>{
        this.dataSource=new MatTableDataSource(data);
      if (this.dataSource.data.length === 0) {
        this.mostrarMensajeSinDatos();
        }
      });
    }else{
      this.cS.listByUsername(this.username).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        if (this.dataSource.data.length === 0) {
          this.mostrarMensajeSinDatos();
        }
      });
    }


    
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
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
    this.cS.delete(id).subscribe((data)=>{
      this.cS.listByUsername(this.username).subscribe((data)=>{
        this.cS.setList(data);
      });
    });
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
