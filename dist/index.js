import { Platform } from 'react-native';
export { initPrototype } from "./Prototype";
export { default as RNAppUtils } from "./RNAppUtils";
export { AnimateUtils } from "./AnimateUtils";
export { CommonUtils } from "./CommonUtils";
export { DataTypeUtils } from "./DataTypeUtils";
export { default as RNCommonUtils } from "./RNCommonUtils";
export { default as FileUtils } from "./FileUtils";
export { PreferenceUtils } from "./PreferenceUtils";
export { SecurityUtils } from "./SecurityUtils";
export { default as NetworkUtils } from "./NetworkUtils";
//region some function
export function isEmpty(str) {
    return str == undefined || str.length === 0;
}
export function sendError(error) {
    console.warn("============ ERROR ===========", error);
    if (error) {
        // console.log(error)
        if (error.stack) {
            console.warn(error.stack);
        }
    }
}
export function isIOS() {
    return Platform.OS === "ios";
}
//endregion
