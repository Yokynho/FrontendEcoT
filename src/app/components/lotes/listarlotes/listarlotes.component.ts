import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator'
import { RouterModule } from '@angular/router';
import { Lotes } from '../../../models/Lotes';
import { LotesService } from '../../../services/lotes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarlotes',
  standalone: true,
  imports: [MatTableModule,MatPaginator,MatIconModule,MatButtonModule,RouterModule],
  templateUrl: './listarlotes.component.html',
  styleUrl: './listarlotes.component.css'
})
export class ListarlotesComponent implements OnInit {
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
    'accion01',
    'accion02',
  ];

  constructor(private lS: LotesService,
    private snackBar: MatSnackBar
  ) {}
  @ViewChild(MatPaginator) paginator!:MatPaginator;//agredo
  ngOnInit(): void {

    this.lS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;//agregado
      if (this.dataSource.data.length === 0) {
        this.mostrarMensajeSinDatos();
      }
    });
    this.lS.getList().subscribe((data) => {
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
    this.lS.delete(id).subscribe((data) => {
      this.lS.list().subscribe((data) => {
        this.lS.setList(data);
      });
    });
  }

}
