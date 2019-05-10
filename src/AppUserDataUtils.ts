import {AsyncStorage} from 'react-native'
import {PreferenceUtils} from "./PreferenceUtils";
import {ScorePoint} from "./Objs";

export class AppUserDataUtils {

    static async saveScore(key: string, noCorrect: number, saveObjectFirebaseRef?: (key: string, valueSave: string) => any) {
        let valueSave = String(noCorrect);
        await AsyncStorage.setItem(key, valueSave);
        if (saveObjectFirebaseRef != null && noCorrect > 0)
            saveObjectFirebaseRef(key, valueSave)
    }

    // callback(noCorrect: number)
    static getScore(key: string, callback: (value: number) => void) {
        AsyncStorage.getItem(key).then((value) => {
            if (value == undefined) {
                callback(0);
                return
            }
            callback(Number(value))
        }, () => {
            callback(0)
        })
    }

    static async getScoreAndReturn(key: string) {
        const value = await AsyncStorage.getItem(key);
        if (value == undefined) {
            return 0
        }
        return Number(value)
    }

    static async saveTwoScore(subPathBh: string, noCorrect: number, noTotal: number,
                              saveObjectFirebaseRef?: (key: string, valueSave: string | object) => any): Promise<void> {
        let key = subPathBh.hashCode() + "";
        let valueSaved = {noCorrect: noCorrect, noTotal: noTotal};
        await PreferenceUtils.saveObject(key, valueSaved);
        if (saveObjectFirebaseRef != null && noCorrect !== 0)
            return saveObjectFirebaseRef(key, valueSaved);
    }

    /**
     * return {noCorrect: number, noTotal: number}
     */
    static async getTwoScore(subPathBh: string): Promise<ScorePoint> {
        if (subPathBh) {
            let key = subPathBh.hashCode() + "";
            let value = await PreferenceUtils.getObject(key);
            if (value && value.noTotal != null)
                return value
        }

        return {noCorrect: 0, noTotal: 0}
    }
}
