import {TouchableNativeFeedback, TouchableOpacity, View, ViewProps, Platform} from "react-native"
import React, {Component} from 'react'

export interface TouchableProperties extends ViewProps {
    onPress: () => any
    underlayColor?: string
}

export class Touchable extends Component<TouchableProperties, any> {
    private root: any;

    render() {
        if (Platform.OS === "ios") {
            return (
                <TouchableOpacity {...this.props} ref={(ref) => {this.root = ref}}>
                    {this._renderChildren()}
                </TouchableOpacity>
            )
        }
        let {onPress, onLayout, ...otherProps} = this.props;
        return (
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
                                     onPress={onPress} onLayout={onLayout}>
                <View ref={(ref) => {this.root = ref}} {...otherProps}>
                    {this._renderChildren()}
                </View>
            </TouchableNativeFeedback>
        )
    }

    _renderChildren() {
        let childElements = [];
        React.Children.forEach(this.props.children, (item) => {
            if (React.isValidElement(item)) {
                childElements.push(item)
            }
        });
        return (childElements)
    }


    setNativeProps(nativeProps) {
        this.root && this.root.setNativeProps(nativeProps)
    }

    measureInWindow(callback) {
        this.root && this.root.measureInWindow(callback)
    }

    measure(callback) {
        this.root && this.root.measure(callback)
    }
}
