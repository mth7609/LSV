import { changeStatus1 } from "./RendererScripts_01.js";


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

export function hideTab(nr) {
    $(".tab-" + nr).hide();
}

export function newTab(nr, link, name) {
    $(".nav").append('<button class="nav-link navtabCSS navtab-' + nr + '" data-bs-toggle="tab" data-bs-target="#cnt-' + nr + '" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">' + name + '</button>');
    $(".tab-content").append('<div class="tab-pane fade tab-' + nr + '" id="cnt-' + nr + '" role="tabpanel" aria-labelledby="nav-home-tab">' + name + '</div >');
    $(".tab-content").after('<script>$(".tab-' + nr + '").load("' + link + '")</script>');

    $(".navtab-" + nr).on('click', function (event) {
        console.log("navtab-" + nr + ", tabCount: " + localStorage.getItem("tabCount"));
        setTabActive(nr);
    });
}

export function setTabActive(nr) {
    for (let i = 0; i < localStorage.getItem("tabCount"); i++) {
        if (i != nr && $(".tab-" + i).show())
            hideTab(i);
    }

    console.log(nr);

    $(".tab-" + nr).show();
}
