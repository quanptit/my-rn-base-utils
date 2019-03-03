export declare class PreferenceUtils {
    static saveBooleanSetting(key: string, value: boolean): Promise<void>;
    static saveBooleanSettingCallback(key: string, value: boolean, callback?: (isSuccess: boolean) => void): void;
    /**Chú ý là async*/
    static getBooleanSetting(key: string, defautValue?: boolean): Promise<boolean>;
    static saveObject(key: string, value: any): Promise<void>;
    static getObject(key: string): Promise<any>;
    static saveSetingWithPromise(key: string, value: string | number): Promise<void>;
    static saveSeting(key: string, value: string | number, callback?: (isSuccess: boolean) => void): void;
    static getStringSetting(key: string): Promise<string>;
    static getNumberSetting(key: string, defaultValue?: number): Promise<number>;
    static deleteKey(key: string): Promise<void>;
    static getList<T>(key: string): Promise<T[]>;
    static pushToListWithPromise(key: string, item: any, addOnfirst: boolean): Promise<void>;
    static pushToList(key: string, item: any, addOnfirst: boolean, callback?: (isSuccess: boolean) => void): void;
    static deleteFromListWithPromise<T>(key: string, isDeleteSetting: (itemValue: T, index: number) => boolean): Promise<void>;
    static deleteFromList<T>(key: string, isDeleteSetting: (itemValue: T, index: number) => boolean, callback?: (isSuccess: boolean) => void): void;
}
