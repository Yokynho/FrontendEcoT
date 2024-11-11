import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MetodosPago } from '../models/MetodosPago';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class MetodospagoService {
  private url = `${base_url}/quejas`;
    listaCambio=new Subject<MetodosPago[]>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<MetodosPago[]>(this.url);
  }
  insert(mp: MetodosPago) {
    return this.http.post(this.url, mp);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: MetodosPago[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
  
    listId(id: number) {
      return this.http.get<MetodosPago>(`${this.url}/${id}`);
    }
  
    update(mp: MetodosPago) {
      return this.http.put(this.url,mp);
    }
}