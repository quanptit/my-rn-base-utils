import { AsyncStorage } from 'react-native';
import { remove } from "lodash";
export class PreferenceUtils {
    static async saveBooleanSetting(key, value) {
        return this.saveSeting(key, value ? "1" : "0");
    }
    static saveBooleanSettingCallback(key, value, callback) {
        this.saveSeting(key, value ? "1" : "0", callback);
    }
    /**Chú ý là async*/
    static async getBooleanSetting(key, defautValue = false) {
        let str = await AsyncStorage.getItem(key);
        if (str == undefined)
            return defautValue;
        return str === "1";
    }
    static saveObject(key, value) {
        if (value == undefined) {
            return AsyncStorage.removeItem(key);
        }
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }
    static async getObject(key) {
        let jsonStr = await AsyncStorage.getItem(key);
        if (jsonStr) {
            try {
                return JSON.parse(jsonStr);
            }
            catch (e) {
                console.log("====== getObject ERROR: ", e, jsonStr);
            }
        }
    }
    static saveSetingWithPromise(key, value) {
        if (value == undefined) {
            return AsyncStorage.removeItem(key);
        }
        return AsyncStorage.setItem(key, String(value));
    }
    static saveSeting(key, value, callback) {
        this.saveSetingWithPromise(key, value)
            .then(() => callback && callback(true))
            .catch(() => callback && callback(false));
    }
    static getStringSetting(key) {
        return AsyncStorage.getItem(key);
    }
    static async getNumberSetting(key, defaultValue = 0) {
        let setting = await AsyncStorage.getItem(key);
        if (setting != undefined)
            return Number(setting);
        return defaultValue;
    }
    static async deleteKey(key) {
        return AsyncStorage.removeItem(key);
    }
    //region Save list object ==========
    static getList(key) {
        return this.getObject(key);
    }
    static async pushToListWithPromise(key, item, addOnfirst) {
        let list = await this.getList(key) || [];
        if (addOnfirst)
            list.insert(0, item);
        else
            list.push(item);
        await this.saveObject(key, list);
    }
    static pushToList(key, item, addOnfirst, callback) {
        this.pushToListWithPromise(key, item, addOnfirst)
            .then(() => callback && callback(true))
            .catch(() => callback && callback(false));
    }
    static async deleteFromListWithPromise(key, isDeleteSetting) {
        let list = await this.getList(key);
        let isEmpty = (list == null || list.length === 0);
        if (!isEmpty) {
            remove(list, isDeleteSetting);
            await this.saveObject(key, list);
        }
    }
    static deleteFromList(key, isDeleteSetting, callback) {
        this.deleteFromListWithPromise(key, isDeleteSetting)
            .then(() => callback && callback(true))
            .catch(() => callback && callback(false));
    }
}
