export default class NetworkUtils {
    static saveCacheFile(url: string, response: string, callback?: (isSuccess: boolean) => void): void;
    /**
     * mặc định sẽ cache và lấy ở local cho lần 2 nếu đã cache
     * timeSecondCache: vd 3 day = 3*24*60*60
     * Chú ý là async function
     * Return Promise: <String> là nội dung của file ở URL
     * */
    static getStringFromUrlAndCache(url: string, isOnlyGetOnline?: boolean, cacheSetting?: {
        dir: string;
        fileName?: string;
        timeSecondCache?: number;
    }): Promise<{
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
