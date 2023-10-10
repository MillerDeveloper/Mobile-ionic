import { Injectable } from '@angular/core';
import { ITEM_CLASSIFICATION } from 'src/app/shared/global-variables';
import { ICompany } from 'src/app/shared/interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }

  updateFields(fieldsForm: any, item: any, currentCompany: ICompany): any {
    for(let key in fieldsForm) {      
      if(item[key] !== undefined) {
        if(fieldsForm[key]?.checked) {
          item[key] = fieldsForm[key].checked
        } else {
          item[key] = fieldsForm[key]
        }
      } else {
        if(ITEM_CLASSIFICATION.includes(key)) {
          item.classification[key] = []
          
          console.log(key, fieldsForm);
          
          if(fieldsForm[key] !== null && fieldsForm[key] !== undefined) {
            if(key === 'positions') {
              const position = currentCompany?.settings.users.classification.positions.find((ps: any) => ps.name === fieldsForm[key])
              if(position) {
                item.classification[key] = position
              } else console.log('Not Found', fieldsForm[key])
            } else {
              fieldsForm[key].forEach((classification: string) => {
                item.classification[key].push({
                  name: classification
                })
              })
            }
          } else {
            fieldsForm[key] = []
          }
        } else {
          const index = item.values.findIndex((values: any) => values.formControlName === key)
          if(index !== -1) {
            if(fieldsForm[key]?.checked) {
              item.values[index].value = fieldsForm[key].checked
            } else {
              item.values[index].value = fieldsForm[key]
            }
          } else {
            if(fieldsForm[key]?.checked) {
              item.values.push({
                formControlName: key,
                value: fieldsForm[key].checked
              })
            } else {
              item.values.push({
                formControlName: key,
                value: fieldsForm[key]
              })
            }
          }  
        }
      }
    }

    return item
  }

  getFieldValue(item: any, column: any, itemKey?: string): any {
    let searchedValue: any = null
    
    Object.keys(item).forEach((key: string) => {
      if(key === column) {
        if(itemKey) {
          searchedValue = item[key].map((item: any) => item[itemKey] || '')
        } else {
          searchedValue = item[key] || ''
        }
      }
    })

    if(searchedValue === null || searchedValue === undefined) {
      if(Array.isArray(item.values)) {
        item.values.forEach((itemFieldValue: any) => {
          if(itemFieldValue.formControlName === column) {     
            if(itemKey) {
              searchedValue = itemFieldValue.value?.map((item: any) => item[itemKey])
            } else {
              searchedValue = itemFieldValue.value
            }   
          }
        })
      } 
    }  
        
    return searchedValue || ''
  }
}
