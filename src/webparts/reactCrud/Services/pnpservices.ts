import { sp } from '@pnp/sp';
import '@pnp/sp/lists';
import '@pnp/sp/items';

export class PnpServices {
  private _context: any;

  constructor(context: any) {
    this._context = context;
    sp.setup({
      spfxContext: context
    });
  }

  public async getItems(listName: string): Promise<any[]> {
    try {
      return await sp.web.lists.getByTitle(listName).items.getAll();
    } catch (error) {
      console.error(`Error getting items from list ${listName}:`, error);
      return [];
    }
  }

  public async CreateItem(listName: string, item: any): Promise<number> {
    try {
      const result = await sp.web.lists.getByTitle(listName).items.add(item);
      return result.data.Id;
    } catch (error) {
      console.error(`Error creating item in list ${listName}:`, error);
      return 0;
    }
  }

  public async updateItem(
    listName: string,
    itemId: number,
    item: any
  ): Promise<number> {
    try {
      await sp.web.lists.getByTitle(listName).items.getById(itemId).update(item);
      return itemId;
    } catch (error) {
      console.error(`Error updating item ${itemId} in list ${listName}:`, error);
      return 0;
    }
  }

  public async deleteItem(listName: string, itemId: number): Promise<void> {
    try {
      await sp.web.lists.getByTitle(listName).items.getById(itemId).delete();
    } catch (error) {
      console.error(`Error deleting item ${itemId} in list ${listName}:`, error);
    }
  }
}



// src/webparts/reactCrud/Services/pnpservices.ts
// import { spfi, SPFI, SPFx } from "@pnp/sp";
// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import {IItemAddResult} from '@pnp/sp/items';
// import { getSP } from "./pnpjsConfig";
// import "@pnp/sp/webs";
// import "@pnp/sp/lists";

// export interface IPnpService{
//     CreateItem(listName: string, itemObj:any):Promise<any>;
//     getItems(listName: string):Promise<any>;
//     updateItem(listName:string, itemId:number, itemObj:any):Promise<any>;
//     deleteItem(listName:string, itemId:number):Promise<any>;
// }

// export class PnpServices implements IPnpService{
//     private _sp: SPFI;

//     constructor(context: WebPartContext){
//         this._sp=getSP(context)
//     }
    
//     public async CreateItem(listName:string, itemObj: any): Promise<any> {
//         try {
//             const iar : IItemAddResult= await this._sp.web.lists.getByTitle(listName).items.add(itemObj);
//             return iar.data.Id
//         } catch (error) {
//             Promise.reject(error);
//             // return error;
//         }
//     }

//     public async getItems(listName: string): Promise<any> {
//         try {
            
//             const items:any[] = await this._sp.web.lists.getByTitle(listName).items();
//             return items
//         } catch (error) {
//             Promise.reject(error);
//             // return error;
//         }
//     }

//     public async updateItem(listName:string, itemId: number, itemObj: any): Promise<any> {
//         try {
//             const list = this._sp.web.lists.getByTitle(listName);
//             const i = await list.items.getById(itemId).update(itemObj);
//             return itemId;
//         } catch (error) {
//             Promise.reject(error);
//             return error;
//         }
//     }
//     public async deleteItem(listName: string, itemId: number): Promise<any> {
//         try {
//             const list = this._sp.web.lists.getByTitle(listName);
//             const i = await list.items.getById(itemId).delete();
//         } catch (error) {
//             Promise.reject(error);
//             return error;
//         }
//     }

// }

