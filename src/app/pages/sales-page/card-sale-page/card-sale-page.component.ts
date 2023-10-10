import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { ISale } from 'src/app/shared/interfaces/sale.interface';
import { IUserEntities } from 'src/app/shared/interfaces/user.interface';
import { CompaniesService } from 'src/app/shared/services/companies-service/companies.service';
import { ItemsService } from 'src/app/shared/services/global-services/items-service/items.service';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';
import { SalesService } from 'src/app/shared/services/sales-service/sales.service';
import { UsersService } from 'src/app/shared/services/users-service/users.service';

@Component({
  selector: 'app-card-sale-page',
  templateUrl: './card-sale-page.component.html',
  styleUrls: ['./card-sale-page.component.scss']
})
export class CardSalePageComponent implements OnInit, OnDestroy {

  constructor(
    private readonly salesService: SalesService,
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
  sale!: ISale
  userEntities!: IUserEntities
  currentCompany!: ICompany
  idSale!: string
  loadingConfig = {
    isLoading: false,
    showLoader: false
  }

  ngOnInit(): void {
    this.idSale = this.route.snapshot.paramMap.get('id') || ''
    if(this.idSale) {
      this.userEntities = this.usersService.getUsersWithCurrent()
      this.currentCompany = this.companiesService.getCurrentCompany()
      this.fetch()
    }
  }

  fetch() {
    this.loadingConfig.isLoading = true
    this.loadingConfig.showLoader = true
    this.subscription.add(this.salesService.getById(this.idSale).subscribe(
      (sale: ISale) => {
        this.sale = sale
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
        text: 'Удалить',
        role: 'delete',
        icon: 'trash'
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
          await this.salesService.update(this.sale)
          const toast = await this.toastController.create({
            message: 'Продажа сохранёна',
            duration: 2500
          })
          
          toast.present()
          this.router.navigateByUrl('/sales')
          break
        }
        case 'delete': {
          await this.salesService.delete([this.sale._id])
          const toast = await this.toastController.create({
            message: 'Продажа дисквалифицирована',
            duration: 2500
          })

          toast.present()
          this.router.navigateByUrl('/sales')
          break
        }
      }
    }    
  }

  updateItemFields(fieldsForm: any) {
    this.sale = this.itemsService.updateFields(fieldsForm, this.sale, this.currentCompany)    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
