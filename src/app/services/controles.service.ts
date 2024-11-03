import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Controles } from '../models/Controles';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ControlesService {
  private url = `${base_url}/controles`;
  private listaCambio = new Subject<Controles[]>();
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Controles[]>(this.url);
  }

  insert(co: Controles) {
    return this.http.post(this.url, co);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Controles[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Controles>(`${this.url}/${id}`);
  }

  update(co: Controles) {
    return this.http.put(this.url,co);
  }
}
