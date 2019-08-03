export declare class DataTypeUtils {
    /**  input: giá trị giữa [0-1] => return giá trị trong [a, b] */
    static interpolateNumber(valueIn0_1: number, a: number, b: number): number;
    static isNumeric(n: any): boolean;
    static getRandomInt(minEqual: any, maxEqual: any): any;
    /**
     * Result sample: 05:09
     */
    static convertTimeDisplayInPlay(second: number): string;
    static getCurrentTimeSeconds(): number;
    static getCurrentTimeMiliseconds(): number;
    static htmlToString(htmlSource: any): string;
    static getCleanString(str: string): string;
    /** Return [0 - 1]: 1 => equal*/
    static getPercentSameOfTwoWord(str1: string, str2: string): number;
    /**Return số ký tự khác nhau của 2 chuỗi*/
    static getDistanceString(a: string, b: string): any;
    static dateToHHMM(date: any): string;
    static dateToDDMMYYYY(date: any): string;
}
