declare const _default: {
    /**Promise with string is value*/
    readFile(filePath: any): Promise<string>;
    writeFile(filePath: string, text: string): Promise<void>;
    writeFileToDocumentDir(subPath: string, text: string): Promise<void>;
    isExistFileFromDocumentDir(subPath: string): Promise<boolean>;
    readFileFromDocumentDir(subPath: string): Promise<string>;
    deleteFile(filePath: any): Promise<void>;
    /**Chú ý Promise: Check if a file exist at path*/
    exists(path: string): Promise<boolean>;
    /**Chú ý Promise: Check the file at path is a directory or not. Resolves with false when the path is not a directory, or it does not exists.*/
    isDir(path: string): Promise<boolean>;
};
export default _default;
