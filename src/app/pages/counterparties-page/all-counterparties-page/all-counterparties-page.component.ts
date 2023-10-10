import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ICounterparty } from 'src/app/shared/interfaces/counterparty.interface';
import { CounterpartiesService } from 'src/app/shared/services/counterparties-service/counterparties.service';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';

@Component({
  selector: 'app-all-counterparties-page',
  templateUrl: './all-counterparties-page.component.html',
  styleUrls: ['./all-counterparties-page.component.scss']
})
export class AllCounterpartiesPageComponent implements OnInit {

  constructor(
    private readonly counterpartiesService: CounterpartiesService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly modalController: ModalController,
    private readonly toastController: ToastController
  ) { }

  subscription: Subscription = new Subscription()
  counterparties!: ICounterparty[]
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
    this.subscription.add(this.counterpartiesService.fetch(this.params).subscribe(
      (counterparties: ICounterparty[]) => {        
        if(config.concatData) {
          this.counterparties = this.counterparties.concat(counterparties)
        } else {
          this.counterparties = counterparties
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
      component: AddCounterparty
    })
    
    await modal.present()

    const { data } = await modal.onWillDismiss()
    if(data) {
      this.subscription.add(this.counterpartiesService.create(data).subscribe(
        async (result: ICounterparty) => {
          this.counterparties.push(result)
          const toast = await this.toastController.create({
            message: 'Контрагент успешно создан',
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

  
  async deleteItem(event: ICounterparty) {
    await this.counterpartiesService.delete([event._id])
    this.fetch({
      startLoad: true,
      startLoader: true,
      concatData: false,
    })

    const toast = await this.toastController.create({
      message: 'Контрагент успешно удалён',
      duration: 2500
    }) 

    toast.present()
  }

  async updateItem(event: ICounterparty) {
    await this.counterpartiesService.update(event)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

@Component({
  selector: 'add-counterparty',
  templateUrl: 'dialogs/add-counterparty.html'
})
export class AddCounterparty { 
  constructor(public readonly modalController: ModalController) {}

  counterpartyFormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.minLength(6), Validators.maxLength(15)]),
    email: new FormControl(null, Validators.email)
  })

  onSubmit() {
    this.modalController.dismiss(this.counterpartyFormGroup.value)
  }
}