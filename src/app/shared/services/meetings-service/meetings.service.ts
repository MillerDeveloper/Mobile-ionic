import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComponentConfig } from '../../interfaces/global.interface';
import { IMeeting } from '../../interfaces/meeting.interface';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(private readonly http: HttpClient) { }

  fetch(params: Params, itemId?: string, itemType?: string): Observable<IMeeting[]> {
    if(itemId && itemType) {
      return this.http.get<IMeeting[]>(`${environment.server}/meetings/${itemId}/${itemType}`, {
        params: new HttpParams({
          fromObject: Object.assign(params, {
            type: itemType
          })
        })
      })
    } else {
      return this.http.get<IMeeting[]>(`${environment.server}/meetings`, {
        params: new HttpParams({
          fromObject: params
        })
      })
    }
  }

  create(data: IMeeting, itemId: string, config: IComponentConfig): Observable<IMeeting> {
    if(itemId && config) {
      return this.http.post<IMeeting>(`${environment.server}/meetings/${itemId}`, {
        page: config.pageType,
        meeting: data
      })
    } else {
      return this.http.post<IMeeting>(`${environment.server}/meetings`, data)
    }
  }

  async delete(ids: string[]): Promise<string[]> {
    return await this.http.delete<string[]>(`${environment.server}/meetings/${ids}`).toPromise()
  }
}
