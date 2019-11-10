export declare class CommonUtils {
    static initBackForAndroid(handleBack?: () => void): void;
    static unInitBackForAndroid(handleBack?: () => void): void;
    static onBackPress(): void;
    /**
     * type: replace => remove hết những sene trước đó. reset => remove sene hiện tại
     * */
    static openScreen<T>(screenName: string, props?: T, type?: "reset" | "replace"): void;
    static getStatusBarHeight(skipAndroid?: boolean): number;
    static getScreenDimension(): {
        widthS: number;
        heightS: number;
    };
    static getScreenW(): number;
    static getScreenH(): number;
    static openAppPage(isIOSPage: any, iosId: string, androidID: string): void;
    /**
     * Creates a shallow clone of value.
     *
     * Note: This method is loosely based on the structured clone algorithm and supports cloning arrays,
     * array buffers, booleans, date objects, maps, numbers, Object objects, regexes, sets, strings, symbols,
     * and typed arrays. The own enumerable properties of arguments objects are cloned as plain objects. An empty
     * object is returned for uncloneable values such as error objects, functions, DOM nodes, and WeakMaps.
     *
     * @param value The value to clone.
     * @return Returns the cloned value.
     */
    static clone<T>(value: T): T;
    /**
     * This method is like _.clone except that it recursively clones value.
     *
     * @param value The value to recursively clone.
     * @return Returns the deep cloned value.
     */
    static cloneDeep<T>(value: T): T;
    static nextFrame(): Promise<void>;
    static runAfterInteractions(doFunc: any, isSkipTimeout?: boolean): void;
    static setState(component: any, state: any): Promise<void>;
    static requestAnimationFrameWithPromise(): Promise<void>;
    static waitAfterInteractions(isSkipTimeout?: boolean): Promise<unknown>;
    static wait(timeMili: any): Promise<void>;
    static forceUpdateWithPromise(component: any): Promise<void>;
    /**Neu Timeout => reject is called*/
    static excuteFuncWithTimeOut(func: () => Promise<any>, miliSeconds: number): Promise<any>;
}
