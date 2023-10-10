import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFinance } from '../../interfaces/finance.interface';

@Injectable({
  providedIn: 'root'
})
export class FinancesService {

  constructor(private readonly http: HttpClient) { }

  fetch(params: Params): Observable<IFinance[]> {
    return this.http.get<IFinance[]>(`${environment.server}/finances`, {
      params: new HttpParams({
        fromObject: params
      })
    })
  }

  getById(id: string): Observable<IFinance> {
    return this.http.get<IFinance>(`${environment.server}/finances/${id}`)
  }

  create(data: IFinance): Observable<IFinance> {
    return this.http.post<IFinance>(`${environment.server}/finances`, data)
  }

  async update(data: IFinance): Promise<IFinance> {
    return await this.http.patch<IFinance>(`${environment.server}/finances`, data).toPromise()
  }

  async delete(ids: string[]): Promise<string[]> {
    return await this.http.delete<string[]>(`${environment.server}/finances/${ids}`).toPromise()
  }
}
