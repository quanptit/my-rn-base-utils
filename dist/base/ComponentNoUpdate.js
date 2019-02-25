import { Component } from 'react';
export class ComponentNoUpdate extends Component {
    constructor(props, context) {
        super(props, context);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
}
