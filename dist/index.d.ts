export { AppUserDataUtils } from "./AppUserDataUtils";
export { TaskQueue } from "./TaskQueue";
export { initPrototype } from "./Prototype";
export { isEmpty, isIOS, sendError } from "./CommonFunction";
export { default as RNAppUtils } from "./RNAppUtils";
export { AnimateUtils } from "./AnimateUtils";
export { CommonUtils } from "./CommonUtils";
export { DataTypeUtils } from "./DataTypeUtils";
export { default as RNCommonUtils } from "./RNCommonUtils";
export { default as FileUtils } from "./FileUtils";
export { PreferenceUtils } from "./PreferenceUtils";
export { SecurityUtils } from "./SecurityUtils";
export { default as NetworkUtils } from "./NetworkUtils";
export * from './Objs';
export interface IPathUtilsModule {
    getPathOnline(subPath: string): string;
    getPathOnlineOrOffline(subPath: string, alwayGetOnline?: boolean): Promise<string>;
    getROOT(): string;
    getROOT_RESOURCE(): string;
    getCachedDownloadDir(): string;
    getFilePathCache(subPathOrUrl: string): string;
}
