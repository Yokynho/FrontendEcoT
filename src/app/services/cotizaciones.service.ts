import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Cotizaciones } from '../models/Cotizaciones';
import { TotalCotizacionesPorUsuarioDTO } from '../models/TotalCotizacionesPorUsuarioDTO';
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
  listByUsername(username: string): Observable<Cotizaciones[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<Cotizaciones[]>(`${this.url}/miscotizaciones`, { params });
  }
  getSum():Observable<TotalCotizacionesPorUsuarioDTO[]>{
    return this.http.get<TotalCotizacionesPorUsuarioDTO[]>(`${this.url}/totalcotizacionesporusuario`)
  }
}