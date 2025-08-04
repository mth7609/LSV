import { requestAllDatasetNumbers, requestStates, requestTopHeadlines, requestTopicHeadlinesInfo, requestConstValues, requestTopicItems, requestInitValues, requestInfoLabels, requestImages, requestOutputText } from "./ServerRequests.js";
import { globalDatasetNumbers, globalTopicHeadlines, globalTopicItems, globalTopHeadlines } from "./Globals.js";
import { getNextDatasetNumber, checkTab, checkForDataset, doFetch, doDatasetSave, doDatasetDelete, newTab, showDBStatus, doKeydown } from "./RendererScripts_02.js";
import { setStatusWarning, setStatusWarningPermanent, setStatusInformation, setStatus3, setStatus2 } from "./RendererScripts_03.js";

var selectedDropdown = 0;
var elementsOnForm = 1;
var maxDatasetTabs = 10;
var lastTopicName = "null";

let ld = localStorage.getItem("lastDatasetNumberUsed")
localStorage.clear();
localStorage.setItem("lastDatasetNumberUsed", ld);
localStorage.setItem("httpPort", "8089");
localStorage.setItem("tabCount", 0);
localStorage.setItem("selectCnt", 1);
localStorage.setItem("maxDatasetTabs", maxDatasetTabs)
localStorage.setItem("changeDatasetNumber", null);

requestInfoLabels();
requestOutputText();
requestOutputText();
requestInitValues();
requestStates();
requestTopicHeadlinesInfo();
requestTopicItems();
requestTopHeadlines();
requestImages();
requestConstValues();
requestAllDatasetNumbers();

setOutputText();
setYears();
setTopicHeadlines();
setTopHeadlines();
setToLastDatasetUsed();
publisherReset();

$(".doButtonDatasetDelete").removeClass('disabled');
$(".doButtonDatasetRemember").removeClass('disabled');

//console.log(globalDatasetNumbers);

const datasetTopItems = Array.from({ length: maxDatasetTabs + 1 }, () => new Array(elementsOnForm).fill(0));
const datasetTopicsItems = Array.from({ length: maxDatasetTabs + 1 }, () => new Array(elementsOnForm).fill(0));


$(".dropdown-menu li a").on('click', updateValue);
$(".doButtonFetch").on('click', doFetch);
$(".doButtonDatasetRemember").on('click', doDatasetRemember);
$(".doButtonDatasetSave").on('click', doDatasetSave);
$(".doButtonDatasetDelete").on('click', doDatasetDelete);
$(".dropdownState").on('click', stateSel);
$(".dropdownYear").on('click', yearSel);
$(".schoolLabel").on('click', publisherSchool);
$(".freeLabel").on('click', publisherFree);
$(".topicListButtonInput").on('click', topicListButtonClick);
$(".doButtonNew").on('click', doNew);

$(".name").on('focus', setDatasetChanged);
$(".schoolLabel").on('focus', setDatasetChanged);
$(".city").on('focus', setDatasetChanged);
$(".schoolPublisher").on('focus', setDatasetChanged);
$(".publishNo").on('focus', setDatasetChanged);
$(".dropdownYear").on('focus', setDatasetChanged);
$(".dropdownState").on('focus', setDatasetChanged);
$(".freeLabel").on('focus', setDatasetChanged);
$(".comment").on('focus', setDatasetChanged);

$("body").on('keydown', doKeydown);
$("title").text(localStorage.getItem("title"));

// buttons for model dialogs
$(".confirmSaveCancel").on('click', function () {
    localStorage.setItem("confirmSaveCancel", 1);
    localStorage.setItem("confirmSaveOverwrite", 0);
})

$(".confirmSaveOverwrite").on('click', function () {
    localStorage.setItem("confirmSaveCancel", 0);
    localStorage.setItem("confirmSaveOverwrite", 1);
})

$(".confirmDelete").on('click', function () {
    localStorage.setItem("confirmDeleteCancel", 0);
    localStorage.setItem("confirmDelete", 1);
})

$(".confirmDeleteCancel").on('click', function () {
    localStorage.setItem("confirmDeleteCancel", 1);
    localStorage.setItem("confirmDelete", 0);
})


export function setToLastDatasetUsed() {
    let ld = localStorage.getItem("lastDatasetNumberUsed");
    if (ld == 0 || ld == null) {
        $(".dsNumber").val("00.000");
        setToNew();
    }
    else {
        //console.log(ld);
        $(".dsNumber").val(ld);
        doFetch();
    }
}


export function setDatasetChanged() {

    setStatusWarningPermanent(2, localStorage.getItem("changedNotSaved"));
    $(".doButtonDatasetDelete").addClass('disabled');
    $(".doButtonDatasetSave").removeClass('disabled');
    $(".doButtonDatasetRemember").addClass('disabled');
}


export function setDatasetUnchanged() {
    setStatus2(capitalizeFirstLetter(localStorage.getItem("saved"), 0));
    $(".doButtonDatasetDelete").removeClass('disabled');
}


window.electronAPI.getInitDate((value) => {
    localStorage.setItem("initDate", value);
})


window.electronAPI.getDbStatus((value) => {
    console.log("db: " + value);
    showDBStatus(value);
})


window.electronAPI.getFrontPages((value) => {
    if (self.innerWidth > 1600)
        $('.frontImage').html("<img src='./images/" + value + "' width='350px'></img>")
    else
        $('.frontImage').html("");

    //    console.log("nr: " + localStorage.getItem("datasetNumber"));
    //    console.log("cdn: " + localStorage.getItem("changeDatasetNumber"));
    setOtherContent();
})


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


export function getMilliseconds1970() {
    let d = new Date();
    //console.log(d.valueOf());
    return d.valueOf();
}


export function getActualFullDate(millis) {
    let d;
    if (millis)
        d = new Date(millis);
    else
        d = new Date();
    //console.log(d);
    let dow = d.getDay();
    let outDay = "";

    //console.log(dow);
    switch (dow) {
        case 0: outDay = localStorage.getItem("sunday");
            break;
        case 1: outDay = localStorage.getItem("monday");
            break;
        case 2: outDay = localStorage.getItem("tuesday");
            break;
        case 3: outDay = localStorage.getItem("wednesday");
            break;
        case 4: outDay = localStorage.getItem("thursday");
            break;
        case 5: outDay = localStorage.getItem("friday");
            break;
        case 6: outDay = localStorage.getItem("saturday");
            break;
    }

    var day = addZero(d.getDate());
    var month = addZero(d.getMonth() + 1);
    var year = addZero(d.getFullYear());
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());

    //console.log(outDay + "\xa0\xa0\xa0" + day + "." + month + "." + year + "\xa0\xa0\xa0" + h + ":" + m + "\xa0");
    return outDay + "\xa0\xa0\xa0" + day + "." + month + "." + year + "\xa0\xa0\xa0" + h + ":" + m + "\xa0";
}



function setOtherContent() {            // using the front pages ticks
    //$('.statusText2').text(self.innerWidth);
    if (self.innerWidth > 1715) {
        //$('.logoImage').html("<img src='" + localStorage.getItem("image_1") + "'></img>");
        $(".selectButton").css("font-size", "14px");
        $(".selectButton").css.apply;
    }
    else {
        // $('.logoImage').html("");
        $(".selectButton").css("fontSize", "11px");
        $(".selectButton").css.apply;
    }
    $('.statusText4').text(getActualFullDate());
}


function setOutputText() {
    $('.mainWindowHeadlineInput').html(localStorage.getItem("mainWindowHeadlineInput"));
    $('.datasetWindowHeadline').html(localStorage.getItem("datasetWindowHeadline"));
    $('.commentDataset').html('<form method="POST" class="form-horizontal formTop ms-1 me-3 ps-3 pe-3 pt-0 border rounded-4">\
            <label class="col-lg-3 ps-0 pt-2 fixed control-label nowrap commentLabel"></label><br>\
            <textarea class="comment" rows="6" style="width:100%"></textarea></form>');
}

function setTopHeadlines() {
    localStorage.setItem("datasetTopHeadlineCnt", globalTopHeadlines.contentValue.length);
    for (let i = 0; i < localStorage.getItem("datasetTopHeadlineCnt"); i++) {
        localStorage.setItem("mainHeadline_" + globalTopHeadlines.contentValue[i]["arraypos"], globalTopHeadlines.contentValue[i]["names"]);
    }
    $('.nameLabel').html(localStorage.getItem("mainHeadline_0"));
    $('.schoolPublisherLabel').html(localStorage.getItem("mainHeadline_1"));
    $('.yearLabel').html(localStorage.getItem("mainHeadline_5"));
    $('.noLabel').html(localStorage.getItem("mainHeadline_6"));
    $('.cityLabel').html(localStorage.getItem("mainHeadline_2"));
    $('.stateLabel').html(localStorage.getItem("mainHeadline_3"));
    $('.publisherIsLabel').html("<nobr>" + localStorage.getItem("mainHeadline_4") + "</nobr>");
    $('.datasetNrLabel').html(localStorage.getItem("mainHeadline_8"));
    $('.freeLabel').html(localStorage.getItem("free"));
    $('.schoolLabel').html(localStorage.getItem("school"));
    $('.doButtonDatasetRemember').val(localStorage.getItem("mainHeadline_9"));
    $('.doButtonDatasetSave').val(localStorage.getItem("mainHeadline_10"));
    $('.doButtonDatasetDelete').val(localStorage.getItem("mainHeadline_11"));
    $('.commentLabel').html(localStorage.getItem("mainHeadline_7"));
    $('.doButtonNew').val(localStorage.getItem("mainHeadline_13"));
    $('.doButtonFetch').val(localStorage.getItem("mainHeadline_12"));
    $('.logoImage').html("<img src='" + localStorage.getItem("image_1") + "'></img>");
}



function topicListButtonClick() {
    var topicName = this.attributes[4].value;
    //console.log(topicName + "    " + $(`#${topicName}`).prop("checked") + "    " + lastTopicName);
    globalTopicItems[this.attributes[2].value].contentValue[this.attributes[3].value]["active"] = true;
    localStorage.setItem("checked_" + topicName, "checked");

    $("." + topicName).trigger("focus");

    if (topicName == lastTopicName) {
        $("." + topicName).prop("checked", false);
        lastTopicName = "null";
        $("." + topicName).css("backgroundColor", "#660000").css("border", "solid 1px #111111");
        globalTopicItems[this.attributes[2].value].contentValue[this.attributes[3].value]["active"] = false;
        localStorage.setItem("checked_" + topicName, "unchecked");
    }
    else {
        $("." + topicName).css("backgroundColor", "#00dd00").css("border", "solid 1px #111111");
        lastTopicName = topicName;
    }
    $("." + topicName).trigger("blur");
    setDatasetChanged();
}


export function setTopicHeadlines() {
    localStorage.setItem("topicHeadlineCnt", globalTopicHeadlines.contentValue.length);
    for (let i = 0; i < globalTopicHeadlines.contentValue.length; i++) {
        let el = 'topicHeadline_' + i;
        $("." + el).html(globalTopicHeadlines.contentValue[i]['headline']);
        localStorage.setItem("amountTopicsHeadline_" + i, globalTopicHeadlines.contentValue[i]['amount_topics']);
        setTopicItems(i);
    }
}

export function setTopicItems(nr) {
    let i, n;
    let el = "";
    for (i = 0; i < globalTopicItems[nr].contentValue.length; i++) {
        el = el + "<nobr><input type='radio' class='form-check-input topicListButtonInput topic_" + nr + "_" + i + "' topicListNo='" + nr + "' topicNoInList='" + i + "' id='topic_" + nr + "_" + i + "'>\n \
                  <label class='form-check-label topicListLabel topicLabel_" + nr + "_" + i + "' id='topicLabel_" + nr + "_" + i + "'>" + globalTopicItems[nr].contentValue[i]["text"] + "</label><br>\n";
    }
    $('.topicList_' + nr).html(el);

    for (n = 0; n < globalTopicHeadlines.contentValue.length; n++) {            // copy the item headlines and the items from DB objects to local storage
        localStorage.setItem("topicHeadline_" + n, globalTopicHeadlines.contentValue[n]['headline']);
        for (i = 0; i < globalTopicItems[n].contentValue.length; i++) {
            localStorage.setItem("topic_" + n + "_" + i, globalTopicItems[n].contentValue[i]["text"]);
        }
    }
}


function publisherSchool(str) {
    localStorage.setItem("publisherIsOutput", localStorage.getItem("school"));
    localStorage.setItem("publisherIsSave", "school");
    $(".freeLabel").css("backgroundColor", "#ffffff");
    $(".freeLabel").css("color", "#000000");
    $(".schoolLabel").css("backgroundColor", "#007700");
    $(".schoolLabel").css("color", "#ffffff");
    setDatasetChanged();
    //console.log("out: " + localStorage.getItem("publisherIsOutput") + "     Save: " + localStorage.getItem("publisherIsSave"));
}

function publisherFree(str) {
    localStorage.setItem("publisherIsOutput", localStorage.getItem("free"));
    localStorage.setItem("publisherIsSave", "free");
    $(".freeLabel").css("backgroundColor", "#007700");
    $(".freeLabel").css("color", "#ffffff");
    $(".schoolLabel").css("backgroundColor", "#ffffff");
    $(".schoolLabel").css("color", "#000000");
    setDatasetChanged();
    //console.log("out: " + localStorage.getItem("publisherIsOutput") + "     Save: " + localStorage.getItem("publisherIsSave"));
}

function publisherReset() {
    localStorage.setItem("publisherIsOutput", "");
    localStorage.setItem("publisherIsSave", "");
    $(".schoolLabel").css("backgroundColor", "#ffffff");
    $(".freeLabel").css("backgroundColor", "#ffffff");
}

function stateSel(str) {
    selectedDropdown = 1;
}

function stateReset() {
    $(".dropdownState").text("...");
}

function yearSel(str) {
    selectedDropdown = 2;
}


function updateValue(str) {
    var selText = $(this).text();

    if (selectedDropdown == 1) {
        $(".dropdownState").text(selText);
    }

    if (selectedDropdown == 2) {
        $(".dropdownYear").text(selText);
    }
}

function setYears() {
    let str = "";
    let i;
    let d = new Date();

    for (i = 1945; i <= d.getFullYear(); i++) {
        str = str + "<li><a class='dropdown-item' href='#'>" + i + "</a></li>";
    }
    $(".years").html(str);
}



export function prepareNumber(nr) {
    let str = nr.toString();
    let strLen = str.length;
    let res1;

    switch (strLen) {
        case 1: res1 = "00.00" + str;
            break;
        case 2: res1 = "00.0" + str;
            break;
        case 3: res1 = "00." + str;
            break;
        case 4: res1 = "0" + str.substr(0, 1) + "." + str.substr(1, 3);
            break;
        case 5: res1 = str.substr(0, 2) + "." + str.substr(2, 3);
            break;
        default: res1 = "Too large";
    }

    return res1;
}


function yearReset() {
    $(".dropdownYear").text("...");
}


export function setToNew() {
    $(".statusbar3").css("color", "#000000");
    $(".statusbar3").css("background-color", "#c2e2ec");
    $(".doButtonDatasetDelete").addClass('disabled');
    $(".doButtonDatasetSave").addClass('disabled');
    $(".doButtonDatasetRemember").addClass('disabled');
    localStorage.setItem("changeDatasetNumber", null);
    localStorage.setItem("datasetNumber", null);
    setStatus3(localStorage.getItem("enterData"));
}


export function doNew() {
    clearInput();
    setToNew();
    //setDatasetUnchanged();
    $(".doButtonNew").trigger("blur");
}


export function clearInput() {
    let i, n;

    let formTop = document.querySelector('.formTop');
    formTop.reset();
    publisherReset();
    yearReset();
    stateReset();
    $(".dsNumber").val("00.000");

    for (n = 0; n < localStorage.getItem("topicHeadlineCnt"); n++) {
        for (i = 0; i < localStorage.getItem("amountTopicsHeadline_" + n); i++) {
            localStorage.removeItem("checked_topic_" + n + "_" + i);
            $(".topic_" + n + "_" + i).prop("checked", false);
            $(".topic_" + n + "_" + i).css("backgroundColor", "#660000").css("border", "solid 1px #111111");
        }
    }
    $('.comment').val("");
}


export function doDatasetRemember() {
    if ($(".doButtonDatasetRemember").hasClass('disabled'))
        return;

    $(".doButtonDatasetRemember").trigger("blur");

    let selectCnt = localStorage.getItem("selectCnt");
    // console.log("1 cnt: " + selectCnt);

    if (selectCnt > maxDatasetTabs) {
        setStatusWarning(3, "Merkliste voll");
        $(".doButtonDatasetRemember").addClass('disabled');
        return;
    }

    let datasetNumber = String($(".dsNumber").val()).replace(".", "");
    datasetNumber = parseInt(datasetNumber);
    let pnr = prepareNumber(datasetNumber);

    if (checkTab(pnr) == true) {
        setStatusWarning(3, "Zeitschrift schon auf Merkliste");
        return;
    }

    if (isNaN(datasetNumber)) {
        setStatusWarning(3, "Bitte Datensatznummer eingeben");
        return;
    }

    if (checkForDataset(datasetNumber) == 0) {
        setStatusWarning(3, localStorage.getItem('dataset') + " " + datasetNumber + " " + localStorage.getItem('notFound'));
        return;
    }

    datasetTopItems[selectCnt][0] = $('.name').val();        // Save top item values in the top-item dataset array (not local storage)
    datasetTopItems[selectCnt][1] = $('.schoolPublisher').val();
    datasetTopItems[selectCnt][2] = $('.city').val();
    datasetTopItems[selectCnt][3] = $(".dropdownState").text();
    datasetTopItems[selectCnt][4] = localStorage.getItem("publisherIsOutput");
    datasetTopItems[selectCnt][5] = $(".dropdownYear").text();
    datasetTopItems[selectCnt][6] = $('.publishNo').val();
    datasetTopItems[selectCnt][7] = $('.comment').val();

    let i = 0, n = 0, itemCnt = 0;

    for (n = 0; n < globalTopicHeadlines.contentValue.length; n++) {        // Save selected topics in the topics dataset array
        for (i = 0; i < globalTopicItems[n].contentValue.length; i++) {
            if (localStorage.getItem("checked_topic_" + n + "_" + i) == "checked") {
                datasetTopicsItems[selectCnt][itemCnt] = "topic_" + n + "_" + i;  // Saved for use in range select
                itemCnt++;
            }
        }
    }

    for (i = 0; i < localStorage.getItem("datasetTopItemCount"); i++) {        // Save visible top dataset values to local storage
        localStorage.setItem("datasetItem_" + i, datasetTopItems[selectCnt][i]);
    }

    localStorage.setItem("datasetItem_7", datasetTopItems[selectCnt][7]); // Special handling for comment
    let datasetFileName = "./Dataset_" + selectCnt + ".html";

    //console.log("2 cnt: " + selectCnt + ",  maxDatasetTabs: " + maxDatasetTabs + "  datasetFile: " + datasetFileName);

    localStorage.setItem("datasetWindowSubheadline", pnr.toString());

    let ii = getFreeTab();
    selectCnt = ii;

    newTab(selectCnt, datasetFileName, pnr);
    selectCnt++;
    //console.log("3 cnt: " + selectCnt);
    localStorage.setItem("selectCnt", selectCnt);
    setStatusInformation(3, localStorage.getItem("dataset") + " " + prepareNumber(datasetNumber) + " " + localStorage.getItem("remembered"));
}

function getFreeTab() {
    let i;
    for (i = 1; i <= localStorage.getItem("maxDatasetTabs"); i++) {
        if (!$(".navtab-" + i).text())
            return i;
    }
}

export function capitalizeFirstLetter(str, nr) {
    const capitalized = str.charAt(nr).toUpperCase() + str.slice(nr + 1);
    return capitalized;
}
