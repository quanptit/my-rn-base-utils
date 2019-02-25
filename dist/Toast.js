'use strict';
import { NativeModules } from 'react-native';
let RCTToast = NativeModules.Toast;
let optionsBuilder = function () {
    // defaults
    let message = null;
    let duration = "short";
    let position = "center";
    let addPixelsY = 0;
    return {
        withMessage: function (m) {
            message = m;
            return this;
        },
        withDuration: function (d) {
            duration = d;
            return this;
        },
        withPosition: function (p) {
            position = p;
            return this;
        },
        withAddPixelsY: function (y) {
            addPixelsY = y;
            return this;
        },
        build: function () {
            return {
                message: message,
                duration: duration,
                position: position,
                addPixelsY: addPixelsY
            };
        }
    };
};
let showWithOptions = function (options) {
    RCTToast.show(options);
};
let showToast = function (message, duration, position) {
    showWithOptions(optionsBuilder()
        .withMessage(message || '未知数据')
        .withDuration(duration)
        .withPosition(position)
        .build());
};
let Toast = {
    showShortTop: function (message) {
        showToast(message, "short", "top");
    },
    showShortCenter: function (message) {
        showToast(message, "short", "center");
    },
    showShortBottom: function (message) {
        showToast(message, "short", "bottom");
    },
    showLongTop: function (message) {
        showToast(message, "long", "top");
    },
    showLongCenter: function (message) {
        showToast(message, "long", "center");
    },
    showLongBottom: function (message) {
        showToast(message, "long", "bottom");
    },
    show: function (message) {
        showToast(message, "short", "bottom");
    },
    hide: function () {
        RCTToast.hide();
    }
};
export default Toast;
