import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComponentConfig } from '../../interfaces/global.interface';
import { ITask } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private readonly http: HttpClient) { }
  
  fetch(params: Params, itemId?: string, itemType?: string): Observable<ITask[]> {
    if(itemId && itemType) {
      return this.http.get<ITask[]>(`${environment.server}/tasks/${itemId}`, {
        params: new HttpParams({
          fromObject: Object.assign(params, {
            type: itemType
          })
        })
      })
    } else {
      return this.http.get<ITask[]>(`${environment.server}/tasks`, {
        params: new HttpParams({
          fromObject: params
        })
      })
    }
  }

  create(data: ITask, itemId?: string, config?: IComponentConfig): Observable<ITask> {
    if(itemId && config) {
      return this.http.post<ITask>(`${environment.server}/tasks/${itemId}`, {page: config.pageType, task: data})
    } else {
      return this.http.post<ITask>(`${environment.server}/tasks`, data)
    }
  }

  async delete(ids: string[]): Promise<string[]> {
    return await this.http.delete<string[]>(`${environment.server}/tasks/${ids}`).toPromise()
  }
}
