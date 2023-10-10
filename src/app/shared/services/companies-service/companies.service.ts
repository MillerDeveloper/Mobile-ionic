import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IClassification, ICompany } from '../../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  constructor(
    private readonly http: HttpClient
  ) { }

  private currentCompany!: ICompany

  async fetchCurrentCompany(): Promise<ICompany> {
    try {
      this.currentCompany = await this.http.get<ICompany>(`${environment.server}/companies/getCurrent`).toPromise()
      return this.currentCompany
    } catch (error) {}
  }

  getCurrentCompany(): ICompany {
    return this.currentCompany
  }

  getCurrencies(): string[] {
    return this.currentCompany.settings.global.currencies
  }

  getClassifications(type: string): IClassification {
    switch (type) {
      case 'leads': {
        return this.currentCompany.settings.leads.classification
      }
      default: {
        return
      }
    }
  }
}
