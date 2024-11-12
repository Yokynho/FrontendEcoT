import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Rastreos } from '../models/Rastreos';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RastreosService {
  private url = `${base_url}/rastreos`;
  private listaCambio=new Subject<Rastreos[]>();
  constructor(private http:HttpClient) { }
  
  list(){
    return this.http.get<Rastreos[]>(this.url);
  }

  insert(ra:Rastreos){
    return this.http.post(this.url,ra);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Rastreos[]){
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Rastreos>(`${this.url}/${id}`);
  }

  update(ra: Rastreos) {
    return this.http.put(this.url,ra);
  }
}
