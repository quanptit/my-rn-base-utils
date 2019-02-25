export default class NetworkUtils {
    static saveCacheFile(url: string, response: string, callback?: (isSuccess: boolean) => void): void;
    /**
     * Chú ý là async function
     * Return Promise: <String> là nội dung của file ở URL
     * */
    static getStringFromUrl(url: string, isOnlyGetOnline?: boolean): Promise<{
        isFromOnline?: boolean;
        responseStr?: string;
    }>;
    /**
     * method: GET | POST
     * body có dạng: [ { name : 'user_name', data : 'Bill' },  { name : 'key2', data : 'value2' }]
     * */
    static excuteHttpTypeFormData(method: string, url: string, body: any[]): Promise<string>;
    static excuteHttpGET(url: any): Promise<any>;
    static excuteHttpGetString(url: any): Promise<string>;
}
