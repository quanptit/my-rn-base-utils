import React, {Component} from 'react'

export abstract class ComponentNoUpdate<P = {}, S = {}> extends Component<P, S> {
    constructor(props: P, context?: any){
        super(props, context);
    }


    shouldComponentUpdate(nextProps, nextState) {
        return false
    }
}