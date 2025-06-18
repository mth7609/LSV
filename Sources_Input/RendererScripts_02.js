import { prepareNumber, changeStatus1, changeStatus2 } from "./RendererScripts_01.js";


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



export function hideTabContent(nr) {
    $(".tab-" + nr).hide();
}


export function newTab(nr, link, name) {
    $(".nav").append('<button class="nav-link navtabCSS navtab-' + nr + '" data-bs-toggle="tab" data-bs-target="#cnt-' + nr + '" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">' + name + '</button>');
    $(".tab-content").append('<div class="tab-pane tab-' + nr + '" id="cnt-' + nr + '" role="tabpanel" aria-labelledby="nav-home-tab">' + name + '</div >');
    $(".tab-content").after('<script>$(".tab-' + nr + '").load("' + link + '")</script>');

    setTabActive(0);

    $(".navtab-" + nr).on('click', function (event) {
        //$(".tab-" + nr).load('" + link + "');
        console.log("Tab clicked: " + nr + "   :   Link: " + link);
        setTabActive(nr);
        $(".tab-" + nr).show();
    });
}


export function setTabActive(nr) {
    //console.log("nr: " + nr + "  Max: " + localStorage.getItem("maxDatasetTabs"));
    for (let i = 0; i < localStorage.getItem("maxDatasetTabs"); i++) {
        if (i != nr && $(".tab-" + i).show())
            hideTabContent(i);
    }
    //$(".tab-" + nr).show();
}


export function doNew() {
    $(".doButtonNew").trigger("blur");
    changeStatus2("doNew");
}


export function doFetch() {
    $(".doButtonFetch").trigger("blur");
    changeStatus2("doFetch");
}


export function doDatasetSaveDB() {
    $(".doButtonSaveDB").trigger("blur");
    changeStatus2("doDatasetSaveDB");
}


export function doDatasetSaveDBAll() {
    $(".doButtonSaveDBAll").trigger("blur");
    changeStatus2("doDatasetSaveDBAll");
}
