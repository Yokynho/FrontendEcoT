import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Lotes } from '../models/Lotes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LotesPorUsuarioDTO } from '../models/LotesPorUsuarioDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class LotesService {
  private url = `${base_url}/lotes`;
  private listaCambio = new Subject<Lotes[]>();
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Lotes[]>(this.url);
  }

  insert(lo: Lotes) {
    return this.http.post(this.url, lo);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Lotes[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Lotes>(`${this.url}/${id}`);
  }

  update(lo: Lotes) {
    return this.http.put(this.url,lo);
  }
  
  listByUsername(username: string): Observable<Lotes[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<Lotes[]>(`${this.url}/mislotes`, { params });
  }
  getQuantity():Observable<LotesPorUsuarioDTO[]>{
    return this.http.get<LotesPorUsuarioDTO[]>(`${this.url}/lotesporusuario`)
  }
}
