import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IComponentConfig } from 'src/app/shared/interfaces/global.interface';
import { ILead } from 'src/app/shared/interfaces/lead.interface';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';
import { LeadsService } from 'src/app/shared/services/leads-service/leads.service';

@Component({
  selector: 'app-all-leads-page',
  templateUrl: './all-leads-page.component.html',
  styleUrls: ['./all-leads-page.component.scss']
})
export class AllLeadsPageComponent implements OnInit, OnDestroy {

  constructor(
    private readonly leadsService: LeadsService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly modalController: ModalController,
    private readonly toastController: ToastController
  ) { }

  subscription: Subscription = new Subscription()
  leads!: ILead[]
  config: IComponentConfig = {
    pageName: 'allLeads',
    pageType: 'leads',
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
    this.subscription.add(this.leadsService.fetch(this.config.params).subscribe(
      (leads: ILead[]) => {        
        if(config.concatData) {
          this.leads = this.leads.concat(leads)
        } else {
          this.leads = leads
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
      component: AddLead
    })
    
    await modal.present()

    const { data } = await modal.onWillDismiss()
    if(data) {
      this.subscription.add(this.leadsService.create(data).subscribe(
        async (result: ILead) => {
          this.leads.push(result)
          const toast = await this.toastController.create({
            message: 'Лид успешно создан',
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

  async deleteItem(event: ILead) {
    await this.leadsService.delete([event._id])
    this.fetch({
      startLoad: true,
      startLoader: true,
      concatData: false,
    })

    const toast = await this.toastController.create({
      message: 'Лид успешно удалён',
      duration: 2500
    })

    toast.present()
  }

  async updateItem(event: ILead) {
    await this.leadsService.update(event)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

@Component({
  selector: 'add-lead',
  templateUrl: 'dialogs/add-lead.html'
})
export class AddLead {
  constructor(public readonly modalController: ModalController) {}

  leadFormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.minLength(6), Validators.maxLength(15)]),
    email: new FormControl(null, Validators.email)
  })

  onSubmit() {
    this.modalController.dismiss(this.leadFormGroup.value)
  }
}