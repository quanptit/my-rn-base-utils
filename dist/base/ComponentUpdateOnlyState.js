import { Component } from 'react';
import { isEqual } from "lodash";
export class ComponentUpdateOnlyState extends Component {
    // protected constructor(props: P) {
    //     super(props);
    // }
    constructor(props, context) {
        super(props, context);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(nextState, this.state);
    }
}
