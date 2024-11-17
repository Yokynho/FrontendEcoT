import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Quejas } from '../../../models/Quejas';
import { QuejasService } from '../../../services/quejas.service';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listarquejas',
  standalone: true,
  imports: [MatPaginator,MatTableModule, MatIconModule, MatButtonModule, RouterModule, CommonModule, RouterLink],
  templateUrl: './listarquejas.component.html',
  styleUrl: './listarquejas.component.css'
})
export class ListarquejasComponent implements OnInit{
  role: string = '';
  dataSource: MatTableDataSource<Quejas> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
  ];
  username:string=''

  constructor(private qS: QuejasService,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}
  @ViewChild(MatPaginator) paginator!:MatPaginator;//agredo
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {

    this.username=this.loginService.showUsername();
    this.role=this.loginService.showRole();

    if(this.isAdministrador()){
      this.qS.list().subscribe((data)=>{
        this.dataSource=new MatTableDataSource(data);
      if (this.dataSource.data.length === 0) {
        this.mostrarMensajeSinDatos();
        }
      });
    }else{
      this.qS.listByUsername(this.username).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        if (this.dataSource.data.length === 0) {
          this.mostrarMensajeSinDatos();
        }
      });
    }
  

    this.qS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    
    if(this.isAgricultor() || this.isDistribuidor()){
      this.displayedColumns.push('accion01');
    }
    if(this.isAdministrador()){
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

  eliminar(id: number) {
    this.qS.delete(id).subscribe((data) => {
      this.qS.listByUsername(this.username).subscribe((data) => {
        this.qS.setList(data);
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
