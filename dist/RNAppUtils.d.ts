declare const _default: {
    ANDROID_openAppFromMarket(packageName: string): void;
    ANDROID_launchInstalled(packageName: string): void;
    /***
     *
     * @returns {Promise} value is boolean
     */
    ANDROID_isAppInstalled(packageName: string): Promise<boolean>;
    ANDROID_openTTSIntentInstallData(): void;
    /**     return Number      */
    ANDROID_getScore(key: String): Promise<number>;
    /**     return {value1: , value2: }     */
    ANDROID_getTwoScore(key1: String, key2: String): Promise<{
        value1: number;
        value2: number;
    }>;
    IOS_showStartAds(): void;
    IOS_openAppSetting(): void;
    IOS_requestPermisionPushNotification(): void;
    IOS_isIOS10(): Promise<boolean>;
};
export default _default;
