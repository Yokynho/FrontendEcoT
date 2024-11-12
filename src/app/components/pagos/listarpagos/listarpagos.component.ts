import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Pagos } from '../../../models/Pagos';
import { PagosService } from '../../../services/pagos.service';

@Component({
  selector: 'app-listarpagos',
  standalone: true,
  imports: [MatTableModule,
            CommonModule,
            MatIconModule,
            RouterLink,
            RouterModule,
            MatButtonModule,
  ],
  templateUrl: './listarpagos.component.html',
  styleUrl: './listarpagos.component.css'
})
export class ListarpagosComponent implements OnInit{
  dataSource: MatTableDataSource<Pagos>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'accion01',
    'accion02',
  ];
  constructor(private pS: PagosService){

  }
  
  
  
  ngOnInit(): void {
    this.pS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
    this.pS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
  }
  eliminar(id:number){
    this.pS.delete(id).subscribe((data)=>{
      this.pS.list().subscribe((data)=>{
        this.pS.setList(data);
      })
    })
  }
}
