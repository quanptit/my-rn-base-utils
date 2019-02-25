import { ViewProps } from "react-native";
import { Component } from 'react';
export interface TouchableProperties extends ViewProps {
    onPress: () => any;
    underlayColor?: string;
}
export declare class Touchable extends Component<TouchableProperties, any> {
    private root;
    render(): any;
    _renderChildren(): any[];
    setNativeProps(nativeProps: any): void;
    measureInWindow(callback: any): void;
    measure(callback: any): void;
}
