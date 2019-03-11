import { Animated } from 'react-native';
export declare class AnimateUtils {
    static startTiming(animate: Animated.Value, toValue: number | {
        x: number;
        y: number;
    }, duration?: number, delay?: number): Promise<void>;
    static startSpring(animate: Animated.Value, toValue: number | {
        x: number;
        y: number;
    }): Promise<void>;
    static stopAnimation(animate: Animated.Value, isDestroy: boolean): Promise<void>;
}
