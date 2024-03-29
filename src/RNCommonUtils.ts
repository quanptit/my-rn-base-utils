import {NativeModules, Platform} from 'react-native'
import {PreferenceUtils} from "./PreferenceUtils";
import {isEmpty} from "./CommonFunction";

const RNCommonUtils = Platform.OS === "ios" ? NativeModules.RNCommonUtilsIOS : NativeModules.RNCommonUtilsAndroid;

export default {
    languageCode: null,
    isVipUserValue: null,
    languageCodeSave: null,

    //return number seconds
    lastModified(filePath: string): Promise<number> {
        return RNCommonUtils.lastModified(filePath);
    },

    /**
     * IOS: đọc file trong bundle
     * Android: Đọc file trong Asset Folder
     * */
    readFileFromAssetFolder(fileSubPath: string, isDecrypt: boolean): Promise<string> {
        return new Promise(function (resolve, reject) {
            RNCommonUtils.readFileFromAssetFolder(fileSubPath, isDecrypt, (value) => {
                resolve(value)
            }, (error) => {
                reject(error)
            })
        })
    },

    saveIntPreference(key: String, value: Number): Promise<void> {
        return RNCommonUtils.saveIntPreference(key, value)
    },

    getStringSetting(): Promise<string> {
        return RNCommonUtils.getStringSetting()
    },

    getLanguageCode(): string {
        return this.languageCodeSave || this.languageCode
    },
    getLanguageCodeSave(): string {
        return this.languageCodeSave;
    },
    saveLanguageCode(codeSave: string) {
        return PreferenceUtils.saveSetingWithPromise("LANGUAGE_CODE", codeSave);
    },

    async loadCurrentLanguageCode(): Promise<string> {
        let codeSave = await PreferenceUtils.getStringSetting("LANGUAGE_CODE");
        if (codeSave != null) {
            this.languageCodeSave = codeSave;
            return this.languageCodeSave;
        }
        this.languageCode = await RNCommonUtils.getCurrentLanguageCode();
        return this.languageCode
    },

    updateCurrentLanguage(languageCode: string, callback?: (isSuccess: boolean) => void) {
        if (isEmpty(languageCode)) return;
        this.languageCode = undefined;
        this.languageCodeSave = languageCode;
        PreferenceUtils.saveSeting("LANGUAGE_CODE", languageCode, callback)
    },

    setVIPUser(): Promise<void> {
        return RNCommonUtils.setVIPUser()
    },
    async isVIPUser(): Promise<boolean> {
        RNCommonUtils.isVipUserValue = await RNCommonUtils.isVIPUser();
        return RNCommonUtils.isVipUserValue;
    },
    async loadVIPUserState() {
        RNCommonUtils.isVipUserValue = await RNCommonUtils.isVIPUser();
    },
    isVipUserInstant(): boolean {
        if (RNCommonUtils.isVipUserValue == null)
            RNCommonUtils.loadVIPUserState();
        return RNCommonUtils.isVipUserValue;
    },
    getAppName(): Promise<string> {
        return RNCommonUtils.getAppName()
    },
    getBoolPref(pKey: string): Promise<boolean> {
        return RNCommonUtils.getBoolPref(pKey);
    },
    /**
     * fileAssetPath: sub path, với android là thư mục asset
     * */
    playSoundAssetFile(fileAssetPath: string, volume: number = 0) {
        console.log("playSoundAssetFile: ", fileAssetPath);
        return RNCommonUtils.playSoundAssetFile(fileAssetPath, volume)
    }
}
