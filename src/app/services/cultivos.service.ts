import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Cultivos } from '../models/Cultivos';
import { HttpClient, HttpParams } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class CultivosService {

  private url = `${base_url}/cultivos`;
  private listaCambio = new Subject<Cultivos[]>();
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Cultivos[]>(this.url);
  }

  insert(cu: Cultivos) {
    return this.http.post(this.url, cu);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Cultivos[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Cultivos>(`${this.url}/${id}`);
  }

  update(cu: Cultivos) {
    return this.http.put(this.url,cu);
  }
  listByUsername(username: string): Observable<Cultivos[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<Cultivos[]>(`${this.url}/miscultivos`, { params });
  }
}
