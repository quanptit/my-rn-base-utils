import { Platform } from "react-native";
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
