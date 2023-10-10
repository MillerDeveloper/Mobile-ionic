import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { ICounterparty } from 'src/app/shared/interfaces/counterparty.interface';
import { IUserEntities } from 'src/app/shared/interfaces/user.interface';
import { CompaniesService } from 'src/app/shared/services/companies-service/companies.service';
import { CounterpartiesService } from 'src/app/shared/services/counterparties-service/counterparties.service';
import { ItemsService } from 'src/app/shared/services/global-services/items-service/items.service';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';
import { UsersService } from 'src/app/shared/services/users-service/users.service';

@Component({
  selector: 'app-card-counterparty-page',
  templateUrl: './card-counterparty-page.component.html',
  styleUrls: ['./card-counterparty-page.component.scss']
})
export class CardCounterpartyPageComponent implements OnInit {

  constructor(
    private readonly counterpartiesService: CounterpartiesService,
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
  counterparty!: ICounterparty
  userEntities!: IUserEntities
  currentCompany!: ICompany
  idLead!: string
  loadingConfig = {
    isLoading: false,
    showLoader: false
  }

  ngOnInit(): void {
    this.idLead = this.route.snapshot.paramMap.get('id') || ''
    if(this.idLead) {
      this.userEntities = this.usersService.getUsersWithCurrent()
      this.currentCompany = this.companiesService.getCurrentCompany()
      this.fetch()
    }
  }

  fetch() {
    this.loadingConfig.isLoading = true
    this.loadingConfig.showLoader = true
    this.subscription.add(this.counterpartiesService.getById(this.idLead).subscribe(
      (counterparty: ICounterparty) => {
        this.counterparty = counterparty
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
          await this.counterpartiesService.update(this.counterparty)
          const toast = await this.toastController.create({
            message: 'Контрагент сохранён',
            duration: 2500
          })
          
          toast.present()
          this.router.navigateByUrl('/counterparties')
          break
        }
        case 'delete': {
          await this.counterpartiesService.delete([this.counterparty._id])
          const toast = await this.toastController.create({
            message: 'Контрагент дисквалифицирован',
            duration: 2500
          })

          toast.present()
          this.router.navigateByUrl('/counterparties')
          break
        }
      }
    }    
  }

  updateItemFields(fieldsForm: any) {
    this.counterparty = this.itemsService.updateFields(fieldsForm, this.counterparty, this.currentCompany)    
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
