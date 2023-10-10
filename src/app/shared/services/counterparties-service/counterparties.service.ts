import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICounterparty } from '../../interfaces/counterparty.interface';

@Injectable({
  providedIn: 'root'
})
export class CounterpartiesService {

  constructor(private readonly http: HttpClient) { }

  fetch(params: Params): Observable<ICounterparty[]> {
    return this.http.get<ICounterparty[]>(`${environment.server}/counterparties`, {
      params: new HttpParams({
        fromObject: params
      })
    })
  }

  getById(id: string): Observable<ICounterparty> {
    return this.http.get<ICounterparty>(`${environment.server}/counterparties/${id}`)
  }

  create(data: ICounterparty): Observable<ICounterparty> {
    return this.http.post<ICounterparty>(`${environment.server}/counterparties`, data)
  }

  async update(data: ICounterparty): Promise<ICounterparty> {
    return await this.http.patch<ICounterparty>(`${environment.server}/counterparties`, data).toPromise()
  }

  async delete(ids: string[]): Promise<string[]> {
    return await this.http.delete<string[]>(`${environment.server}/counterparties/${ids}`).toPromise()
  }
}
