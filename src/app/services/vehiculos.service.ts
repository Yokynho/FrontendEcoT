import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Vehiculos } from '../models/Vehiculos';
import { PlacaPorCantidadCargaDTO } from '../models/PlacaPorCantidadCargaDTO';
import { VehiculosPorTotalRutasDTO } from '../models/VehiculosPorTotalRutasDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class vehiculosService{
    private url = `${base_url}/vehiculos`;
    listaCambio=new Subject<Vehiculos[]>()
    constructor(private http:HttpClient) { }

    list() {
      return this.http.get<Vehiculos[]>(this.url);
    }
    insert(ve: Vehiculos) {
      return this.http.post(this.url, ve);
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
    
    update(ve: Vehiculos) {
        return this.http.put(this.url,ve);
    }
    listByUsername(username: string): Observable<Vehiculos[]> {
      const params = new HttpParams().set('username', username);
      return this.http.get<Vehiculos[]>(`${this.url}/misvehiculos`, { params });
    }
    getQuantity():Observable<PlacaPorCantidadCargaDTO[]>{
      return this.http.get<PlacaPorCantidadCargaDTO[]>(`${this.url}/placaporcantidadcarga`)
    }

    getQuantityRutas():Observable<VehiculosPorTotalRutasDTO[]>{
      return this.http.get<VehiculosPorTotalRutasDTO[]>(`${this.url}/vehiculosportotalrutas`)
    }
}
