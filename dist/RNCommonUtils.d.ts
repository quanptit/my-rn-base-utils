declare const _default: {
    languageCode: any;
    isVipUserValue: any;
    languageCodeSave: any;
    lastModified(filePath: string): Promise<number>;
    /**
     * IOS: đọc file trong bundle
     * Android: Đọc file trong Asset Folder
     * */
    readFileFromAssetFolder(fileSubPath: string, isDecrypt: boolean): Promise<string>;
    saveIntPreference(key: String, value: Number): Promise<void>;
    getStringSetting(): Promise<string>;
    getLanguageCode(): string;
    getLanguageCodeSave(): string;
    saveLanguageCode(codeSave: string): Promise<void>;
    loadCurrentLanguageCode(): Promise<string>;
    updateCurrentLanguage(languageCode: string, callback?: (isSuccess: boolean) => void): void;
    setVIPUser(): Promise<void>;
    isVIPUser(): Promise<boolean>;
    loadVIPUserState(): Promise<void>;
    isVipUserInstant(): boolean;
    getAppName(): Promise<string>;
    getBoolPref(pKey: string): Promise<boolean>;
    /**
     * fileAssetPath: sub path, với android là thư mục asset
     * */
    playSoundAssetFile(fileAssetPath: string, volume?: number): any;
};
export default _default;
