import { IColumn, IField, IState, IItemTab, IRule } from "./global.interface";

export interface ICompany {
    idDB: string,
    settings: {
        global: {
            currencies: string[],
            units: string[],
        },  
        leads: {
            classification: IClassification,
            allLeads: {
                columns: IColumn[]
            },
            cardLead: {
                sideCard: {
                    fields: IField[]  
                },
                cardItem: {
                    fieldsWidth: number,
                    tabs: IItemTab[]
                }
            }
        },
        users: {
            classification: IClassification,
            allUsers: {
                columns: IColumn[]
            },
            cardUser: {
                sideCard: {
                    fields: IField[]  
                },
                cardItem: {
                    fieldsWidth: number,
                    tabs: IItemTab[]
                }
            }
        }
    }
}


export interface IClassification {
    states?: IState[],
    categories?: [{
        name: string
    }],
    types?: [{
        name: string
    }],
    departments?: [{
        name: string 
    }],
    positions?: [{
        name: string,
        rules: IRule
    }]
}