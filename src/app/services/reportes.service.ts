import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Reportes } from '../models/Reportes';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private url = `${base_url}/reportes`;
  private listaCambio=new Subject<Reportes[]>();
  constructor(private http:HttpClient) { }
  
  list(){
    return this.http.get<Reportes[]>(this.url);
  }

  insert(ra:Reportes){
    return this.http.post(this.url,ra);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Reportes[]){
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Reportes>(`${this.url}/${id}`);
  }

  update(ra: Reportes) {
    return this.http.put(this.url,ra);
  }
}
