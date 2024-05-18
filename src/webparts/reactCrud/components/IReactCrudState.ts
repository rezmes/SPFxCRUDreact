import { IlistItem } from "../models/IListItem";

export interface IReactCrudState{
    status: string;
    ListItem: IlistItem;
    ListItems: IlistItem[];

}