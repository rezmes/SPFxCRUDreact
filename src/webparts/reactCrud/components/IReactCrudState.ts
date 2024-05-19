import { IlistItems } from "../models/IListItems";

export interface IReactCrudState{
    status: string;
    ListItem: IlistItems;
    ListItems: IlistItems[];

}