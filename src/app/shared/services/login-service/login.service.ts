import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../../interfaces/user.interface';

interface ICandidate {
  email: string,
  password: string,
  idDB: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private readonly http: HttpClient) { }

  login(data: ICandidate): Observable<{token: string, idDB: string, user: IUser}> {
    return this.http.post<{token: string, idDB: string, user: IUser}>(`${environment.server}/auth/login`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    })
  }
}
