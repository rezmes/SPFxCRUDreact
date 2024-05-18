import { WebPartContext } from "@microsoft/sp-webpart-base";
import{spfi, SPFI, SPFx} from '@pnp/sp'
import {LogLevel, PnPLogging} from '@pnp/logging'


var _sp:SPFI = null;

export const getSP =(context?:WebPartContext):SPFI =>{
    if (_sp===null && context != null) {
        _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
    }
    return _sp;
};
