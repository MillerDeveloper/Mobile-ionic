import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { IProduct } from 'src/app/shared/interfaces/products.interface';
import { CompaniesService } from 'src/app/shared/services/companies-service/companies.service';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';
import { ProductsService } from 'src/app/shared/services/products-service/products.service';

@Component({
  selector: 'app-all-products-page',
  templateUrl: './all-products-page.component.html',
  styleUrls: ['./all-products-page.component.scss']
})
export class AllProductsPageComponent implements OnInit {

  constructor(
    private readonly productsService: ProductsService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly modalController: ModalController,
    private readonly toastController: ToastController
  ) { }

  subscription: Subscription = new Subscription()
  products!: IProduct[]
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
    this.subscription.add(this.productsService.fetch(this.params).subscribe(
      (products: IProduct[]) => {        
        if(config.concatData) {
          this.products = this.products.concat(products)
        } else {
          this.products = products
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
      component: AddProduct
    })
    
    await modal.present()

    const { data } = await modal.onWillDismiss()
    if(data) {
      this.subscription.add(this.productsService.create(data).subscribe(
        async (result: IProduct) => {
          this.products.push(result)
          const toast = await this.toastController.create({
            message: 'Продукт успешно создан',
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

  async deleteItem(event: IProduct) {
    await this.productsService.delete([event._id]) 
    this.fetch({
      startLoad: true,
      startLoader: true,
      concatData: false,
    })

    const toast = await this.toastController.create({
      message: 'Продукт успешно удалён',
      duration: 2500
    })

    toast.present()
  }

  async updateItem(event: IProduct) {
    await this.productsService.update(event)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

@Component({
  selector: 'add-product',
  templateUrl: 'dialogs/add-product.html'
})
export class AddProduct {
  constructor(
    public readonly modalController: ModalController,
    private readonly companiesService: CompaniesService
  ) {}

  currentCompany: ICompany = this.companiesService.getCurrentCompany()

  productFormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    currency: new FormControl(null, Validators.required)
  })

  onSubmit() {
    this.modalController.dismiss(this.productFormGroup.value)
  }
}