import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { IFinance } from 'src/app/shared/interfaces/finance.interface';
import { IUserEntities } from 'src/app/shared/interfaces/user.interface';
import { CompaniesService } from 'src/app/shared/services/companies-service/companies.service';
import { FinancesService } from 'src/app/shared/services/finances-service/finances.service';
import { ItemsService } from 'src/app/shared/services/global-services/items-service/items.service';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';
import { UsersService } from 'src/app/shared/services/users-service/users.service';

@Component({
  selector: 'app-card-finance-page',
  templateUrl: './card-finance-page.component.html',
  styleUrls: ['./card-finance-page.component.scss']
})
export class CardFinancePageComponent implements OnInit {

  constructor(
    private readonly financesService: FinancesService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastController: ToastController,
    private readonly itemsService: ItemsService,
    private readonly actionSheetController: ActionSheetController
  ) { }

  subscription: Subscription = new Subscription()
  finance!: IFinance
  userEntities!: IUserEntities
  currentCompany: ICompany = this.companiesService.getCurrentCompany()
  idFinance!: string
  loadingConfig = {
    isLoading: false,
    showLoader: false
  }

  ngOnInit(): void {
    this.idFinance = this.route.snapshot.paramMap.get('id') || ''
    if(this.idFinance) {
      this.userEntities = this.usersService.getUsersWithCurrent()
      this.currentCompany = this.companiesService.getCurrentCompany()
      this.fetch()
    }
  }

  fetch() {
    this.loadingConfig.isLoading = true
    this.loadingConfig.showLoader = true
    this.subscription.add(this.financesService.getById(this.idFinance).subscribe(
      (finance: IFinance) => {
        this.finance = finance
      },
      (error: any) => this.errorHandlerService.catchError(error),
      () => {
        this.loadingConfig.isLoading = false
        this.loadingConfig.showLoader = false
      }
    ))
  }

  async showActionButtons(): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: 'Действия',
      buttons: [{
        text: 'Сохранить',
        role: 'save',
        icon: 'save'
      },
      {
        text: 'Закрыть',
        icon: 'close',
        role: 'cancel'
      }]
    })

    await actionSheet.present()
    const { role } = await actionSheet.onDidDismiss()
    
    if(role) {
      switch(role) {
        case 'save': {          
          await this.financesService.update(this.finance)
          const toast = await this.toastController.create({
            message: 'Финанс сохранён',
            duration: 2500
          })
          
          toast.present()
          this.router.navigateByUrl('/finances')
          break
        }
      }
    }    
  }

  updateItemFields(fieldsForm: any) {
    this.finance = this.itemsService.updateFields(fieldsForm, this.finance, this.currentCompany)    
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
