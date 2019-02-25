export class SecurityUtils {
    static decrypt(encrypted, sub = 16) {
        if (encrypted == undefined) {
            return null;
        }
        let myString = "";
        let length = encrypted.length;
        for (let i = 0; i < length; i++) {
            myString += String.fromCharCode(encrypted.charCodeAt(i) - sub);
        }
        return myString;
    }
}
