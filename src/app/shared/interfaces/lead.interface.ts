import { IItemValues } from "./global.interface";

export interface ILead {
    _id: string,
    name: string,
    values: IItemValues[]
}