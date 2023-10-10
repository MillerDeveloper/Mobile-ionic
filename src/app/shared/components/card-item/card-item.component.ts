import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IClassification, ICompany } from '../../interfaces/company.interface';
import { IComponentConfig, IField, IFilesConfig, IItemTab, IItemValues, ITab } from '../../interfaces/global.interface';
import { IUser, IUserEntities } from '../../interfaces/user.interface';
import { CompaniesService } from '../../services/companies-service/companies.service';
import { UsersService } from '../../services/users-service/users.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FilesService } from '../../services/files-service/files.service';
import { ItemsService } from '../../services/global-services/items-service/items.service';
import { ErrorHandlerService } from '../../services/global-services/toast-service/toast.service';

const DISABLED_FIELDS = ['dateCreated', '_id'] 

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  @Input() config!: IComponentConfig
  @Input() item!: any
  @Output() updateItemFields = new EventEmitter()

  constructor(
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
    public readonly callNumber: CallNumber,
    public readonly filesService: FilesService,
    public readonly itemsService: ItemsService,
    private readonly errorHandlerService: ErrorHandlerService
  ) { }

  currentCompany!: ICompany
  tabs: IItemTab[] = []
  fieldsGroup: FormGroup = new FormGroup({})
  subscription: Subscription = new Subscription()
  userEntities!: IUserEntities
  classification!: IClassification
  filesConfig!: IFilesConfig  
  itemUpdateTimeout!: any
  selectedSegment: string = 'fields'
  
  ngOnInit(): void {
    this.filesConfig = {
      type: 'avatar',
      page: this.config.pageType,
      path: ['avatars']
    } 
    this.userEntities = this.usersService.getUsersWithCurrent()  
    this.currentCompany = this.companiesService.getCurrentCompany()
    this.classification = this.companiesService.getClassifications(this.config.pageType)
    const tabs: IItemTab[] = this.currentCompany?.settings[this.config.pageType][this.config.pageName].cardItem.tabs
    
    if(tabs) {
      tabs.forEach((tab: IItemTab) => { 
        tab.fields.forEach((field: IField) => {      
          if(field.nameDef) {
            if(this.item[field.nameDef]) {
              if(DISABLED_FIELDS.includes(field.nameDef)) {
                this.fieldsGroup.addControl(field.nameDef, new FormControl({value: this.item[field.nameDef], disabled: true}))
              } else {
                if(field.nameDef === 'responsible') {
                  this.fieldsGroup.addControl(field.nameDef, new FormControl(this.item[field.nameDef]?.map((resp: IUser) => resp._id)))
                } else {
                  this.fieldsGroup.addControl(field.nameDef, new FormControl(this.item[field.nameDef]))
                }
              }
            } else if(this.item?.classification[field.nameDef]) {
              if(field.nameDef === 'positions') {
                this.fieldsGroup.addControl(field.nameDef, new FormControl(this.item.classification[field.nameDef]?.name))
              } else if(field.nameDef === 'currency') {
                this.fieldsGroup.addControl(field.nameDef, new FormControl(this.item.classification[field.nameDef]))
              } else {
                this.fieldsGroup.addControl(field.nameDef, new FormControl(this.item.classification[field.nameDef]?.map((item: any) => item.name)))
              }
            } else {
              const settedValue = this.item.values.find((value: IItemValues) => value.formControlName === field.nameDef)
              if(settedValue) {                        
                this.fieldsGroup.addControl(settedValue.formControlName, new FormControl(settedValue.value))
              } else {
                if(this.item && this.item[field.nameDef]) {                                       
                  if(DISABLED_FIELDS.includes(field.nameDef)) {            
                    this.fieldsGroup.addControl(field.nameDef, new FormControl({value: this.item[field.nameDef], disabled: true}))
                  } else {
                    this.fieldsGroup.addControl(field.nameDef, new FormControl(this.item[field.nameDef]))
                  }
                } else {
                  this.fieldsGroup.addControl(field.nameDef, new FormControl(field.defaultValue))
                }
              }
            }
          } else {
            const settedValue = this.item.values.find((value: IItemValues) => value.formControlName === field._id)
            if(settedValue) {          
              this.fieldsGroup.addControl(settedValue.formControlName, new FormControl(settedValue.value))
            } else {
              this.fieldsGroup.addControl(field._id, new FormControl(field.defaultValue))
            }
          }
        })
      })
    }

    this.subscription.add(this.fieldsGroup.valueChanges.subscribe(
      () => {
        clearTimeout(this.itemUpdateTimeout)
        this.itemUpdateTimeout = setTimeout(() => {
          this.updateItemFields.emit(this.fieldsGroup.value)
        }, 300)
      })
    )

    this.tabs = tabs
    if(this.tabs.length > 0) {
      this.tabs[0].tab.isActive = true  
    }
  }

  uploadFile(event: any) {
    const formData = new FormData()
    const selectedFile = <File>event.target.files[0]    
        
    formData.append('file', selectedFile, selectedFile.name)
    this.subscription.add(this.filesService.upload(formData, this.filesConfig.page, this.filesConfig.path, this.filesConfig.type, this.item._id).subscribe(
      (value: any) => {        
        this.fieldsGroup.patchValue({
          avatar: value
        })
        
      },
      (error) => this.errorHandlerService.catchError(error)
    )) 
  }

  toggleTab(tab: IItemTab): void {
    this.tabs.forEach((tab: IItemTab) => tab.tab.isActive = false)
    tab.tab.isActive = true
  }

  changeSegment(event: any) {
    this.selectedSegment = event.detail.value 
  }
}
