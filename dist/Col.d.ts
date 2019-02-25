import { Component } from 'react';
import { ViewStyle, StyleProp } from "react-native";
export interface ContainerProps {
    spaceBetween?: boolean;
    spaceAround?: boolean;
    stretch?: boolean;
    dial?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    flex?: number;
    style?: StyleProp<ViewStyle>;
    onPress?: VoidFunction;
    enablemeasureInWindow?: boolean;
}
export declare class Col extends Component<ContainerProps, any> {
    render(): any;
}
