import {Platform} from "react-native";

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
