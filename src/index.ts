import {Platform} from 'react-native'
export {initPrototype} from "./Prototype";
export {default as  RNAppUtils} from "./RNAppUtils";
export {AnimateUtils} from "./AnimateUtils";
export {CommonUtils} from "./CommonUtils";
export {DataTypeUtils} from "./DataTypeUtils";
export {default as RNCommonUtils} from "./RNCommonUtils";
export {default as FileUtils} from "./FileUtils";
export {PreferenceUtils} from "./PreferenceUtils";
export {SecurityUtils} from "./SecurityUtils";
export {default as NetworkUtils} from "./NetworkUtils";

export interface IPathUtilsModule {
    getPathOnline(subPath: string): string;

    getPathOnlineOrOffline(subPath: string, alwayGetOnline?: boolean): Promise<string>
    getROOT():string
    getROOT_RESOURCE():string
}

//region some function
export function isEmpty(str: string | [any] | any[]): boolean {
    return str == undefined || str.length === 0
}

export function sendError(error: any) {
    console.warn("============ ERROR ===========", error);
    if (error) {
        // console.log(error)
        if (error.stack) {
            console.warn(error.stack)
        }
    }
}

export function isIOS(): boolean {
    return Platform.OS === "ios"
}

//endregion
