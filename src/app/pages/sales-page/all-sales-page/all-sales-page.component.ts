import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ISale } from 'src/app/shared/interfaces/sale.interface';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';
import { SalesService } from 'src/app/shared/services/sales-service/sales.service';

@Component({
  selector: 'app-all-sales-page',
  templateUrl: './all-sales-page.component.html',
  styleUrls: ['./all-sales-page.component.scss']
})
export class AllSalesPageComponent implements OnInit, OnDestroy {

  constructor(
    private readonly salesService: SalesService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly modalController: ModalController,
    private readonly toastController: ToastController
  ) { }

  subscription: Subscription = new Subscription()
  sales!: ISale[]
  loadingConfig = {
    isLoading: false,
    showLoader: false
  }

  params: Params = {
    tab: 'all',
    isSetedFilters: false,
    pageSize: 75,
    pageIndex: 0,
    sortBy: 'dateCreated',
    sortDirection: 'desc'
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
    this.subscription.add(this.salesService.fetch(this.params).subscribe(
      (sales: ISale[]) => {        
        if(config.concatData) {
          this.sales = this.sales.concat(sales)
        } else {
          this.sales = sales
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
    this.params = event.config.params
    const fetchParams = {
      startLoad: event?.reloadConfig?.startLoad ? true : false,
      concatData: event?.reloadConfig?.concatData ? true : false,
      showLoader: event?.reloadConfig?.showLoader ? true : false,
      infiniteEvent: event.event
    }

    this.fetch(fetchParams)    
  }

  segmentChanged(event: any): void {
    this.params.tab = event.detail.value
    this.fetch({
      startLoad: true,
      showLoader: false,
      concatData: false,
    })
  }

  async addItem(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddSale
    })
    
    await modal.present()

    const { data } = await modal.onWillDismiss()
    if(data) {
      this.subscription.add(this.salesService.create(data).subscribe(
        async (result: ISale) => {
          this.sales.push(result)
          const toast = await this.toastController.create({
            message: 'Продажа успешно создан',
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

  async deleteItem(event: ISale) {
    await this.salesService.delete([event._id])
    this.fetch({
      startLoad: true,
      startLoader: true,
      concatData: false,
    })

    const toast = await this.toastController.create({
      message: 'Продажа успешно удалёна',
      duration: 2500
    })

    toast.present()
  }

  async updateItem(event: ISale) {
    await this.salesService.update(event)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

@Component({
  selector: 'add-sale',
  templateUrl: 'dialogs/add-sale.html' 
})
export class AddSale {
  constructor(public readonly modalController: ModalController) {}

  saleFormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.minLength(6), Validators.maxLength(15)]),
    email: new FormControl(null, Validators.email)
  })

  onSubmit() {
    this.modalController.dismiss(this.saleFormGroup.value)
  }
}