import { Platform } from 'react-native';
export { default as FileUtils } from "./FileUtils";
export { PreferenceUtils } from "./PreferenceUtils";
export { SecurityUtils } from "./SecurityUtils";
export { default as NetworkUtils } from "./NetworkUtils";
export { default as Toast } from "./Toast";
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
