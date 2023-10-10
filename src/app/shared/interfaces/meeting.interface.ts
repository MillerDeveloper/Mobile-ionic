import { IUser } from "./user.interface";

export interface IMeeting {
    _id: string,
    title: string,
    responsible: IUser[],
    createdBy: IUser,
    start: Date,
    end: Date
}