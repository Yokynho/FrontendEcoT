import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { Cultivos } from '../../../models/Cultivos';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CultivosService } from '../../../services/cultivos.service';
import {MatPaginator} from '@angular/material/paginator'//agreg
import { RouterModule } from '@angular/router';

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
    'accion02',
  ];

  constructor(private cS: CultivosService) {}
  @ViewChild(MatPaginator) paginator!:MatPaginator;//agredo
  ngOnInit(): void {

    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;//agregado
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;//agregado
    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }

}
