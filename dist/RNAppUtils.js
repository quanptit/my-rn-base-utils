import { NativeModules } from "react-native";
export default {
    //region Android
    ANDROID_openAppFromMarket(packageName) {
        NativeModules.RNCommonUtilsAndroid.openAppFromMarket(packageName);
    },
    ANDROID_launchInstalled(packageName) {
        NativeModules.RNCommonUtilsAndroid.launchInstalled(packageName);
    },
    /***
     *
     * @returns {Promise} value is boolean
     */
    ANDROID_isAppInstalled(packageName) {
        return new Promise(function (resolve, reject) {
            NativeModules.RNCommonUtilsAndroid.isAppInstalled(packageName, (value) => {
                resolve(value);
            });
        });
    },
    ANDROID_openTTSIntentInstallData() {
        NativeModules.RNCommonUtilsAndroid.openTTSIntentInstallData();
    },
    /**     return Number      */
    async ANDROID_getScore(key) {
        return NativeModules.RNCommonUtilsAndroid.getScore(key);
    },
    /**     return {value1: , value2: }     */
    async ANDROID_getTwoScore(key1, key2) {
        return NativeModules.RNCommonUtilsAndroid.getTwoScore(key1, key2);
    },
    // region ios
    IOS_showStartAds() {
        NativeModules.RNCommonUtilsIOS.showStartAds();
    },
    IOS_openAppSetting() {
        NativeModules.RNCommonUtilsIOS.openAppSetting();
    },
    IOS_requestPermisionPushNotification() {
        NativeModules.RNCommonUtilsIOS.requestPermisionPushNotification();
    },
    IOS_isIOS10() {
        return NativeModules.RNCommonUtilsIOS.isIOS10();
    }
    //endregion
};
