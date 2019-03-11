import RNFetchBlob from 'rn-fetch-blob';
import { SecurityUtils } from "./SecurityUtils";
import RNCommonUtils from "./RNCommonUtils";
const dirs = RNFetchBlob.fs.dirs;
const fs = RNFetchBlob.fs;
export default {
    /**Read file from folder "data":
     * nếu là android thì thư mục "data" trong asset, nếu là ios thì là trong project luôn
     * Promise with string is value*/
    readFileFromDataFolder(fileSubPath, isDecrypt) {
        return RNCommonUtils.readFileFromAssetFolder("data/" + fileSubPath, isDecrypt);
    },
    /**Read file from folder "data": nếu là android thì thư mục trong asset, nếu là ios thì là trong project luôn
     * Promise with string is value*/
    async readFileFromDataFolderWithJavascripDecrypt(fileSubPath, sub = 16) {
        let value = await RNCommonUtils.readFileFromAssetFolder("data/" + fileSubPath, false);
        return SecurityUtils.decrypt(value, sub);
    },
    /**Promise with string is value*/
    readFile(filePath) {
        return RNFetchBlob.fs.readFile(filePath, 'utf8');
    },
    writeFile(filePath, text) {
        return RNFetchBlob.fs.writeFile(filePath, text, 'utf8');
    },
    writeFileToDocumentDir(subPath, text) {
        let filePath = dirs.DocumentDir + "/" + subPath;
        return this.writeFile(filePath, text);
    },
    isExistFileFromDocumentDir(subPath) {
        let filePath = dirs.DocumentDir + "/" + subPath;
        return this.exists(filePath);
    },
    readFileFromDocumentDir(subPath) {
        let filePath = dirs.DocumentDir + "/" + subPath;
        return this.readFile(filePath);
    },
    // Return number of seconds
    lastModifiedFileFromDocumentDir(subPath) {
        let filePath = dirs.DocumentDir + "/" + subPath;
        return RNCommonUtils.lastModified(filePath);
    },
    deleteFile(filePath) {
        return fs.unlink(filePath);
    },
    /**Chú ý Promise: Check if a file exist at path*/
    exists(path) {
        return fs.exists(path);
    },
    /**Chú ý Promise: Check the file at path is a directory or not. Resolves with false when the path is not a directory, or it does not exists.*/
    isDir(path) {
        return fs.isDir(path);
    }
};
