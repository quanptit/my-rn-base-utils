import {AsyncStorage} from 'react-native'
import {remove} from "lodash"

export class PreferenceUtils {

    static async saveBooleanSetting(key: string, value: boolean): Promise<void> {
        return this.saveSeting(key, value ? "1" : "0");
    }

    static saveBooleanSettingCallback(key: string, value: boolean, callback?: (isSuccess: boolean) => void) {
        this.saveSeting(key, value ? "1" : "0", callback);
    }

    /**Chú ý là async*/
    static async getBooleanSetting(key: string, defautValue = false): Promise<boolean> {
        let str = await AsyncStorage.getItem(key);
        if (str == undefined) return defautValue;
        return str === "1";
    }

    static saveObject(key: string, value): Promise<void> {
        if (value == undefined) {
            return AsyncStorage.removeItem(key)
        }
        return AsyncStorage.setItem(key, JSON.stringify(value))
    }

    static async getObject(key: string): Promise<any> {
        let jsonStr = await AsyncStorage.getItem(key)
        if (jsonStr) {
            try {
                return JSON.parse(jsonStr)
            } catch (e) {
                console.log("====== getObject ERROR: ", e, jsonStr)
            }
        }
    }

    static saveSetingWithPromise(key: string, value: string | number): Promise<void> {
        if (value == undefined) {
            return AsyncStorage.removeItem(key)
        }
        return AsyncStorage.setItem(key, String(value))
    }

    static saveSeting(key: string, value: string | number, callback?: (isSuccess: boolean) => void) {
        this.saveSetingWithPromise(key, value)
            .then(() => callback && callback(true))
            .catch(() => callback && callback(false))
    }

    static getStringSetting(key: string): Promise<string> {
        return AsyncStorage.getItem(key)
    }

    static async getNumberSetting(key: string, defaultValue = 0): Promise<number> {
        let setting = await AsyncStorage.getItem(key);
        if (setting != undefined)
            return Number(setting);
        return defaultValue
    }

    static async deleteKey(key: string) {
        return AsyncStorage.removeItem(key);
    }

    //region Save list object ==========
    static getList<T>(key: string): Promise<T[]> {
        return this.getObject(key)
    }

    static async pushToListWithPromise(key: string, item, addOnfirst: boolean) {
        let list = await this.getList(key) || [];
        if (addOnfirst)
            list.insert(0, item);
        else
            list.push(item);
        await this.saveObject(key, list)
    }

    static pushToList(key: string, item, addOnfirst: boolean, callback?: (isSuccess: boolean) => void) {
        this.pushToListWithPromise(key, item, addOnfirst)
            .then(() => callback && callback(true))
            .catch(() => callback && callback(false))
    }

    static async deleteFromListWithPromise<T>(key: string, isDeleteSetting: (itemValue: T, index: number) => boolean) {
        let list = await this.getList<T>(key);
        let isEmpty = (list == null || list.length === 0);
        if (!isEmpty) {
            remove(list, isDeleteSetting);
            await this.saveObject(key, list);
        }
    }

    static deleteFromList<T>(key: string, isDeleteSetting: (itemValue: T, index: number) => boolean, callback?: (isSuccess: boolean) => void) {
        this.deleteFromListWithPromise(key, isDeleteSetting)
            .then(() => callback && callback(true))
            .catch(() => callback && callback(false))
    }

    //endregion
}

