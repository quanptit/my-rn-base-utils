import RNFetchBlob from 'rn-fetch-blob';
import FileUtils from './FileUtils';
import { SecurityUtils } from "./SecurityUtils";
import { PreferenceUtils } from "./PreferenceUtils";
import { DataTypeUtils } from "./DataTypeUtils";
import { isEmpty } from "./CommonFunction";
export default class NetworkUtils {
    static saveCacheFile(url, response, callback) {
        let filePathCache = RNFetchBlob.fs.dirs.DocumentDir + "/" + url.hashCode();
        FileUtils.writeFile(filePathCache, response)
            .then(() => callback && callback(true))
            .catch(() => callback && callback(false));
    }
    /**
     * mặc định sẽ cache và lấy ở local cho lần 2 nếu đã cache
     * timeSecondCache: vd 3 day = 3*24*60*60
     * Chú ý là async function
     * Return Promise: <String> là nội dung của file ở URL
     * */
    static async getStringFromUrlAndCache(url, isOnlyGetOnline = false, cacheSetting = { dir: RNFetchBlob.fs.dirs.DocumentDir }) {
        let isGetFromOffline = false;
        let hashCode = url.hashCode();
        let filePathCache = cacheSetting.dir + "/" + (cacheSetting.fileName ? cacheSetting.fileName : hashCode);
        let isFileCacheExits = false;
        if (!isOnlyGetOnline) {
            isFileCacheExits = await FileUtils.exists(filePathCache);
            let timeSecondCache = cacheSetting.timeSecondCache;
            if (timeSecondCache != null && timeSecondCache > 0) {
                let lastSecondCache = await PreferenceUtils.getNumberSetting(String(hashCode), 0);
                if (DataTypeUtils.getCurrentTimeSeconds() - lastSecondCache > timeSecondCache)
                    isGetFromOffline = isFileCacheExits;
            }
            else
                isGetFromOffline = isFileCacheExits;
            if (isGetFromOffline) {
                return { isFromOnline: false, responseStr: await FileUtils.readFile(filePathCache) };
            }
        }
        let responseStr = await this.excuteHttpGetString(url);
        if (!isEmpty(responseStr)) { // noinspection JSIgnoredPromiseFromCall
            FileUtils.writeFile(filePathCache, responseStr);
        }
        return { isFromOnline: true, responseStr: responseStr };
    }
    /**
     * method: GET | POST
     * body có dạng: [ { name : 'user_name', data : 'Bill' },  { name : 'key2', data : 'value2' }]
     * */
    static async excuteHttpTypeFormData(method, url, body) {
        /*
         // Post binary data using base64 encoding
         RNFetchBlob.fetch('POST', 'http://myupload.com/upload', {
         'Content-Type' : 'application/octet-stream'
         }, RNFetchBlob.base64.encode(mydata))

         // Post binary data from existing file
         RNFetchBlob.fetch('POST', 'http://myupload.com/upload', {
         'Content-Type' : 'application/octet-stream'
         }, RNFetchBlob.wrap(path_to_the_file))

         // Post form data
         RNFetchBlob.fetch('POST', 'http://myupload.com/upload', {
         'Content-Type' : 'multipart/form-data'
         }, [
         { name : 'user_name', data : 'Bill' },
         // binary field data from a file path, use `wrap` method to wrap the path
         { name : 'avatar', filename : 'avatar.jpg', data : RNFetchBlob.wrap(path_to_the_file) },
         // binary field data encoded in BASE64
         { name : 'pet-avatar', filename : 'pet-avatar.jpg', data : RNFetchBlob.base64.encode(image_data) },
         ])

         */
        let header = { 'Content-Type': 'multipart/form-data' };
        let res = await RNFetchBlob.fetch('GET', url, header, body);
        return res.text();
    }
    static async excuteHttpGET(url) {
        let response = await fetch(url);
        return response.json();
    }
    static async excuteHttpGetString(url) {
        let response = await fetch(url);
        if (response.ok) {
            console.log("excuteHttpGetString Success", url);
            return response.text();
        }
        else
            console.warn("excuteHttpGetString Error", url);
        throw new Error("excuteHttpGetString Error Status: " + response.status);
    }
}
function decryptString(source) {
    return SecurityUtils.decrypt(source);
}
