import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  fetch(params: Params): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.server}/products`, {
      params: new HttpParams({
        fromObject: params
      })
    })
  }

  getById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${environment.server}/products/${id}`)
  }

  create(data: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${environment.server}/products`, data)
  }

  async update(data: IProduct): Promise<IProduct> {
    return await this.http.put<IProduct>(`${environment.server}/products`, data).toPromise()
  }

  async delete(ids: string[]): Promise<string[]> {
    return await this.http.delete<string[]>(`${environment.server}/products/${ids}`).toPromise()
  }
}
