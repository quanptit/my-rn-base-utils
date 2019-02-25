import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { Touchable } from './Touchable';
//https://github.com/hyrwork/react-native-row
export class Row extends Component {
    constructor(props) {
        super(props);
        if (this.props.enablemeasureInWindow) {
            // @ts-ignore
            this.measureInWindow = (x, y, width, height) => {
                return this.root && this.root.measureInWindow(x, y, width, height);
            };
        }
    }
    render() {
        let { flex, spaceBetween, spaceAround, stretch, dial, style, onPress, ...other } = this.props;
        let styleContainer = [];
        styleContainer.push(styles.flex_d_row);
        if (flex)
            styleContainer.push({ flex: flex });
        if (spaceBetween)
            styleContainer.push(styles.spaceBetween);
        if (spaceAround)
            styleContainer.push(styles.spaceAround);
        if (stretch)
            styleContainer.push(styles.stretch);
        if (dial)
            styleContainer.push(styles["dial" + dial]);
        if (style)
            styleContainer.push(style);
        if (this.props.enablemeasureInWindow) {
            // @ts-ignore
            other.ref = (ref) => { this.root = ref; };
        }
        if (onPress)
            return (<Touchable style={styleContainer} {...other} onPress={onPress}>
                    {this.props.children}
                </Touchable>);
        return (<View ref={(ref) => { this.root = ref; }} style={styleContainer} {...other}>
                {this.props.children}
            </View>);
    }
}
const styles = StyleSheet.create({
    flex_d_row: { flexDirection: "row" },
    spaceBetween: { justifyContent: 'space-between' },
    spaceAround: { justifyContent: 'space-around' },
    stretch: { alignItems: 'stretch' },
    dial1: { justifyContent: 'flex-start', alignItems: 'flex-start' },
    dial2: { justifyContent: 'center', alignItems: 'flex-start' },
    dial3: { justifyContent: 'flex-end', alignItems: 'flex-start' },
    dial4: { justifyContent: 'flex-start', alignItems: 'center' },
    dial5: { justifyContent: 'center', alignItems: 'center' },
    dial6: { justifyContent: 'flex-end', alignItems: 'center' },
    dial7: { justifyContent: 'flex-start', alignItems: 'flex-end' },
    dial8: { justifyContent: 'center', alignItems: 'flex-end' },
    dial9: { justifyContent: 'flex-end', alignItems: 'flex-end' },
});
