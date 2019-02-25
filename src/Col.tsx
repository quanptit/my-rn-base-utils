import React, {Component} from 'react'
import {View, StyleSheet, ViewStyle, StyleProp} from "react-native"
import {Touchable} from './Touchable'

export interface ContainerProps {
    spaceBetween?: boolean,
    spaceAround?: boolean,
    stretch?: boolean,
    dial?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    flex?: number
    style?: StyleProp<ViewStyle>
    onPress?: VoidFunction
    enablemeasureInWindow?:boolean
}

//https://github.com/hyrwork/react-native-row
export class Col extends Component<ContainerProps, any> {

    render() {
        let {flex, spaceBetween, spaceAround, stretch, dial, style, onPress, ...other} = this.props;
        let styleContainer: any[] = [];
        styleContainer.push(styles.flex_d_col);
        if (flex) styleContainer.push({flex: flex});
        if (spaceBetween) styleContainer.push(styles.spaceBetween);
        if (spaceAround) styleContainer.push(styles.spaceAround);
        if (stretch) styleContainer.push(styles.stretch);
        if (dial) styleContainer.push(styles["dial" + dial]);
        if (style) styleContainer.push(style);

        if (onPress)
            return (
                <Touchable style={styleContainer} {...other} onPress={onPress}>
                    {this.props.children}
                </Touchable>
            );

        return (
            <View style={styleContainer} {...other}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create<any>({
    flex_d_col: {flexDirection: "column"},
    spaceBetween: {justifyContent: 'space-between'},
    spaceAround: {justifyContent: 'space-around'},
    stretch: {alignItems: 'stretch'},
    dial1: {justifyContent: 'flex-start', alignItems: 'flex-start'},
    dial2: {justifyContent: 'flex-start', alignItems: 'center'},
    dial3: {justifyContent: 'flex-start', alignItems: 'flex-end'},
    dial4: {justifyContent: 'center', alignItems: 'flex-start'},
    dial5: {justifyContent: 'center', alignItems: 'center'},
    dial6: {justifyContent: 'center', alignItems: 'flex-end'},
    dial7: {justifyContent: 'flex-end', alignItems: 'flex-start'},
    dial8: {justifyContent: 'flex-end', alignItems: 'center'},
    dial9: {justifyContent: 'flex-end', alignItems: 'flex-end'},
});
