import { Component } from 'react';
import { isEqual, isPlainObject } from "lodash";
function isEqualSkipFunc(objSource, other) {
    if (isPlainObject(objSource) && isPlainObject(other)) {
        for (let key in objSource) {
            if (objSource.hasOwnProperty(key) && typeof objSource[key] !== "function") {
                if (!isEqualSkipFunc(objSource[key], other[key]))
                    return false;
            }
        }
        return true;
    }
    return isEqual(objSource, other);
}
export class PureComponentSkipFunction extends Component {
    constructor(props, context) {
        super(props, context);
    }
    shouldComponentUpdate(nextProps, nextState) {
        // return notEqualObjSkipCheckFunction(this.props, nextProps) || notEqualObjSkipCheckFunction(this.state, nextState);
        return !isEqualSkipFunc(this.props, nextProps) || !isEqualSkipFunc(this.state, nextState);
    }
}
