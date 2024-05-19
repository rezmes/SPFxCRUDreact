import { IListItems } from "../models/IListItems";

export interface IReactCrudState{
    status: string;
    ListItem: IListItems;
    ListItems: IListItems[];

}