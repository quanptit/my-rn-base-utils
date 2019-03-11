import RNFetchBlob from 'rn-fetch-blob'
import {SecurityUtils} from "./SecurityUtils";
import RNCommonUtils from "./RNCommonUtils";

const dirs = RNFetchBlob.fs.dirs;
const fs = RNFetchBlob.fs;

export default {

    /**Read file from folder "data":
     * nếu là android thì thư mục "data" trong asset, nếu là ios thì là trong project luôn
     * Promise with string is value*/
    readFileFromDataFolder(fileSubPath, isDecrypt: boolean): Promise<string> {
        return RNCommonUtils.readFileFromAssetFolder("data/" + fileSubPath, isDecrypt)
    },

    /**Read file from folder "data": nếu là android thì thư mục trong asset, nếu là ios thì là trong project luôn
     * Promise with string is value*/
    async readFileFromDataFolderWithJavascripDecrypt(fileSubPath: string, sub = 16) {
        let value = await RNCommonUtils.readFileFromAssetFolder("data/" + fileSubPath, false);
        return SecurityUtils.decrypt(value, sub);
    },

    /**Promise with string is value*/
    readFile(filePath): Promise<string> {
        return RNFetchBlob.fs.readFile(filePath, 'utf8');
    },

    writeFile(filePath: string, text: string): Promise<void> {
        return RNFetchBlob.fs.writeFile(filePath, text, 'utf8');
    },

    writeFileToDocumentDir(subPath: string, text: string) {
        let filePath = dirs.DocumentDir + "/" + subPath;
        return this.writeFile(filePath, text);
    },
    isExistFileFromDocumentDir(subPath: string) {
        let filePath = dirs.DocumentDir + "/" + subPath;
        return this.exists(filePath);
    },
    readFileFromDocumentDir(subPath: string): Promise<string> {
        let filePath = dirs.DocumentDir + "/" + subPath;
        return this.readFile(filePath);
    },
    // Return number of seconds
    lastModifiedFileFromDocumentDir(subPath: string): Promise<number>{
        let filePath = dirs.DocumentDir + "/" + subPath;
        return RNCommonUtils.lastModified(filePath);
    },

    deleteFile(filePath): Promise<void> {
        return fs.unlink(filePath);
    },

    /**Chú ý Promise: Check if a file exist at path*/
    exists(path: string): Promise<boolean> {
        return fs.exists(path);
    },

    /**Chú ý Promise: Check the file at path is a directory or not. Resolves with false when the path is not a directory, or it does not exists.*/
    isDir(path: string): Promise<boolean> {
        return fs.isDir(path);
    }
}
