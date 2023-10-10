import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser, IUserEntities } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private readonly http: HttpClient) { }

  private userEntities!: IUserEntities

  async fetchUsersWithCurrent(): Promise<{currentUser: IUser, users: IUser[], usersWithCurrent: IUser[]}> {
    try {
      this.userEntities = await this.http.get<{currentUser: IUser, users: IUser[], usersWithCurrent: IUser[]}>(`${environment.server}/users/getUsersWithCurrent`).toPromise()
      return this.userEntities
    } catch (error) {}
  }

  getUsersWithCurrent(): {currentUser: IUser, users: IUser[], usersWithCurrent: IUser[]} {
    return this.userEntities
  }  
}
