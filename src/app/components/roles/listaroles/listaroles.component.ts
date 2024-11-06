import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Roles } from '../../../models/Roles';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-listaroles',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './listaroles.component.html',
  styleUrl: './listaroles.component.css'
})
export class ListarolesComponent implements OnInit {
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','accion01','accion02',]

  constructor(private rS:RolesService) {}

  ngOnInit(): void { 
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  };
  eliminar(id:number){
    this.rS.delete(id).subscribe((data)=>{
      this.rS.list().subscribe((data)=>{
        this.rS.setList(data);
      })
    })
  }
}
