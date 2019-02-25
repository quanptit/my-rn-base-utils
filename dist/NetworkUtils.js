import RNFetchBlob from 'rn-fetch-blob';
import FileUtils from './FileUtils';
import { SecurityUtils } from "./SecurityUtils";
export default class NetworkUtils {
    static saveCacheFile(url, response, callback) {
        let filePathCache = RNFetchBlob.fs.dirs.DocumentDir + "/" + url.hashCode();
        FileUtils.writeFile(filePathCache, response)
            .then(() => callback && callback(true))
            .catch(() => callback && callback(false));
    }
    /**
     * Chú ý là async function
     * Return Promise: <String> là nội dung của file ở URL
     * */
    static async getStringFromUrl(url, isOnlyGetOnline) {
        let filePathCache = RNFetchBlob.fs.dirs.DocumentDir + "/" + url.hashCode();
        let isFromOnline;
        let responseStr;
        if (isOnlyGetOnline || !await FileUtils.exists(filePathCache)) {
            responseStr = await this.excuteHttpGetString(url);
            isFromOnline = true;
        }
        else
            responseStr = await FileUtils.readFile(filePathCache);
        return { isFromOnline: isFromOnline, responseStr: responseStr };
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
            throw new Error("excuteHttpGetString Error Status: " + response.status);
    }
}
function decryptString(source) {
    return SecurityUtils.decrypt(source);
}
