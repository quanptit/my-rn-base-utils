export class SecurityUtils {
    static decrypt(encrypted: string, sub = 16): string {
        if (encrypted == undefined) {
            return null
        }
        let myString = "";
        let length = encrypted.length;
        for (let i = 0; i < length; i++) {
            myString += String.fromCharCode(encrypted.charCodeAt(i) - sub)
        }
        return myString
    }
}