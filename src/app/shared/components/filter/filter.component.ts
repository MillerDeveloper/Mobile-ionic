import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IComponentConfig, ITableConfig } from '../../interfaces/global.interface';
import { IUserEntities } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() config!: IComponentConfig
  @Input() tableConfig!: ITableConfig
  @Output() setFilters = new EventEmitter()
  constructor(private usersService: UsersService) { }

  filterTimeout!: any
  userEntities!: IUserEntities
 
  ngOnInit(): void {
    this.userEntities = this.usersService.getUsersWithCurrent()
  }  
  
  filterField(event: any): void {
    const formValue = event.target?.value || ''
    clearTimeout(this.filterTimeout)
    
    this.filterTimeout = setTimeout(() => {
      this.config.params.filter = formValue    
      this.setFilters.emit(this.config)
    }, 500)
  }

  setFilter(event: any, type: string) {
    this.config.params[type] = event.detail.value
    this.setFilters.emit(this.config)
  } 

  ngOnDestroy() {
    if(this.filterTimeout) clearTimeout(this.filterTimeout)
  }
}
