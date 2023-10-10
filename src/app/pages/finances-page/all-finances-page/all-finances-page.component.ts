import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IFinance } from 'src/app/shared/interfaces/finance.interface';
import { IComponentConfig } from 'src/app/shared/interfaces/global.interface';
import { FinancesService } from 'src/app/shared/services/finances-service/finances.service';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';

@Component({
  selector: 'app-all-finances-page',
  templateUrl: './all-finances-page.component.html',
  styleUrls: ['./all-finances-page.component.scss']
})
export class AllFinancesPageComponent implements OnInit, OnDestroy {

  constructor(
    private readonly financesService: FinancesService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly modalController: ModalController,
    private readonly toastController: ToastController
  ) { }

  subscription: Subscription = new Subscription()
  finances!: IFinance[]
  config: IComponentConfig = {
    pageName: 'allFinances',
    pageType: 'finances',
    params: {
      tab: 'all',
      isSetedFilters: false,
      pageSize: 75,
      pageIndex: 0,
      sortBy: 'dateCreated',
      sortDirection: 'desc'
    }   
  }
  loadingConfig = {
    isLoading: false,
    showLoader: false
  }

  ngOnInit(): void {
    this.fetch()
  }

  fetch(config: any = {
    startLoad: true,
    showLoader: true,
    concatData: false,
    infiniteEvent: null
  }): void {
    this.loadingConfig.isLoading = config.startLoad
    this.loadingConfig.showLoader = config.showLoader
    this.subscription.add(this.financesService.fetch(this.config.params).subscribe(
      (finances: IFinance[]) => {        
        if(config.concatData) {
          this.finances = this.finances.concat(finances)
        } else {
          this.finances = finances
        }

        if(config.infiniteEvent) {
          config.infiniteEvent.target.complete()
        }
      },
      (error: any) => this.errorHandlerService.catchError(error),
      () => {
        this.loadingConfig.isLoading = false
        this.loadingConfig.showLoader = false
      }
    ))
  }

  reloadData(event: any) {
    this.config.params = event.config.params
    const fetchParams = {
      startLoad: event?.reloadConfig?.startLoad ? true : false,
      concatData: event?.reloadConfig?.concatData ? true : false,
      showLoader: event?.reloadConfig?.showLoader ? true : false,
      infiniteEvent: event.event
    }

    this.fetch(fetchParams)    
  }

  segmentChanged(event: any): void {
    this.config.params.tab = event.detail.value
    this.fetch({
      startLoad: true,
      showLoader: false,
      concatData: false,
    })
  }

  async addItem(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddFinance
    })
    
    await modal.present()

    const { data } = await modal.onWillDismiss()
    if(data) {
      this.subscription.add(this.financesService.create(data).subscribe(
        async (result: IFinance) => {
          this.finances.push(result)
          const toast = await this.toastController.create({
            message: 'Финанс успешно создан',
            duration: 2500
          })
          toast.present()
          
          this.fetch({
            startLoad: true,
            showLoader: false,
            concatData: false
          })
        },
        (error: any) => this.errorHandlerService.catchError(error)
      ))
    }    
  }

  async deleteItem(event: IFinance) {
    await this.financesService.delete([event._id])
    this.fetch({
      startLoad: true,
      startLoader: true,
      concatData: false,
    })

    const toast = await this.toastController.create({
      message: 'Финанс успешно удалён',
      duration: 2500
    })

    toast.present()
  }

  async updateItem(event: IFinance) {
    await this.financesService.update(event)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}


@Component({
  selector: 'add-finance',
  templateUrl: 'dialogs/add-finance.html'
})
export class AddFinance {
  constructor(public readonly modalController: ModalController) {}

  financeFormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    paymentType: new FormControl(null, Validators.required),
    completed: new FormControl(false),
    amount: new FormControl(null, Validators.required),
    dateToComplete: new FormControl(null)
  })

  onSubmit() {
    this.modalController.dismiss(this.financeFormGroup.value)
  }
}