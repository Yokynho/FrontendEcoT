import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Cotizaciones } from '../models/Cotizaciones';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class CotizacionesService {
  private url = `${base_url}/cotizaciones`;
  private listaCambio = new Subject<Cotizaciones[]>();
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Cotizaciones[]>(this.url);
  }

  insert(cot: Cotizaciones) {
    return this.http.post(this.url, cot);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Cotizaciones[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Cotizaciones>(`${this.url}/${id}`);
  }

  update(co: Cotizaciones) {
    return this.http.put(this.url,co);
  }
}