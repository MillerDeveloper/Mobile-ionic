import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { IProduct } from 'src/app/shared/interfaces/products.interface';
import { IUserEntities } from 'src/app/shared/interfaces/user.interface';
import { CompaniesService } from 'src/app/shared/services/companies-service/companies.service';
import { ItemsService } from 'src/app/shared/services/global-services/items-service/items.service';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';
import { ProductsService } from 'src/app/shared/services/products-service/products.service';
import { UsersService } from 'src/app/shared/services/users-service/users.service';

@Component({
  selector: 'app-card-product-page',
  templateUrl: './card-product-page.component.html',
  styleUrls: ['./card-product-page.component.scss']
})
export class CardProductPageComponent implements OnInit {

  constructor(
    private readonly productsService: ProductsService,
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
  product!: IProduct
  userEntities!: IUserEntities
  currentCompany!: ICompany
  idProduct!: string
  loadingConfig = {
    isLoading: false,
    showLoader: false
  }

  ngOnInit(): void {
    this.idProduct = this.route.snapshot.paramMap.get('id') || ''
    if(this.idProduct) {
      this.userEntities = this.usersService.getUsersWithCurrent()
      this.currentCompany = this.companiesService.getCurrentCompany()
      this.fetch()
    }
  }

  fetch() {
    this.loadingConfig.isLoading = true
    this.loadingConfig.showLoader = true
    this.subscription.add(this.productsService.getById(this.idProduct).subscribe(
      (product: IProduct) => {
        this.product = product
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
          await this.productsService.update(this.product)
          const toast = await this.toastController.create({
            message: 'Продукт сохранён',
            duration: 2500
          })
          
          toast.present()
          this.router.navigateByUrl('/products')
          break
        }
        case 'delete': {
          await this.productsService.delete([this.product._id])
          const toast = await this.toastController.create({
            message: 'Продукт дисквалифицирован',
            duration: 2500
          })

          toast.present()
          this.router.navigateByUrl('/products')
          break
        }
      }
    }    
  }

  updateItemFields(fieldsForm: any) {
    this.product = this.itemsService.updateFields(fieldsForm, this.product, this.currentCompany)    
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
