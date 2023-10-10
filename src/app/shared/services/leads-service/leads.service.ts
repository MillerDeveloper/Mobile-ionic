import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILead } from '../../interfaces/lead.interface';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  constructor(private readonly http: HttpClient) { }

  fetch(params: Params): Observable<ILead[]> {
    return this.http.get<ILead[]>(`${environment.server}/leads/fetch`, {
      params: new HttpParams({
        fromObject: params
      })
    })
  }

  getById(id: string): Observable<ILead> {
    return this.http.get<ILead>(`${environment.server}/leads/${id}`)
  }

  create(data: ILead): Observable<ILead> {
    return this.http.post<ILead>(`${environment.server}/leads`, data)
  }

  async update(data: ILead): Promise<ILead> {
    return await this.http.patch<ILead>(`${environment.server}/leads`, data).toPromise()
  }

  async delete(ids: string[]): Promise<string[]> {
    return await this.http.delete<string[]>(`${environment.server}/leads/${ids}`).toPromise()
  }
}
