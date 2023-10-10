import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFile, IFolder } from '../../interfaces/file.interface';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private readonly cookieService: CookieService,
    private readonly http: HttpClient
  ) { }

  getAvatar(avatar: any, filesConfig: any) {        
    if(avatar && avatar?.metadata && filesConfig) {
      const allowedPreview = ['image/jpeg', 'image/png']        
      if(avatar.metadata.mimetype && allowedPreview.includes(avatar.metadata.mimetype)) {
        let token: string = ''
        if(this.cookieService.check('token')) {
          token = this.cookieService.get('token')
        } else if(localStorage.getItem('token')) {          
          token = localStorage.getItem('token') || ''
        }

        return `${environment.server}/files/${avatar._id}?authorizationToken=${token.replace('Bearer ', '')}&mimetype=${avatar.metadata.mimetype}&filename=${avatar.filename}`
      } else {
        return '../../assets/images/auth-bg.png'
      }
    } else {
      return '../../assets/images/auth-bg.png'
    }
  }
 
  fetch(params: Params, path: string[]): Observable<{files: IFile[], folders: IFolder[]}> {
    const stringPath = path.join(';')
    if(stringPath) {
      return this.http.get<{files: IFile[], folders: IFolder[]}>(`${environment.server}/files/fetch/${stringPath}`, {
        params: new HttpParams({
          fromObject: params
        })
      })
    } else {
      return this.http.get<{files: IFile[], folders: IFolder[]}>(`${environment.server}/files/fetch`, {
        params: new HttpParams({
          fromObject: params
        })
      })
    }
  }

  async delete(idFile: string, type: string, name: string): Promise<void> {
    if(idFile) {
      await this.http.delete<string>(`${environment.server}/files/${idFile}`, {
        params: new HttpParams({
          fromObject: {
            type: type,
            name: name
          }
        })
      }).toPromise()
    } else {
      await this.http.delete<string>(`${environment.server}/files/${name}`, {
        params: new HttpParams({
          fromObject: {
            type: type
          }
        })
      }).toPromise()
    }
  }

  upload(formData: FormData, page: string, path: string[], type?: string, itemId?: string) {   
    const strignPath = path.join(';')
    if(strignPath) { 
      return this.http.post(`${environment.server}/files/${strignPath}?type=${type}&itemId=${itemId}&page=${page}`, formData)
    } else {
      return this.http.post(`${environment.server}/files?type=${type}&itemId=${itemId}&page=${page}`, formData)
    }
  }

  getFileUrl(file: IFile) {  
    const allowedPreview = ['image/jpeg', 'image/png']  
    if(file.metadata.mimetype && allowedPreview.includes(file.metadata.mimetype)) {
      return `${environment.server}/files/${file._id}?authorizationToken=${this.cookieService.get('token').replace('Bearer ', '')}&mimetype=${file.metadata.mimetype}&filename=${file.filename}`
    } else {
      return '../../assets/images/auth-bg.png'
    }
  }
}
