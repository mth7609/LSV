import { getDatasetNumber, prepareNumber, changeStatus1, changeStatus2, clearInput, setToNew } from "./RendererScripts_01.js";
import { requestDatasetDelete, requestDataset, requestComment } from "./ServerRequests.js";
import { globalDataset } from "./Globals.js";

var hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
var hex = function (x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

export function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
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
    let nr = String($(".dsNumber").val()).replace(".", "");

    let pnr = prepareNumber(nr);
    requestDataset(parseInt(nr));
    let found = globalDataset.contentValue.length;

    if (found == 1) {
        changeStatus2("Datensatz " + pnr + " gefunden");
        $(".dsNumber").val(pnr);
        $(".statusbar2").css("background-color", "#00ee00");
        $(".statusbar2").css("color", "#000000");
        localStorage.setItem("changeDatasetNumber", String(nr));
        setTimeout(() => {
            changeStatus2("Datensatz " + pnr + " ändern");
            $(".statusbar2").css("background-color", "#0000dd");
            $(".statusbar2").css("color", "#ffffff");
        }, 3000);
        $(".doButtonDatasetDelete").removeClass('disabled');
    }
    else {
        changeStatus2("Datensatz " + pnr + " NICHT gefunden!");
        localStorage.setItem("changeDatasetNumber", "NOK");
        $(".statusbar2").css("background-color", "#dd0000");
        $(".statusbar2").css("color", "#ffffff");
        $(".dsNumber").val(pnr);
        setTimeout(() => {
            changeStatus2("");
            $(".statusbar2").css("background-color", "#c2e2ec");
            $(".statusbar2").css("color", "#000000");
            changeStatus2(localStorage.getItem("mainHeadline_14"));
        }, 3000);
        $(".doButtonDatasetDelete").addClass('disabled');
    }
    $(".doButtonFetch").trigger("blur");

    requestComment(nr);
    showDataInForm();
}


function showDataInForm() {
    if (localStorage.getItem("changeDatasetNumber") == "NOK")
        return;

    clearInput();
    let ds = localStorage.getItem("changeDatasetNumber");
    $(".dsNumber").val(prepareNumber(ds));

    console.log(globalDataset);

    $('.name').val(globalDataset.contentValue[0]["name"]);
    $('.city').val(globalDataset.contentValue[0]["city"]);
    $('.schoolPublisher').val(globalDataset.contentValue[0]["school_publisher"]);
    $('.publishNo').val(globalDataset.contentValue[0]["number"]);

    const strTopic = globalDataset.contentValue[0]["topics_list"];
    const ar = strTopic.split(" ");
    console.log(ar + "  " + ar.length);
    for (let i = 0; i < ar.length; i++) {
        $(".topic_" + ar[i]).css("backgroundColor", "#00dd00").css("border", "solid 1px #111111");
        localStorage.setItem("checked_topic_" + ar[i], "checked");
    }

    if (globalDataset.contentValue[0]["publisher_is"] == "school") {
        $('.btnradio1').prop("checked", true);
        $(".schoolLabel").css("backgroundColor", "#00bb00");
        $('.btnradio2').prop("checked", false);
    }
    else
        if (globalDataset.contentValue[0]["publisher_is"] == "free") {
            $('.btnradio1').prop("checked", false);
            $(".freeLabel").css("backgroundColor", "#00bb00");
            $('.btnradio2').prop("checked", true);
        }
        else {
            $('.btnradio1').prop("checked", false);
            $('.btnradio2').prop("checked", false);
        }

    $('.dropdownState').html(globalDataset.contentValue[0]["state"]);
    $('.dropdownYear').html(globalDataset.contentValue[0]["year"]);

    var enc = decodeURIComponent(localStorage.getItem("datasetComment"));
    $('.comment').val(enc);
}


export function doDatasetSaveDB() {
    $(".doButtonSaveDB").trigger("blur");
    saveDataset();
}


export function doDatasetDelete() {
    let nr = String($(".dsNumber").val()).replace(".", "");
    $(".doButtonDatasetDelete").trigger("blur");
    clearInput();
    setToNew();
    //console.log("del: " + nr);
    requestDatasetDelete(nr);
}


function saveDataset() {
    let i;
    let n;
    let el2 = "", el = "";

    let cdn = localStorage.getItem("changeDatasetNumber");
    getDatasetNumber();
    let nr = localStorage.getItem("datasetNumber")

    console.log("cdn: " + cdn);
    console.log("nr: " + nr);

    if (cdn == "NOK" && nr == 0)
        return;

    let sqlQuery, pnr;

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

    var enc = encodeURIComponent($('.comment').val());
    console.log("cdn: " + cdn);
    console.log("nr: " + nr);

    if (cdn != localStorage.getItem("datasetNumber"))
        cdn = "NOK";

    if (cdn == "NOK") {
        //console.log("New: " + nr);
        sqlQuery = "INSERT INTO prolabor.archive_data (dataset_number,name,school_publisher,year,number,city,state,publisher_is,topics_list) values(" + nr + el + ",'" + el2.trimStart() + "')";
        window.electronAPI.sendDataset(sqlQuery);
        sqlQuery = "INSERT INTO prolabor.dataset_comments (dataset_number, comment) values(" + nr + ",'" + enc + "')";
        window.electronAPI.sendDataset(sqlQuery);
        nr = localStorage.getItem("datasetNumber");
        pnr = prepareNumber(nr);
        localStorage.setItem("changeDatasetNumber", "NOK");

        if (nr != 0) {
            changeStatus2("Datensatz " + pnr + " gespeichert");
            $(".statusbar2").css("background-color", "#00ee00");
            $(".statusbar2").css("color", "#000000");
            setTimeout(() => {
                changeStatus2("");
                $(".statusbar2").css("color", "#000000");
                $(".statusbar2").css("background-color", "#c2e2ec");
                changeStatus2(localStorage.getItem("mainHeadline_14"));
            }, 5000);

            $(".dsNumber").val(prepareNumber(nr));
            localStorage.setItem("datasetNumber", nr);
        }
        else {
            changeStatus2("Datensatz " + prepareNumber(pnr) + " NICHT gespeichert");
            $(".statusbar2").css("background-color", "#dd0000");
            $(".statusbar2").css("color", "#ffffff");
        }
    }
    else {
        //console.log("Change: " + cdn);
        sqlQuery = "DELETE FROM prolabor.archive_data where dataset_number=" + cdn;
        window.electronAPI.sendDataset(sqlQuery);
        sqlQuery = "DELETE FROM prolabor.dataset_comments where dataset_number=" + cdn;
        window.electronAPI.sendDataset(sqlQuery);
        setTimeout(() => {
            sqlQuery = "INSERT INTO prolabor.archive_data (dataset_number,name,school_publisher,year,number,city,state,publisher_is,topics_list) values(" + cdn + el + ",'" + el2.trimStart() + "')";
            window.electronAPI.sendDataset(sqlQuery);
            sqlQuery = "INSERT INTO prolabor.dataset_comments (dataset_number, comment) values(" + cdn + ",'" + enc + "')";
            window.electronAPI.sendDataset(sqlQuery);
            pnr = prepareNumber(cdn);
            changeStatus2("Datensatz " + pnr + " geändert");
            $(".statusbar2").css("background-color", "#00ee00");
            $(".statusbar2").css("color", "#000000");
            setTimeout(() => {
                changeStatus2("Datensatz " + pnr + " ändern");
                $(".statusbar2").css("background-color", "#0000dd");
                $(".statusbar2").css("color", "#ffffff");
            }, 3000);
        }, 2000);
    }
}
