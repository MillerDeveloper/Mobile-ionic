import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILog } from '../../interfaces/log.interface';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private readonly http: HttpClient) { }

  fetch(params: Params, itemId?: string, itemType?: string): Observable<ILog[]> {
    if(itemId && itemType) {
      return this.http.get<ILog[]>(`${environment.server}/logs/${itemId}`, {
        params: Object.assign(params, {
          type: itemType
        })
      })
    } else {
      return this.http.get<ILog[]>(`${environment.server}/logs`, {
        params: Object.assign(params, {
          type: itemType
        })
      })
    }
  }
}
