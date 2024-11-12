import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Reportes } from '../../../models/Reportes';
import { ReportesService } from '../../../services/reportes.service';

@Component({
  selector: 'app-listarreportes',
  standalone: true,
  imports: [MatTableModule,
            CommonModule,
            MatIconModule,
            RouterLink,
            RouterModule,
            MatButtonModule
  ],
  templateUrl: './listarreportes.component.html',
  styleUrl: './listarreportes.component.css'
})
export class ListarreportesComponent implements OnInit{
  dataSource: MatTableDataSource<Reportes>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'accion01',
    'accion02',
  ];

  constructor(private rS: ReportesService){

  }
  
  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
  }
  eliminar(id:number){
    this.rS.delete(id).subscribe((data)=>{
      this.rS.list().subscribe((data)=>{
        this.rS.setList(data);
      })
    })
  }
}
