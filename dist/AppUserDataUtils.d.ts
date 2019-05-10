import { ScorePoint } from "./Objs";
export declare class AppUserDataUtils {
    static saveScore(key: string, noCorrect: number, saveObjectFirebaseRef?: (key: string, valueSave: string) => any): Promise<void>;
    static getScore(key: string, callback: (value: number) => void): void;
    static getScoreAndReturn(key: string): Promise<number>;
    static saveTwoScore(subPathBh: string, noCorrect: number, noTotal: number, saveObjectFirebaseRef?: (key: string, valueSave: string | object) => any): Promise<void>;
    /**
     * return {noCorrect: number, noTotal: number}
     */
    static getTwoScore(subPathBh: string): Promise<ScorePoint>;
}
