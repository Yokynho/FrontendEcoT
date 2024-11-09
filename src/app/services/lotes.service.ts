import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Lotes } from '../models/Lotes';
import { HttpClient } from '@angular/common/http';
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
}
