import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, PopoverController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { ILead } from 'src/app/shared/interfaces/lead.interface';
import { IUserEntities } from 'src/app/shared/interfaces/user.interface';
import { CompaniesService } from 'src/app/shared/services/companies-service/companies.service';
import { ItemsService } from 'src/app/shared/services/global-services/items-service/items.service';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';
import { LeadsService } from 'src/app/shared/services/leads-service/leads.service';
import { UsersService } from 'src/app/shared/services/users-service/users.service';

@Component({
  selector: 'app-card-lead-page',
  templateUrl: './card-lead-page.component.html',
  styleUrls: ['./card-lead-page.component.scss']
})
export class CardLeadPageComponent implements OnInit, OnDestroy {

  constructor(
    private readonly leadsService: LeadsService,
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
  lead!: ILead
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
    this.subscription.add(this.leadsService.getById(this.idLead).subscribe(
      (lead: ILead) => {
        this.lead = lead
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
          await this.leadsService.update(this.lead)
          const toast = await this.toastController.create({
            message: 'Лид сохранён',
            duration: 2500
          })
          
          toast.present()
          this.router.navigateByUrl('/leads')
          break
        }
        case 'delete': {
          await this.leadsService.delete([this.lead._id])
          const toast = await this.toastController.create({
            message: 'Лид дисквалифицирован',
            duration: 2500
          })

          toast.present()
          this.router.navigateByUrl('/leads')
          break
        }
      }
    }    
  }

  updateItemFields(fieldsForm: any) {
    this.lead = this.itemsService.updateFields(fieldsForm, this.lead, this.currentCompany)    
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}