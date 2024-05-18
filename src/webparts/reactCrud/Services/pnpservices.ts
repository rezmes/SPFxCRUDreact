// src/webparts/reactCrud/Services/pnpservices.ts
import { spfi, SPFI, SPFx } from "@pnp/sp";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {IItemAddResult} from '@pnp/sp/items';
import { getSP } from "./pnpjsConfig";

export interface IPnpService{
    CreateItem(listName: string, itemObj:any):Promise<any>;
    getItem(listName: string, columns:string[]):Promise<any>;
    updateItem(listName:string, itemId:number, itemObj:any):Promise<any>;
    deleteItem(listName:string, itemId:number):Promise<any>;
}

export class PnpServices implements IPnpService{
    private _sp;

    constructor(context: WebPartContext){
        this._sp=getSP(context)
    }
    
    public async CreateItem(listName:string, itemObj: any): Promise<any> {
        try {
            const iar : IItemAddResult= await this._sp.web.lists.getByTitle(listName).items.add(itemObj);
            return iar.data.Id
        } catch (error) {
            Promise.reject(error);
            return error;
        }
    }

    public async getItem(listName: string): Promise<any> {
        try {
            
            const items:any[] = await this._sp.web.lists.getByTitle(listName).items();
            return items
        } catch (error) {
            Promise.reject(error);
            return error;
        }
    }

    public async updateItem(listName:string, itemId: number, itemObj: any): Promise<any> {
        try {
            const list = this._sp.web.lists.getByTitle(listName);
            const i = await list.items.getById(itemId).update(itemObj);
            return itemId;
        } catch (error) {
            Promise.reject(error);
            return error;
        }
    }
    public async deleteItem(listName: string, itemId: number): Promise<any> {
        try {
            const list = this._sp.web.lists.getByTitle(listName);
            const i = await list.items.getById(itemId).delete();
        } catch (error) {
            Promise.reject(error);
            return error;
        }
    }

}

