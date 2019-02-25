import RNFetchBlob from 'react-native-fetch-blob';
const dirs = RNFetchBlob.fs.dirs;
const fs = RNFetchBlob.fs;
export default {
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
