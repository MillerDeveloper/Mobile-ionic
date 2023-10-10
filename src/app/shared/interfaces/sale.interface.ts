import { IItemValues } from "./global.interface";

export interface ISale {
    _id: string,
    name: string,
    values: IItemValues[]
}