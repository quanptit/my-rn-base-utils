import React, {Component} from 'react'
import {isEqual} from "lodash"

export abstract class ComponentUpdateOnlyState<P = {}, S = {}> extends Component<P, S> {
    // protected constructor(props: P) {
    //     super(props);
    // }
    constructor(props: P, context?: any){
        super(props, context);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(nextState, this.state)
    }
}
