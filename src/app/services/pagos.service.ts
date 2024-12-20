import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Pagos } from '../models/Pagos';
import { PagosPorFechaDTO } from '../models/PagosPorFechaDTO';

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
      listByUsername(username: string): Observable<Pagos[]> {
        const params = new HttpParams().set('username', username);
        return this.http.get<Pagos[]>(`${this.url}/mispagos`, { params });
      }
      obtenerCantidad():Observable<PagosPorFechaDTO[]>{
        return this.http.get<PagosPorFechaDTO[]>(`${this.url}/pagoporfecha`)
      }
}
