import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Rastreos } from '../../../models/Rastreos';
import { RastreosService } from '../../../services/rastreos.service';

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
  dataSource: MatTableDataSource<Rastreos> = new MatTableDataSource();
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
  constructor(private rS: RastreosService) {}

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
