import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { IState, IComponentConfig } from 'src/app/shared/interfaces/global.interface';
import { CompaniesService } from '../../services/companies-service/companies.service';


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  @Input() state!: IState
  @Input() config!: IComponentConfig
  @Output() updateState = new EventEmitter()

  constructor(private readonly companiesService: CompaniesService) {}

  states: IState[] = []
  currentCompany: ICompany = this.companiesService.getCurrentCompany()

  ngOnInit(): void {
    this.states = this.currentCompany.settings[this.config.pageType].classification.states    
    
    if(!this.state) {
      const stateName = this.states[0].name
      this.state = {
        index: 0,
        name: stateName,
        color: 'black',
        textColor: 'white' 
      }
    }    
  }

  changeState(direction: 'increment' | 'decrement', toIndex: number = 1) {
    switch(direction) {
      case 'increment': {
        const newIndex = this.state.index + toIndex
        if(newIndex < this.states.length) {
          this.state = {
            index: newIndex,
            name: this.states[newIndex].name,
            color: this.states[newIndex].color,
            textColor: this.states[newIndex].textColor,
          }
        }

        this.updateState.emit(this.state)        
        break
      }
      case 'decrement': {
        const newIndex = this.state.index - toIndex
        if(newIndex >= 0 && this.state.index >= 0) {          
          this.state = {
            index: newIndex,
            name: this.states[newIndex].name,
            color: this.states[newIndex].color,
            textColor: this.states[newIndex].textColor,
          }
        }

        this.updateState.emit(this.state)    
        break
      }
    }
  }
}
