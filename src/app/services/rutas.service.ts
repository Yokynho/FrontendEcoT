import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Rutas } from '../models/Rutas';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RutasService {
  private url = `${base_url}/rutas`;
  private listaCambio=new Subject<Rutas[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Rutas[]>(this.url);
  }

  insert(ru:Rutas){
    return this.http.post(this.url,ru);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Rutas[]){
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Rutas>(`${this.url}/${id}`);
  }

  update(ru: Rutas) {
    return this.http.put(this.url,ru);
  }
  listByUsername(username: string): Observable<Rutas[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<Rutas[]>(`${this.url}/misrutas`, { params });
  }
}
