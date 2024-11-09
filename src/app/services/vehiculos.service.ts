import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Vehiculos } from '../models/Vehiculos';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class vehiculosService{
    private url = `${base_url}/papeletas`;
    listaCambio=new Subject<Vehiculos[]>()
    constructor(private http:HttpClient) { }
    list() {
      return this.http.get<Vehiculos[]>(this.url);
    }
    insert(tt: Vehiculos) {
      return this.http.post(this.url, tt);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva: Vehiculos[]) {
      this.listaCambio.next(listaNueva);
    }
    delete(id: number) {
        return this.http.delete(`${this.url}/${id}`);
      }
    
      listId(id: number) {
        return this.http.get<Vehiculos>(`${this.url}/${id}`);
      }
    
      update(us: Vehiculos) {
        return this.http.put(this.url,us);
      }
}
