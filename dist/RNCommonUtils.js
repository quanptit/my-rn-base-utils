import { NativeModules, Platform } from 'react-native';
import { PreferenceUtils } from "./PreferenceUtils";
import { isEmpty } from "./CommonFunction";
const RNCommonUtils = Platform.OS === "ios" ? NativeModules.RNCommonUtilsIOS : NativeModules.RNCommonUtilsAndroid;
export default {
    languageCode: null,
    languageCodeSave: null,
    //return number seconds
    lastModified(filePath) {
        return RNCommonUtils.lastModified(filePath);
    },
    /**
     * IOS: đọc file trong bundle
     * Android: Đọc file trong Asset Folder
     * */
    readFileFromAssetFolder(fileSubPath, isDecrypt) {
        return new Promise(function (resolve, reject) {
            RNCommonUtils.readFileFromAssetFolder(fileSubPath, isDecrypt, (value) => {
                resolve(value);
            }, (error) => {
                reject(error);
            });
        });
    },
    saveIntPreference(key, value) {
        return RNCommonUtils.saveIntPreference(key, value);
    },
    getStringSetting() {
        return RNCommonUtils.getStringSetting();
    },
    getLanguageCode() {
        return this.languageCodeSave || this.languageCode;
    },
    getLanguageCodeSave() {
        return this.languageCodeSave;
    },
    async loadCurrentLanguageCode() {
        let codeSave = await PreferenceUtils.getStringSetting("LANGUAGE_CODE");
        if (codeSave != null) {
            this.languageCodeSave = codeSave;
            return this.languageCodeSave;
        }
        this.languageCode = await RNCommonUtils.getCurrentLanguageCode();
        return this.languageCode;
    },
    updateCurrentLanguage(languageCode, callback) {
        if (isEmpty(languageCode))
            return;
        this.languageCode = undefined;
        this.languageCodeSave = languageCode;
        PreferenceUtils.saveSeting("LANGUAGE_CODE", languageCode, callback);
    },
    setVIPUser() {
        return RNCommonUtils.setVIPUser();
    },
    /**
     * fileAssetPath: sub path, với android là thư mục asset
     * */
    playSoundAssetFile(fileAssetPath, volume = 0) {
        console.log("playSoundAssetFile: ", fileAssetPath);
        return RNCommonUtils.playSoundAssetFile(fileAssetPath, volume);
    }
};
