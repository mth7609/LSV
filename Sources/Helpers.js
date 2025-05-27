import { changeStatus1 } from "./ArchivScripts.js";


var hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
var hex = function (x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

export function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}


export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function showDBStatus(st) {
    if (st == "OK") {
        changeStatus1(localStorage.getItem("dbConnected"));
        $(".statusbar1").css("background-color", "#c2e2ec");
        $(".statusbar1").css("color", "#000000");
        return true;
    }
    else {
        changeStatus1(localStorage.getItem("dbDisconnected"));
        $(".statusbar1").css("background-color", "#ff1111");
        $(".statusbar1").css("color", "#ffffff");
        return false;
    }
}
