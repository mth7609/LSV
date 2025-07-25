import { doDatasetRemember, getMilliseconds1970, setDatasetUnchanged, prepareNumber, clearInput, setToNew, doNew } from "./RendererScripts_01.js";
import { setStatusWarning, setStatusWarningPermanent, runForeverConfirmDoSave, runForeverConfirmDoDelete, setStatusInformation, setStatusInformationPermanent, setStatus1, setStatus2 } from "./RendererScripts_03.js";
import { requestAllDatasetNumbers, requestCheckDatasetNumber, requestDataset, requestComment } from "./ServerRequests.js";
import { globalDatasetNumbers, globalDataset } from "./Globals.js";


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
        setStatus1(localStorage.getItem("dbConnected") + ". " + localStorage.getItem("versionOfProgram") + " " + localStorage.getItem("initDate"));
        $(".statusbar1").css("background-color", "#c2e2ec");
        $(".statusbar1").css("color", "#000000");
        return true;
    }
    else {
        setStatus1(localStorage.getItem("dbDisconnected"));
        $(".statusbar1").css("background-color", "#ff1111");
        $(".statusbar1").css("color", "#ffffff");
        return false;
    }
}


export function hideTabContent(nr) {
    $(".tab-" + nr).hide();
    $('.navtab-' + nr).css("background", "#ffffff");
    $('.navtab-' + nr).css("color", "#000000");

}


export function newTab(nr, link, name) {
    $(".nav").append('<button class="nav-link navtabCSS navtab-' + nr + '" data-bs-toggle="tab" data-bs-target="#cnt-' + nr + '" type="button" role="tab">' + name + '</button>');
    $(".tab-content").append('<div class="tab-pane tab-' + nr + '" id="cnt-' + nr + '" role="tabpanel"' + name + '</div >');
    $(".tab-content").after('<script>$(".tab-' + nr + '").load("' + link + '")</script>');

    setTabActive(0);

    $(".navtab-" + nr).on('click', function (event) {
        setTabActive(nr);
        $(".tab-" + nr).show();
    });
}


export function setTabActive(nr) {
    //console.log("nr: " + nr);

    for (let i = 0; i <= localStorage.getItem("maxDatasetTabs"); i++) {
        if (i != nr && $(".tab-" + i).show()) {
            hideTabContent(i);
        }
    }
    $('.navtab-' + nr).css("background", "#056289");
    $('.navtab-' + nr).css("color", "#ffffff");
}


export function checkTab(pnr) {
    let i;
    for (i = 0; i <= localStorage.getItem("maxDatasetTabs"); i++) {
        if ($(".navtab-" + i).text() === pnr) {
            return true;
        }
    }
    return false;
}


export function checkForDataset(nr) {
    requestCheckDatasetNumber(nr);
    return localStorage.getItem(nr);
}


let keyOld = 0;
let keyCtrl = 17;

export function doKeydown(event) {
    let key = event.which;
    let i, nr;

    if (key == 13 && $(".dsNumber").is(":focus")) {
        doFetch();
        return;
    }

    switch (key) {
        case keyCtrl: keyOld = keyCtrl; return;
        case 37: break;
        case 39: break;
        case 77: break;
        case 76: break;
        case 83: break;
        case 78: break;
        case 65: break;
        default: keyOld = 0; return;
    }

    //console.log("key: " + key + "   keyOld: " + keyOld);

    if (key == 65 && keyOld == keyCtrl) {
        doFetch();
        keyOld = 0;
        return;
    }

    if (key == 77 && keyOld == keyCtrl) {
        doDatasetRemember();
        keyOld = 0;
        return;
    }

    if (key == 76 && keyOld == keyCtrl) {
        doDatasetDelete();
        keyOld = 0;
        return;
    }

    if (key == 83 && keyOld == keyCtrl) {
        doDatasetSave();
        keyOld = 0;
        return;
    }

    if (key == 78 && keyOld == keyCtrl) {
        $(".dsNumber").val("00.000");
        doNew();
        keyOld = 0;
        return;
    }

    nr = String($(".dsNumber").val()).replace(".", "");

    if (nr == 0) {
        console.log(nr);
        nr = getNextDatasetNumber(0);
    }

    if (key == 37 && keyOld == keyCtrl) {
        let l = globalDatasetNumbers.contentValue.length;
        for (i = 0; i < l; i++) {
            //console.log("l: " + l + "   i: " + i + "   nr: " + globalDatasetNumbers.contentValue[i]["dataset_number"]);
            if (globalDatasetNumbers.contentValue[i]["dataset_number"] == nr) {
                if (i > 0) {
                    //console.log("111 i: " + i + "   nr: " + globalDatasetNumbers.contentValue[i]["dataset_number"]);
                    $(".dsNumber").val(prepareNumber(globalDatasetNumbers.contentValue[i - 1]["dataset_number"]));
                }
                else {
                    //console.log("222 i: " + i + "   nr: " + globalDatasetNumbers.contentValue[i]["dataset_number"]);
                    $(".dsNumber").val(prepareNumber(globalDatasetNumbers.contentValue[l - 1]["dataset_number"]));
                }
                setTimeout(function () {
                    doFetch();
                }, 200);
                break;
            }
        }
        //console.log("Control-right");
    }
    else {
        if (key == 39 && keyOld == keyCtrl) {
            let l = globalDatasetNumbers.contentValue.length;
            for (i = 0; i < l; i++) {
                if (globalDatasetNumbers.contentValue[i]["dataset_number"] == nr) {
                    if (i < (l - 1)) {
                        $(".dsNumber").val(prepareNumber(globalDatasetNumbers.contentValue[i + 1]["dataset_number"]));
                    }
                    else {
                        $(".dsNumber").val(prepareNumber(globalDatasetNumbers.contentValue[0]["dataset_number"]));
                    }
                    setTimeout(function () {
                        doFetch();
                    }, 200);
                    break;
                }
            }
            //console.log("Control-right");
        }
    }
}


export function getNextDatasetNumber(nr) {
    let i;
    for (i = nr; i < globalDatasetNumbers.contentValue.length; i++) {
        let ds = globalDatasetNumbers.contentValue[i]["dataset_number"];
        console.log(ds);
        if (ds != null) {
            $(".dsNumber").val(prepareNumber(ds));
            doFetch();
            return ds;
        }
    }
}


export function doFetch() {
    $(".doButtonFetch").trigger("blur");
    if ($(".doButtonFetch").hasClass('disabled'))
        return;

    let nr = String($(".dsNumber").val()).replace(".", "");

    if (isNaN(parseInt(nr))) {
        setStatusWarning(3, localStorage.getItem("statusDatasetNumberInput"));
        return;
    }

    if (nr > 99999) {
        setStatusWarning(3, localStorage.getItem('dataset') + " " + nr + " " + localStorage.getItem('toLarge'));
        return;
    }

    let pnr = prepareNumber(nr);
    $(".dsNumber").val(pnr);

    if (checkForDataset(nr) == 1) {
        localStorage.setItem("changeDatasetNumber", nr);
        localStorage.setItem("datasetNumber", null);
    }
    else {
        setStatusWarning(3, localStorage.getItem("dataset") + " " + pnr + " " + localStorage.getItem("notFound"));
        return;
    }

    requestDataset(parseInt(nr));
    $(".doButtonDatasetDelete").removeClass('disabled');
    $(".doButtonDatasetSave").removeClass('disabled');
    $(".doButtonDatasetRemember").removeClass('disabled');
    requestComment(nr);
    showDataInForm();
    setDatasetUnchanged();
    localStorage.setItem("lastDatasetNumberUsed", nr);
    $(".statusText3").html(localStorage.getItem("enterData"));
    $(".doButtonDatasetSave").addClass('disabled');
}


function showDataInForm() {
    if (localStorage.getItem("changeDatasetNumber") == null)
        return;

    clearInput();
    let ds = localStorage.getItem("changeDatasetNumber");
    $(".dsNumber").val(prepareNumber(ds));

    //console.log(globalDataset);

    $('.name').val(globalDataset.contentValue[0]["name"]);
    $('.city').val(globalDataset.contentValue[0]["city"]);
    $('.schoolPublisher').val(globalDataset.contentValue[0]["school_publisher"]);
    $('.publishNo').val(globalDataset.contentValue[0]["number"]);

    const strTopic = globalDataset.contentValue[0]["topics_list"];
    const ar = strTopic.split(" ");
    //console.log(ar + "  " + ar.length);
    for (let i = 0; i < ar.length; i++) {
        $(".topic_" + ar[i]).css("backgroundColor", "#00dd00").css("border", "solid 1px #111111");
        localStorage.setItem("checked_topic_" + ar[i], "checked");
    }

    if (globalDataset.contentValue[0]["publisher_is"] == "school") {
        localStorage.setItem("publisherIsOutput", localStorage.getItem("school"));
        localStorage.setItem("publisherIsSave", "school");
        $('.btnradio1').prop("checked", true);
        $('.btnradio2').prop("checked", false);
        $(".schoolLabel").css("backgroundColor", "#007700");
        $(".schoolLabel").css("color", "#ffffff");
        $(".freeLabel").css("backgroundColor", "#ffffff");
        $(".freeLabel").css("color", "#000000");
    }
    else
        if (globalDataset.contentValue[0]["publisher_is"] == "free") {
            localStorage.setItem("publisherIsOutput", localStorage.getItem("free"));
            localStorage.setItem("publisherIsSave", "free");
            $('.btnradio1').prop("checked", false);
            $('.btnradio2').prop("checked", true);
            $(".freeLabel").css("backgroundColor", "#007700");
            $(".freeLabel").css("color", "#ffffff");
            $(".schoolLabel").css("backgroundColor", "#ffffff");
            $(".schoolLabel").css("color", "#000000");
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


export function doDatasetSave() {
    $(".doButtonDatasetSave").trigger("blur");
    if ($(".doButtonDatasetSave").hasClass('disabled'))
        return;

    let nr = String($(".dsNumber").val()).replace(".", "");

    if (nr == 0) {
        setStatusWarning(3, localStorage.getItem("statusDatasetNumberInput"));
        return;
    }

    nr = parseInt(nr);

    if (isNaN(nr)) {
        setStatusWarning(3, localStorage.getItem("statusDatasetNumberInput"));
        $(".doButtonDatasetSave").trigger("blur");
        return;
    }
    $(".dsNumber").val(prepareNumber(nr));

    if (checkForDataset(nr) == 1) {
        localStorage.setItem("changeDatasetNumber", nr);
        $(".modal-body").text(localStorage.getItem("dataset") + " " + prepareNumber(nr) + " " + localStorage.getItem("exists"));
        localStorage.setItem("confirmSaveCancel", 0);
        localStorage.setItem("confirmSaveOverwrite", 0);
        $(".buttonOpenConfirmSaveModal").click();
        localStorage.setItem("datasetNumber", null);
        runForeverConfirmDoSave(1);
    }
    else {
        localStorage.setItem("changeDatasetNumber", null);
        localStorage.setItem("datasetNumber", nr);
        saveDataset();
        requestAllDatasetNumbers();
    }
}


export function doDatasetDelete() {
    $(".doButtonDatasetDelete").trigger("blur");
    if ($(".doButtonDatasetDelete").hasClass('disabled'))
        return;

    let nr = String($(".dsNumber").val()).replace(".", "");
    nr = parseInt(nr);
    let pnr = prepareNumber(nr);

    if (checkForDataset(nr) != 1) {
        setStatusWarning(3, localStorage.getItem("dataset") + " " + pnr + " " + localStorage.getItem("notExists"));
    }
    else {
        $(".modal-body-delete").text(localStorage.getItem("deletingOfDataset") + " " + pnr + " " + localStorage.getItem("confirm"));
        $(".buttonOpenConfirmDeleteModal").click();
        localStorage.setItem("confirmDeleteCancel", 0);
        localStorage.setItem("confirmDelete", 0);
        localStorage.setItem("datasetNumber", nr);
        runForeverConfirmDoDelete(1);
    }
}


export function deleteDataset() {
    let nr = localStorage.getItem("datasetNumber");
    let sqlQuery = "DELETE FROM prolabor.archive_data where dataset_number=" + nr;
    window.electronAPI.sendDataset(sqlQuery);
    setTimeout(() => {
        sqlQuery = "DELETE FROM prolabor.dataset_comments where dataset_number=" + nr;
        window.electronAPI.sendDataset(sqlQuery);
    }, 1000);
    clearInput();
    setToNew();
    setStatusInformation(3, localStorage.getItem("dataset") + " " + prepareNumber(nr) + " " + localStorage.getItem("confirm"));
    setStatus2("");
    requestAllDatasetNumbers();
    $(".doButtonDatasetSave").addClass('disabled');
    $(".doButtonDatasetRemember").addClass('disabled');
}


export function saveDataset() {
    let i;
    let n;
    let el2 = "", el = "";

    setStatusInformationPermanent(3, localStorage.getItem("oneMoment"));
    let cnr = localStorage.getItem("changeDatasetNumber");
    let nr = localStorage.getItem("datasetNumber")

    //console.log("--- cnr: " + cnr);
    //console.log("--- nr: " + nr);

    let sqlQuery, pnr;

    el = el + ",'" + $('.name').val() + "'";
    el = el + ",'" + $('.schoolPublisher').val() + "'";
    el = el + ",'" + $(".dropdownYear").text() + "'";
    el = el + ",'" + $('.publishNo').val() + "'";
    el = el + ",'" + $('.city').val() + "'";
    el = el + ",'" + $(".dropdownState").text() + "'";
    el = el + ",'" + localStorage.getItem("publisherIsSave") + "'";
    //console.log("out: " + localStorage.getItem("publisherIsOutput") + "     Save: " + localStorage.getItem("publisherIsSave"));
    for (n = 0; n < localStorage.getItem("topicHeadlineCnt"); n++) {
        for (i = 0; i < localStorage.getItem("amountTopicsHeadline_" + n); i++) {
            if (localStorage.getItem("checked_topic_" + n + "_" + i) == "checked") {
                el2 = el2 + " " + n + "_" + i;
            }
        }
    }

    var enc = encodeURIComponent($('.comment').val());

    if (nr > 0) {
        //console.log("New: " + nr);
        sqlQuery = "INSERT INTO prolabor.archive_data (dataset_number,name,school_publisher,year,number,city,state,publisher_is,topics_list, timestamp) values(" + nr + el + ",'" + el2.trimStart() + "'," + getMilliseconds1970() + ")";
        window.electronAPI.sendDataset(sqlQuery);

        setTimeout(() => {
            sqlQuery = "INSERT INTO prolabor.dataset_comments (dataset_number, comment) values(" + nr + ",'" + enc + "')";
            window.electronAPI.sendDataset(sqlQuery);
        }, 1000);

        nr = localStorage.getItem("datasetNumber");
        pnr = prepareNumber(nr);
        localStorage.setItem("changeDatasetNumber", null);

        if (nr != 0) {
            setStatusInformation(3, localStorage.getItem("dataset") + " " + pnr + " " + localStorage.getItem("saved"));
            $(".dsNumber").val(prepareNumber(nr));
            localStorage.setItem("datasetNumber", nr);
            $(".doButtonDatasetDelete").removeClass('disabled');
            $(".doButtonDatasetSave").addClass('disabled');
            $(".doButtonDatasetRemember").removeClass('disabled');
        }
        else {
            setStatusWarningPermanent(3, localStorage.getItem("dataset") + " " + prepareNumber(pnr) + " " + localStorage.getItem("notSaved"));
        }
    }
    else {
        if (cnr > 0) {
            //console.log("Change: " + cnr);
            $(".doButtonDatasetSave").addClass('disabled');
            sqlQuery = "DELETE FROM prolabor.archive_data where dataset_number=" + cnr;
            window.electronAPI.sendDataset(sqlQuery);

            setTimeout(() => {
                sqlQuery = "DELETE FROM prolabor.dataset_comments where dataset_number=" + cnr;
                window.electronAPI.sendDataset(sqlQuery);
            }, 1000);

            setTimeout(() => {
                sqlQuery = "INSERT INTO prolabor.archive_data (dataset_number,name,school_publisher,year,number,city,state,publisher_is,topics_list, timestamp) values(" + cnr + el + ",'" + el2.trimStart() + "'," + getMilliseconds1970() + ")";
                window.electronAPI.sendDataset(sqlQuery);
            }, 1500);

            setTimeout(() => {
                sqlQuery = "INSERT INTO prolabor.dataset_comments (dataset_number, comment) values(" + cnr + ",'" + enc + "')";
                window.electronAPI.sendDataset(sqlQuery);
                pnr = prepareNumber(cnr);
                setStatusInformation(3, localStorage.getItem("dataset") + " " + pnr + " " + localStorage.getItem("changed"));
                $(".doButtonDatasetDelete").removeClass('disabled');
                $(".doButtonDatasetRemember").removeClass('disabled');
            }, 2000);
        }
    }
    setDatasetUnchanged();
    setStatus2("Gespeichert");
}


