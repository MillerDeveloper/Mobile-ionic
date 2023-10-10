/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/semi */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IColumn, IComponentConfig, IFilesConfig, ITableConfig } from '../../interfaces/global.interface';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FilesService } from '../../services/files-service/files.service';
import { ICompany } from '../../interfaces/company.interface';
import { CompaniesService } from '../../services/companies-service/companies.service';
import { ItemsService } from '../../services/global-services/items-service/items.service';

const COUNT_LOADABLE_ITEMS = 35

@Component({
  selector: 'app-wrapper-table',
  templateUrl: './wrapper-table.component.html',
  styleUrls: ['./wrapper-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperTableComponent implements OnInit {
  @Input() items: any[] = []
  @Input() config!: IComponentConfig
  @Input() tableConfig!: ITableConfig
  @Output() reloadData = new EventEmitter()
  @Output() addItem = new EventEmitter()
  @Output() deleteItem = new EventEmitter()
  @Output() updateItem = new EventEmitter()

  constructor(
    private readonly router: Router,
    public readonly callNumber: CallNumber,
    public readonly filesService: FilesService,
    private readonly companiesService: CompaniesService,
    public readonly itemsService: ItemsService
  ) { }

  filesConfig!: IFilesConfig
  columns: IColumn[] = []
  currentCompany: ICompany = this.companiesService.getCurrentCompany()

  ngOnInit(): void {
    switch(this.config.pageType) {
      case 'tasks': {
        this.columns = [
          {
            name: 'Название',
            nameDef: 'title',
            default: false
          },
          {
            name: 'Дата начала',
            nameDef: 'dateStart',
            default: false
          },
          {
            name: 'Дата окончания',
            nameDef: 'dateEnd',
            default: false
          }
        ]
        break
      }
      case 'meetings': {
        this.columns = [
          {
            name: 'Название',
            nameDef: 'title',
            default: false
          },
          {
            name: 'Дата начала',
            nameDef: 'dateStart',
            default: false
          },
          {
            name: 'Дата окончания',
            nameDef: 'dateEnd',
            default: false
          }
        ]
        break
      }
      default: {
        this.columns = this.currentCompany.settings[this.config.pageType][this.config.pageName].columns
      }
    }
    this.filesConfig = {
      type: 'avatar',
      page: this.config.pageType,
      path: ['avatars']
    }
  }

  loadMoreData(event: any): void {
    this.config.params.pageSize += COUNT_LOADABLE_ITEMS
    this.reloadData.emit({
      config: this.config,
      event: event,
      reloadConfig: {
        startLoad: false,
        showLoader: true,
        concatData: true
      }
    })
  }

  refreshTable() {
    this.reloadData.emit({
      config: this.config,
      reloadConfig: {
        startLoad: true,
        concatData: false
      }
    })
  }

  openCardItem(item: any) {
    if(item._id) {
      this.router.navigate([this.config.pageType, item._id])
    }
  }

  // (item: any) {
  //   return this.sanitizer.bypassSecurityTrustUrl(`tel:${item.phone}`)
  // }
}

