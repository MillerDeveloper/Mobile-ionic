import { IRule } from "./global.interface";

export interface IUser {
    _id: string,
    email: string,
    password?: string,
    idDB: string,
    name: string,
    surname: string,
    classification: {
        positions: {
            name: string,
            rules: IRule
        }
    }
}

export interface IUserEntities {
    currentUser: IUser, 
    users: IUser[], 
    usersWithCurrent: IUser[]
}

export interface IPage {
    name: string,
    nameDef: string,
    link: string,
    icon: string
}