import { getActualFullDate, setDatasetUnchanged, prepareNumber, clearInput, setToNew } from "./RendererScripts_01.js";
import { setStatusWarning, setStatusWarningPermanent, setStatusTodoPermanent, setStatusInformation, setStatusInformationPermanent, setStatus1, setStatus3, setStatus2 } from "./RendererScripts_03.js";
import { requestCheckDatasetNumber, requestDataset, requestComment } from "./ServerRequests.js";
import { globalDataset } from "./Globals.js";
import { runForeverConfirmDoSave } from "./RendererScripts_03.js";


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
        setStatus1(localStorage.getItem("dbConnected") + '  ->  ' + localStorage.getItem("mysqlHost") + ":" + localStorage.getItem("mysqlPort"));
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
}


export function newTab(nr, link, name) {
    $(".nav").append('<button class="nav-link navtabCSS navtab-' + nr + '" data-bs-toggle="tab" data-bs-target="#cnt-' + nr + '" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">' + name + '</button>');
    $(".tab-content").append('<div class="tab-pane tab-' + nr + '" id="cnt-' + nr + '" role="tabpanel" aria-labelledby="nav-home-tab">' + name + '</div >');
    $(".tab-content").after('<script>$(".tab-' + nr + '").load("' + link + '")</script>');

    setTabActive(0);

    $(".navtab-" + nr).on('click', function (event) {
        //$(".tab-" + nr).load('" + link + "');
        //console.log("Tab clicked: " + nr + "   :   Link: " + link);
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
}


export function checkTab(pnr) {
    let i;
    for (i = 0; i < localStorage.getItem("maxDatasetTabs"); i++) {
        if ($(".navtab-" + i).text() === pnr) {
            //setStatus3Warning("Datensatz schon in Merkliste");
            return true;
        }
    }
    if (i == localStorage.getItem("maxDatasetTabs"))
        return false;
    else
        return true;
}


export function checkForDataset(nr) {
    requestCheckDatasetNumber(nr);
    return localStorage.getItem(nr);
}


export function doFetch() {
    $(".doButtonFetch").trigger("blur");
    if ($(".doButtonFetch").hasClass('disabled'))
        return;

    let nr = String($(".dsNumber").val()).replace(".", "");

    if (isNaN(parseInt(nr))) {
        setStatusWarning(3, "Bitte Datensatznummer eingeben");
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

    /*  if (globalDataset.content != null) {
          $(".dsNumber").val(pnr);
          setStatus3("Datensatz " + pnr + " ändern");
          $(".doButtonDatasetDelete").removeClass('disabled');
          $(".doButtonDatasetSave").removeClass('disabled');
          $(".doButtonDatasetRemember").removeClass('disabled');
      }
      else {
          setStatusWarning(3, localStorage.getItem("newDataset"));
          localStorage.setItem("changeDatasetNumber", null);
          localStorage.setItem("datasetNumber", nr);
          $(".doButtonDatasetDelete").addClass('disabled');
      }
          */

    $(".doButtonDatasetDelete").removeClass('disabled');
    $(".doButtonDatasetSave").removeClass('disabled');
    $(".doButtonDatasetRemember").removeClass('disabled');
    requestComment(nr);
    showDataInForm();
    setDatasetUnchanged();
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
        $(".schoolLabel").css("backgroundColor", "#00bb00");
        $('.btnradio2').prop("checked", false);
    }
    else
        if (globalDataset.contentValue[0]["publisher_is"] == "free") {
            localStorage.setItem("publisherIsOutput", localStorage.getItem("free"));
            localStorage.setItem("publisherIsSave", "free");
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


export function doDatasetSave() {
    $(".doButtonDatasetSave").trigger("blur");
    if ($(".doButtonDatasetSave").hasClass('disabled'))
        return;

    let nr = String($(".dsNumber").val()).replace(".", "");
    nr = parseInt(nr);

    if (isNaN(nr)) {
        setStatusWarning(3, "Bitte Datensatznummer eingeben");
        $(".doButtonDatasetSave").trigger("blur");
        return;
    }
    $(".dsNumber").val(prepareNumber(nr));

    if (checkForDataset(nr) == 1) {
        localStorage.setItem("changeDatasetNumber", nr);
        $(".modal-body").text("Der Datensatz " + prepareNumber(nr) + " ist vorhanden.");
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
    }
}


export function doDatasetDelete() {
    $(".doButtonDatasetDelete").trigger("blur");
    if ($(".doButtonDatasetDelete").hasClass('disabled'))
        return;

    let nr = String($(".dsNumber").val()).replace(".", "");
    let sqlQuery = "DELETE FROM prolabor.archive_data where dataset_number=" + nr;
    window.electronAPI.sendDataset(sqlQuery);
    setTimeout(() => {
        sqlQuery = "DELETE FROM prolabor.dataset_comments where dataset_number=" + nr;
        window.electronAPI.sendDataset(sqlQuery);
    }, 1000);
    clearInput();
    setToNew();
    setStatusInformation(3, "Datensatz " + nr + " gelöscht");
    setStatus2("");
    $(".doButtonDatasetSave").addClass('disabled');
    $(".doButtonDatasetRemember").addClass('disabled');
}


export function saveDataset() {
    let i;
    let n;
    let el2 = "", el = "";

    setStatusInformationPermanent(3, "Einen Moment...");
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
    console.log("out: " + localStorage.getItem("publisherIsOutput") + "     Save: " + localStorage.getItem("publisherIsSave"));
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
        sqlQuery = "INSERT INTO prolabor.archive_data (dataset_number,name,school_publisher,year,number,city,state,publisher_is,topics_list, timestamp) values(" + nr + el + ",'" + el2.trimStart() + "','" + getActualFullDate() + "')";
        window.electronAPI.sendDataset(sqlQuery);

        setTimeout(() => {
            sqlQuery = "INSERT INTO prolabor.dataset_comments (dataset_number, comment) values(" + nr + ",'" + enc + "')";
            window.electronAPI.sendDataset(sqlQuery);
        }, 1000);

        nr = localStorage.getItem("datasetNumber");
        pnr = prepareNumber(nr);
        localStorage.setItem("changeDatasetNumber", null);

        if (nr != 0) {
            setStatusInformation(3, "Datensatz " + pnr + " gespeichert");
            $(".dsNumber").val(prepareNumber(nr));
            localStorage.setItem("datasetNumber", nr);
            $(".doButtonDatasetDelete").removeClass('disabled');
            $(".doButtonDatasetSave").removeClass('disabled');
            $(".doButtonDatasetRemember").removeClass('disabled');
        }
        else {
            setStatusWarningPermanent(3, "Datensatz " + prepareNumber(pnr) + " NICHT gespeichert");
        }
    }
    else {
        if (cnr > 0) {
            //console.log("Change: " + cnr);
            sqlQuery = "DELETE FROM prolabor.archive_data where dataset_number=" + cnr;
            window.electronAPI.sendDataset(sqlQuery);

            setTimeout(() => {
                sqlQuery = "DELETE FROM prolabor.dataset_comments where dataset_number=" + cnr;
                window.electronAPI.sendDataset(sqlQuery);
            }, 1000);

            setTimeout(() => {
                sqlQuery = "INSERT INTO prolabor.archive_data (dataset_number,name,school_publisher,year,number,city,state,publisher_is,topics_list, timestamp) values(" + cnr + el + ",'" + el2.trimStart() + "','" + getActualFullDate() + "')";
                window.electronAPI.sendDataset(sqlQuery);
            }, 1500);

            setTimeout(() => {
                sqlQuery = "INSERT INTO prolabor.dataset_comments (dataset_number, comment) values(" + cnr + ",'" + enc + "')";
                window.electronAPI.sendDataset(sqlQuery);
                pnr = prepareNumber(cnr);
                setStatusInformation(3, "Datensatz " + pnr + " geändert");
                $(".doButtonDatasetDelete").removeClass('disabled');
                $(".doButtonDatasetSave").addClass('disabled');
                $(".doButtonDatasetRemember").removeClass('disabled');
            }, 2000);
        }
    }
    setDatasetUnchanged();
    setStatus2("Gespeichert");
}


