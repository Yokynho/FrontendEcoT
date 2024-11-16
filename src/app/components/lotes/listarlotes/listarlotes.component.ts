import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator'
import { RouterModule } from '@angular/router';
import { Lotes } from '../../../models/Lotes';
import { LotesService } from '../../../services/lotes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarlotes',
  standalone: true,
  imports: [MatTableModule,MatPaginator,MatIconModule,MatButtonModule,RouterModule, CommonModule],
  templateUrl: './listarlotes.component.html',
  styleUrl: './listarlotes.component.css'
})
export class ListarlotesComponent implements OnInit {
  role: string = '';
  dataSource: MatTableDataSource<Lotes> = new MatTableDataSource();
  totalItems: number = 0;//Manejar la cantidad
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
  ];
  lotes:Lotes[]=[];
  constructor(private lS: LotesService,
    private snackBar: MatSnackBar,
    private loginService: LoginService

  ) {}
  @ViewChild(MatPaginator) paginator!:MatPaginator;//agredo
  ngOnInit(): void {
    
      
    this.lS.getMisLotes().subscribe(
      (data)=>{
        this.lotes=data;
        this.dataSource = new MatTableDataSource(this.lotes);
        this.dataSource.paginator=this.paginator;//agregado
      }
    )
    
    this.lS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;//agregado
    });

    this.role=this.loginService.showRole();
    
    if(this.isAgricultor()){
      this.displayedColumns.push('accion01');
    }
    if(this.isAgricultor()){
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
    this.lS.delete(id).subscribe((data) => {
      this.lS.list().subscribe((data) => {
        this.lS.setList(data);
      });
    });
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
