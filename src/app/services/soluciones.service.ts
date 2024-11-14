import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Soluciones } from '../models/Soluciones';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class SolucionesService {
  private url = `${base_url}/soluciones`;
  private listaCambio=new Subject<Soluciones[]>();
  constructor(private http:HttpClient) { }
  
  list(){
    return this.http.get<Soluciones[]>(this.url);
  }

  insert(ra:Soluciones){
    return this.http.post(this.url,ra);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Soluciones[]){
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Soluciones>(`${this.url}/${id}`);
  }

  update(ra: Soluciones) {
    return this.http.put(this.url,ra);
  }
}
