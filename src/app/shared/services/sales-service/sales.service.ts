import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISale } from '../../interfaces/sale.interface';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private readonly http: HttpClient) { }

  fetch(params: Params): Observable<ISale[]> {
    return this.http.get<ISale[]>(`${environment.server}/sales/fetch`, {
      params: new HttpParams({
        fromObject: params
      })
    })
  }

  getById(id: string): Observable<ISale> {
    return this.http.get<ISale>(`${environment.server}/sales/${id}`)
  }

  create(data: ISale): Observable<ISale> {
    return this.http.post<ISale>(`${environment.server}/sales`, data)
  }

  async update(data: ISale): Promise<ISale> {
    return await this.http.patch<ISale>(`${environment.server}/sales`, data).toPromise()
  }

  async delete(ids: string[]): Promise<string[]> {
    return await this.http.delete<string[]>(`${environment.server}/sales/${ids}`).toPromise()
  }
}
