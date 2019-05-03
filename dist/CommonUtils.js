import { BackHandler, Dimensions, InteractionManager, Linking, Platform, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { clone, cloneDeep } from "lodash";
function isIOS() {
    return Platform.OS === "ios";
}
export class CommonUtils {
    // region navigator function
    static initBackForAndroid(handleBack) {
        if (isIOS())
            return;
        console.log("initBackForAndroid: ");
        let backFunc = handleBack == undefined ? CommonUtils.onBackPress : handleBack;
        BackHandler.addEventListener('hardwareBackPress', backFunc);
    }
    static unInitBackForAndroid(handleBack) {
        if (isIOS())
            return;
        let backFunc = handleBack == undefined ? CommonUtils.onBackPress : handleBack;
        BackHandler.removeEventListener('hardwareBackPress', backFunc);
    }
    static onBackPress() {
        console.log("common utils onBackPress =================");
        return Actions.pop();
    }
    /**
     * type: replace => remove hết những sene trước đó. reset => remove sene hiện tại
     * */
    static openScreen(screenName, props, type) {
        if (type != undefined) {
            if (props == undefined) {
                // @ts-ignore
                props = { "type": type };
            }
            else
                // @ts-ignore
                props.type = type;
        }
        Actions[screenName](props);
    }
    //endregion
    //region screen Dimensions
    static getStatusBarHeight(skipAndroid = true) {
        const X_WIDTH = 375;
        const X_HEIGHT = 812;
        const XSMAX_WIDTH = 414;
        const XSMAX_HEIGHT = 896;
        const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');
        let isIPhoneX = false;
        // @ts-ignore
        if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
            isIPhoneX = W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT || W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT;
        }
        return Platform.select({
            ios: isIPhoneX ? 44 : 20,
            android: skipAndroid ? 0 : StatusBar.currentHeight,
            default: 0
        });
    }
    static getScreenDimension() {
        const { height, width } = Dimensions.get('window');
        return { widthS: width, heightS: height };
    }
    static getScreenW() {
        return Dimensions.get('window').width;
    }
    static getScreenH() {
        return Dimensions.get('window').height;
    }
    //endregion
    //region Common LeftMenuUtils func ==========
    static openAppPage(isIOSPage, iosId, androidID) {
        if (isIOSPage)
            Linking.openURL("https://itunes.apple.com/app/id" + iosId + "#").catch(err => console.error('An error occurred', err));
        else
            Linking.openURL("https://play.google.com/store/apps/details?id=" + androidID).catch(err => console.error('An error occurred', err));
    }
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
    static clone(value) {
        return clone(value);
    }
    /**
     * This method is like _.clone except that it recursively clones value.
     *
     * @param value The value to recursively clone.
     * @return Returns the deep cloned value.
     */
    static cloneDeep(value) {
        return cloneDeep(value);
    }
    static nextFrame() {
        return new Promise(function (resolve, reject) {
            requestAnimationFrame(function () {
                resolve();
            });
        });
    }
    static runAfterInteractions(doFunc, isSkipTimeout = false) {
        if (isSkipTimeout === true) {
            InteractionManager.runAfterInteractions(() => {
                doFunc();
            });
            return;
        }
        let called = false;
        let resultPromise;
        const timeout = setTimeout(() => {
            called = true;
            if (resultPromise != undefined) {
                resultPromise.cancel();
            }
            doFunc();
        }, 500);
        resultPromise = InteractionManager.runAfterInteractions(() => {
            if (called)
                return;
            clearTimeout(timeout);
            doFunc();
        });
    }
    //endregion
    static setState(component, state) {
        return new Promise(function (resolve, reject) {
            component.setState(state, () => resolve());
        });
    }
    static requestAnimationFrameWithPromise() {
        return new Promise(function (resolve, reject) {
            requestAnimationFrame(() => {
                resolve();
            });
        });
    }
    static waitAfterInteractions(isSkipTimeout = false) {
        return new Promise(function (resolve) {
            if (isSkipTimeout) {
                InteractionManager.runAfterInteractions(() => {
                    resolve();
                });
                return;
            }
            let called = false;
            let resultPromise;
            const timeout = setTimeout(() => {
                called = true;
                if (resultPromise != undefined) {
                    resultPromise.cancel();
                }
                resolve();
            }, 3000);
            resultPromise = InteractionManager.runAfterInteractions(() => {
                if (called)
                    return;
                clearTimeout(timeout);
                resolve();
            });
        });
    }
    static wait(timeMili) {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve();
            }, timeMili);
        });
    }
    ;
    static forceUpdateWithPromise(component) {
        if (component == undefined)
            return null;
        return new Promise(function (resolve, reject) {
            component.forceUpdate(() => {
                resolve();
            });
        });
    }
    /**Neu Timeout => reject is called*/
    static excuteFuncWithTimeOut(func, miliSeconds) {
        let didTimeOut = false;
        return new Promise(function (resolve, reject) {
            const timeout = setTimeout(function () {
                didTimeOut = true;
                reject(new Error('Request timed out'));
            }, miliSeconds);
            func().then((response) => {
                clearTimeout(timeout);
                if (!didTimeOut)
                    resolve(response);
            }).catch((reason) => {
                clearTimeout(timeout);
                if (!didTimeOut)
                    reject(reason);
            });
        });
    }
}
