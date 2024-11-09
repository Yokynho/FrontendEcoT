import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Pagos } from '../models/Pagos';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PagosService{
    private url = `${base_url}/pagos`;
    listaCambio=new Subject<Pagos[]>()
    constructor(private http:HttpClient) { }
    list() {
      return this.http.get<Pagos[]>(this.url);
    }
    insert(pa: Pagos) {
      return this.http.post(this.url, pa);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva: Pagos[]) {
      this.listaCambio.next(listaNueva);
    }
    delete(id: number) {
        return this.http.delete(`${this.url}/${id}`);
      }
    
      listId(id: number) {
        return this.http.get<Pagos>(`${this.url}/${id}`);
      }
    
      update(pa: Pagos) {
        return this.http.put(this.url,pa);
      }
}
