import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { Cultivos } from '../../../models/Cultivos';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CultivosService } from '../../../services/cultivos.service';
import {MatPaginator} from '@angular/material/paginator'
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarcultivos',
  standalone: true,
  imports: [MatTableModule,MatPaginator,MatIconModule,MatButtonModule,RouterModule],
  templateUrl: './listarcultivos.component.html',
  styleUrl: './listarcultivos.component.css'
})
export class ListarcultivosComponent implements OnInit{


  dataSource: MatTableDataSource<Cultivos> = new MatTableDataSource();
  totalItems: number = 0;//Manejar la cantidad
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'accion01',
  ];
  username:string=''

  constructor(private cS: CultivosService,
    private snackBar: MatSnackBar,
    private loginService:LoginService,
  ) {}
  @ViewChild(MatPaginator) paginator!:MatPaginator;//agredo
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.username=this.loginService.showUsername();

    this.cS.listByUsername(this.username).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;//agregado
      if (this.dataSource.data.length === 0) {
        this.mostrarMensajeSinDatos();
      }
    });
    this.cS.getList().subscribe((data) => {
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
    this.cS.delete(id).subscribe((data) => {
      this.cS.listByUsername(this.username).subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
