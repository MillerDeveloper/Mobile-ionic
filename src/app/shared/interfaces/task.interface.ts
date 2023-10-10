import { IUser } from "./user.interface";

export interface ITask {
  _id: string,
  title: string,
  dateStart: Date,
  dateEnd: Date,
  color: string,
  createBy: string,
  responsible: IUser[]
}
