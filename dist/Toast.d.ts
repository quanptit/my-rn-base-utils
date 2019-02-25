declare let Toast: {
    showShortTop: (message: any) => void;
    showShortCenter: (message: any) => void;
    showShortBottom: (message: any) => void;
    showLongTop: (message: any) => void;
    showLongCenter: (message: any) => void;
    showLongBottom: (message: any) => void;
    show: (message: any) => void;
    hide: () => void;
};
export default Toast;
