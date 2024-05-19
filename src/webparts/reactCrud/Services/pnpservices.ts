//src/webparts/reactCrud/Services/pnpservices.ts
import { spfi, SPFI } from "@pnp/sp";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "../Services/pnpjsConfig";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface IPnpService {
    CreateItem(listName: string, itemObj: any): Promise<any>;
    getItems(listName: string): Promise<any>;
    updateItem(listName: string, itemId: number, itemObj: any): Promise<any>;
    deleteItem(listName: string, itemId: number): Promise<any>;
}

export class PnpServices implements IPnpService {
    private _sp: SPFI;

    constructor(context: WebPartContext) {
        this._sp = getSP(context);
    }

    public async CreateItem(listName: string, itemObj: any): Promise<any> {
        try {
            const result = await this._sp.web.lists.getByTitle(listName).items.add(itemObj);
            return result.data.Id;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async getItems(listName: string): Promise<any> {
        try {
            const items: any[] = await this._sp.web.lists.getByTitle(listName).items();
            return items;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async updateItem(listName: string, itemId: number, itemObj: any): Promise<any> {
        try {
            await this._sp.web.lists.getByTitle(listName).items.getById(itemId).update(itemObj);
            return itemId;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async deleteItem(listName: string, itemId: number): Promise<any> {
        try {
            await this._sp.web.lists.getByTitle(listName).items.getById(itemId).delete();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
