import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IComponentConfig, ITableConfig } from 'src/app/shared/interfaces/global.interface';
import { ILog } from 'src/app/shared/interfaces/log.interface';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';
import { LogsService } from 'src/app/shared/services/logs-service/logs.service';

@Component({
  selector: 'app-logs-page',
  templateUrl: './logs-page.component.html',
  styleUrls: ['./logs-page.component.scss']
})
export class LogsPageComponent implements OnInit, OnDestroy {
  @Input() item!: any
  @Input() config: IComponentConfig = {
    pageName: 'allMeetings',
    pageType: 'meetings',
    params: {
      tab: 'all',
      isSetedFilters: false,
      pageSize: 75,
      pageIndex: 0,
      sortBy: 'dateCreated',
      sortDirection: 'desc'
    }
  }
  @Input() tableConfig: ITableConfig = {
    filters: {
      responsible: true
    },
    itemOptions: {
      deleteItem: true,
      openCard: true,
      addItem: true
    }
  }
  
  constructor(
    private readonly logsService: LogsService,
    private readonly errorHandlerService: ErrorHandlerService
  ) { }

  logs: ILog[] = []
  subscription: Subscription = new Subscription()

  loadingConfig = {
    isLoading: false,
    showLoader: false
  }

  ngOnInit(): void {
    if(this.item) {
      this.logs = this.item.logs
    } else {
      this.fetch({
        startLoad: true,
        concatData: false
      })
    }
  }

  fetch(config: any = {
    startLoad: true,
    showLoader: true,
    concatData: false,
    infiniteEvent: null
  }): void {
    this.loadingConfig.isLoading = config.startLoad
    this.loadingConfig.showLoader = config.showLoader
    this.subscription.add(this.logsService.fetch(this.config.params, this.item?._id, this.config?.pageType).subscribe(
      (logs: ILog[]) => {
        this.logs = logs
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

  getFieldName(nameDef: string): string {
    switch(nameDef) {
      case 'name': return 'Имя'
      case 'phone': return 'Телефон'
      case 'values': return 'Пользовательские поля'
      case 'categories': return 'Категории'
      case 'title': return 'Название'
      case 'email': return 'Email'
      case 'state': return 'Стадия'
      case 'counterparties': return 'Контрагенты'
      case 'sales': return 'Продажы'
      case 'leads': return 'Лиды'
      case 'users': return 'Пользователи'
      case 'finances': return 'Финансы'
      case 'files': return 'Файлы'
      default: return 'Поле'
    }
  }

  getLogValue(type: string, log: any) {
    switch (type) {
      case 'previous': {
        if(Array.isArray(log.info?.previousValue) && typeof log.info.previousValue[0] === 'object') {
          const result = log.info?.previousValue.map((previous: any) => previous?.name)
          return result.join(',') || 'пустого значения'
        } else if(Array.isArray(log.info?.previousValue) && typeof log.info.previousValue[0] === 'string') {
          return log.info?.previousValue.join('') || 'пустого значения'
        } else {          
          if(typeof log.info?.previousValue === 'object') {
            if(log.info?.previousValue?.filename) {
              return log.info?.previousValue?.filename
            } else {
              return 'пустого значения'
            }
          } else {
            return log.info?.previousValue || 'пустого значения'
          }
        } 
      }
      case 'current': {
        if(Array.isArray(log.info?.currentValue) && typeof log.info.currentValue[0] === 'object') {
          const result = log.info?.currentValue?.map((previous: any) => previous?.name)
          return result.join(',') || 'пустое значение'
        } else if(Array.isArray(log.info?.currentValue) && typeof log.info.currentValue[0] === 'string') {
          return log.info?.currentValue.join('') || 'пустого значения'
        } else {
          if(typeof log.info?.currentValue === 'object') {
            if(log.info?.currentValue?.filename) {
              return log.info?.currentValue?.filename
            } else {
              return 'пустое значение'
            }
          } else {
            return log.info?.currentValue || 'пустое значение'
          }
        } 
      }
    }
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
