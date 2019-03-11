import {Animated} from 'react-native'

export class AnimateUtils {

    static startTiming(animate: Animated.Value,
                       toValue: number | { x: number; y: number },
                       duration: number = 300,
                       delay?: number): Promise<void> {
        return new Promise((resolve) => {
            Animated.timing(animate, {
                duration: duration,
                toValue: toValue,
                delay: delay
            }).start((result) => {
                if (result.finished)
                    resolve()
            })
        })
    }

    static startSpring(animate: Animated.Value,
                       toValue: number | { x: number; y: number }): Promise<void> {
        return new Promise((resolve) => {
            Animated.spring(animate, {
                toValue: toValue,
            }).start((result) => {
                if (result.finished)
                    resolve()
            })
        })
    }

    static stopAnimation(animate: Animated.Value, isDestroy: boolean): Promise<void> {
        if (animate == null) return null;
        if (isDestroy)
            animate.removeAllListeners();
        return new Promise((resolve) => {
            animate.stopAnimation(() => {
                resolve()
            })
        })
    }
}