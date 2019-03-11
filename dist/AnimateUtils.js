import { Animated } from 'react-native';
export class AnimateUtils {
    static startTiming(animate, toValue, duration = 300, delay) {
        return new Promise((resolve) => {
            Animated.timing(animate, {
                duration: duration,
                toValue: toValue,
                delay: delay
            }).start((result) => {
                if (result.finished)
                    resolve();
            });
        });
    }
    static startSpring(animate, toValue) {
        return new Promise((resolve) => {
            Animated.spring(animate, {
                toValue: toValue,
            }).start((result) => {
                if (result.finished)
                    resolve();
            });
        });
    }
    static stopAnimation(animate, isDestroy) {
        if (animate == null)
            return null;
        if (isDestroy)
            animate.removeAllListeners();
        return new Promise((resolve) => {
            animate.stopAnimation(() => {
                resolve();
            });
        });
    }
}
