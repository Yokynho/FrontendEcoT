import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Controles } from '../../../models/Controles';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ControlesService } from '../../../services/controles.service';

@Component({
  selector: 'app-listarcontroles',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './listarcontroles.component.html',
  styleUrl: './listarcontroles.component.css'
})
export class ListarcontrolesComponent implements OnInit {
  dataSource: MatTableDataSource<Controles> = new MatTableDataSource();
  displayedColumns:string[]=[
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'accion01',
    'accion02',
  ];
  constructor(private cS:ControlesService){}

  ngOnInit(): void{
    this.cS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
  }

  eliminar(id:number){
    this.cS.delete(id).subscribe((data)=>{
      this.cS.list().subscribe((data)=>{
        this.cS.setList(data);
      });
    });
  }
}
