import RNFetchBlob from 'react-native-fetch-blob'
import {SecurityUtils} from "./SecurityUtils";

const dirs = RNFetchBlob.fs.dirs;
const fs = RNFetchBlob.fs;

export default {
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
