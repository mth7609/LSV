import { prepareNumber, changeStatus1, changeStatus2 } from "./RendererScripts_01.js";
import { requestDataset, requestNewDatasetNumber } from "./ServerRequests.js";
import { globalDataset } from "./Globals.js";

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


export function doFetchClick() {
    $(".doButtonFetch").trigger("blur");
    let nr = String($(".dsNumber").val()).replace(".", "");

    let data = requestDataset(nr);
    if (data == true) {
        console.log(globalDataset);
        console.log(globalDataset.contentValue[0]["name"]);
        $('.name').val(globalDataset.contentValue[0]["name"]);
        $('.city').val(globalDataset.contentValue[0]["city"]);
        $('.schoolPublisher').val(globalDataset.contentValue[0]["school_publisher"]);
        $('.publishNo').val(globalDataset.contentValue[0]["number"]);
        //$('.dropdownState').val(globalDataset.contentValue[0]["state"]);

        changeStatus2("Datensatz " + nr + " gefunden");

        $(".statusbar2").css("background-color", "#00ee00");
        setTimeout(() => {
            changeStatus2("");
            $(".statusbar2").css("background-color", "#c2e2ec");
        }, 5000);
    }
    else {
        changeStatus2("Datensatz " + $(".dsNumber").val() + " NICHT gefunden!");
        $(".statusbar2").css("background-color", "#dd0000");
        $(".statusbar2").css("color", "#ffffff");
        $(".dsNumber").val(prepareNumber(localStorage.getItem("datasetNumber")));
        setTimeout(() => {
            changeStatus2("");
            $(".statusbar2").css("background-color", "#c2e2ec");
        }, 5000);
    }
}



export function doDatasetSaveDB() {
    $(".doButtonSaveDB").trigger("blur");
    saveDataset();
}


export function doDatasetSaveDBAll() {
    $(".doButtonSaveDBAll").trigger("blur");
    changeStatus2("doDatasetSaveDBAll");
}


function saveDataset() {
    let i;
    let n;
    let el2 = "", el = "";

    el = el + ",'" + $('.name').val() + "'";
    el = el + ",'" + $('.schoolPublisher').val() + "'";
    el = el + ",'" + $(".dropdownYear").text() + "'";
    el = el + ",'" + $('.publishNo').val() + "'";
    el = el + ",'" + $('.city').val() + "'";
    el = el + ",'" + $(".dropdownState").text() + "'";
    el = el + ",'" + localStorage.getItem("publisherIs") + "'";

    for (n = 0; n < localStorage.getItem("topicHeadlineCnt"); n++) {
        for (i = 0; i < localStorage.getItem("amountTopicsHeadline_" + n); i++) {
            if (localStorage.getItem("checked_topic_" + n + "_" + i) == "checked") {
                el2 = el2 + " " + n + "_" + i;
            }
        }
    }

    let sqlQuery = "INSERT INTO prolabor.archive_data (dataset_number,name,school_publisher,year,number,city,state,publisher_is,topics_list) values(" + localStorage.getItem("datasetNumber") + el + ",'" + el2 + "')";
    window.electronAPI.sendDataset(sqlQuery);
    sqlQuery = "INSERT INTO prolabor.dataset_comments (dataset_number, comment) values(" + localStorage.getItem("datasetNumber") + ",'" + $('.comment').val() + "')";
    window.electronAPI.sendDataset(sqlQuery);

    let nd = requestNewDatasetNumber();

    if (nd != 0) {
        changeStatus2("Datensatz " + nd + " gespeichert");
        $(".statusbar2").css("background-color", "#00ee00");
        setTimeout(() => {
            changeStatus2("");
            $(".statusbar2").css("background-color", "#c2e2ec");
        }, 5000);
        nd++;

        $(".dsNumber").val(prepareNumber(nd));
        localStorage.setItem("datasetNumber", nd);
    }
    else {
        changeStatus2("Datensatz " + nd + " NICHT gespeichert");
        $(".statusbar2").css("background-color", "#dd0000");
        $(".statusbar2").css("color", "#ffffff");
    }
}