import { Params } from "@angular/router";

export interface IComponentConfig {
    pageName: string,
    pageType: string,
    params: Params
}

export interface IState {
    name: string,
    index: number,
    color: string,
    textColor: string
}

export interface IColumn {
    _id?: string,
    name: string,
    nameDef: string
    default: boolean
}

export interface IItemTab {
    tab: ITab,
    fields: IField[],
}

export interface IItemValues {
    formControlName: string,
    value: string
}

export interface ITab {
    _id: string,
    label: string,
    icon: string,
    tabType: string,
    isActive?: boolean
}

export interface IField {
    _id: string,
    label: string,
    nameDef: string,
    dataType: string,
    fieldType: string,
    appearance: string,
    hint: string,
    placeholder: string,
    icon: string,
    required: boolean,
    default: any,
    defaultValue: any
}

export class IRule {
    global: {
        pages: [{
            name: string,
            nameDef: string,
            link: string,
            icon: string
        }],
        access: boolean,
        sites: [{
            name: string,
            domain: string,
            secure: boolean
        }]
    }
    leads: {
        manageLeads: {
            delete: boolean,
            create: boolean,
            update: boolean,
            convertToSale: boolean,
            createColumns: boolean,
            updateColumns: boolean
        },
        distribution: boolean,
        allLeads: {
            tabs: [{
                    name: string,
                    nameDef: string
            }],
            viewAllLeads: boolean
        },
        cardLead: {
            tabs: [{
                name: string,
                nameDef: string
            }]
        }
    }
    sales: {
        manageSales: {
            delete: boolean,
            create: boolean,
            update: boolean,
            createColumns: boolean,
            updateColumns: boolean
        },
        allSales: {
            tabs: {
                type: [{
                    name: string,
                    nameDef: string
                }],
                default: [{
                    name: 'Все лиды',
                    nameDef: 'all'
                }]
            },
            viewAllSales: {
                type: boolean,
                default: false
            }
        }
    }
    analytics: {
        access: {
            type: boolean,
            default: false
        }
    }
    users: {
        manageUsers: {
            delete: {
                type: boolean,
                default: false
            },
            create: {
                type: boolean,
                default: false
            },
            change: {
                type: boolean,
                default: false
            }
        }
    }
}

export interface ITableConfig {
    filters: {
        responsible: boolean
    },
    itemOptions: {
        deleteItem: boolean,
        openCard: boolean,
        addItem: boolean
    }
}

export interface IFilesConfig {
    type: string,
    page: string,
    path: string[]
}
