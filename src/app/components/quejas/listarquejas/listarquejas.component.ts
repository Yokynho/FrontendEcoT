import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Quejas } from '../../../models/Quejas';
import { QuejasService } from '../../../services/quejas.service';

@Component({
  selector: 'app-listarquejas',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './listarquejas.component.html',
  styleUrl: './listarquejas.component.css'
})
export class ListarquejasComponent implements OnInit{
  dataSource: MatTableDataSource<Quejas> = new MatTableDataSource();
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

  constructor(private qS: QuejasService) {}
  ngOnInit(): void {
    this.qS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.qS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.qS.delete(id).subscribe((data) => {
      this.qS.list().subscribe((data) => {
        this.qS.setList(data);
      });
    });
  }
}