
export function parseData(str, actions) {
    
}

const keyStrokeDecoder = (key) => {
    switch (key) {
        case "Control":
        case "Alt":
        case "Shift":
        case "Capslock":
        case "Pause":
        case "Home":
        case "Meta":
        case "Escape":
        case "F1":
        case "F2":
        case "F3":
        case "F4":
        case "F5":
        case "F6":
        case "F7":
        case "F8":
        case "F9":
        case "F10":
        case "F11":
        case "F12":
            return 0x00;
        case "Backspace":
            return 0x08;
        case "Delete":
            return 0x7F;
        default:
            return key.charCodeAt(0);
        
    }
}