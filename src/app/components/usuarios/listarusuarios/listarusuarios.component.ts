import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../../models/Usuarios';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-listarusuarios',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './listarusuarios.component.html',
  styleUrl: './listarusuarios.component.css'
})
export class ListarusuariosComponent implements OnInit{
  dataSource:MatTableDataSource<Usuarios>=new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','accion01','accion02',]

  constructor(private uS:UsuariosService){}
  
  ngOnInit(): void {
    this.uS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
    
    this.uS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
  }


  
  eliminar(id:number){
    this.uS.delete(id).subscribe((data)=>{
      this.uS.list().subscribe((data)=>{
        this.uS.setList(data);
      })
    })
  }
}
