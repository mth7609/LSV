import { requestStates, requestTopHeadlines, requestTopicHeadlinesInfo, requestConstValues, requestTopicItems, requestInitValues, requestInfoLabels, requestImages, requestOutputText } from "./ServerRequests.js";
import { globalTopicHeadlines, globalTopicItems, globalInfoLabels, globalTopHeadlines } from "./Globals.js";
import { showDBStatus, newTab } from "./RendererScripts_02.js";


var selectedDropdown = 0;
var publisherIs = "";
let selectCnt = 1;
var elementsOnForm = 1;
var maxDatasetTabs = 10;
var lastTopicName = "null";

localStorage.clear();
localStorage.setItem("httpPort", "8088");
localStorage.setItem("tabCount", 0);
localStorage.setItem("selectCnt", selectCnt);
localStorage.setItem("maxDatasetTabs", maxDatasetTabs)

//requestDBStatus(); // close app if no running DB
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

setOutputText();
setYears();
setTopicHeadlines();
setTopHeadlines();
publisherReset();




const datasetTopItems = Array.from({ length: maxDatasetTabs + 1 }, () => new Array(elementsOnForm).fill(0));
const datasetTopicsItems = Array.from({ length: maxDatasetTabs + 1 }, () => new Array(elementsOnForm).fill(0));

$(".dropdown-menu li a").on('click', updateValue);
$(".selectButtonSave").on('click', doDataset);
$(".dropdownState").on('click', stateSel);
$(".dropdownYear").on('click', yearSel);
$(".schoolLabel").on('click', publisherSchool);
$(".freeLabel").on('click', publisherFree);
$(".topicListButtonInput").on('click', topicListButtonClick);
$(".doReset").on('click', resetClick);
$("title").text(localStorage.getItem("title"));


window.electronAPI.getStatus1((value) => {
    showDBStatus(value);
})


window.electronAPI.getFrontPages((value) => {
    //console.log(value);
    if (self.innerWidth > 1600)
        $('.frontImage').html("<img src='./images/" + value + "' width='350px'></img>")
    else
        $('.frontImage').html("");

    setOtherContent();
})


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getActualFullDate() {
    var d = new Date();
    var day = addZero(d.getDate());
    var month = addZero(d.getMonth() + 1);
    var year = addZero(d.getFullYear());
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    return day + "." + month + "." + year + " (" + h + ":" + m + ")";
}



function setOtherContent() {            // using the front pages ticks
    if (self.innerWidth > 1200) {
        $('.infoLabel').html('<form method="POST" class="form-horizontal formTop ms-1 me-3 ps-3 pe-3 pt-0 border rounded-4">\
            <label class="col-form-label infoLabel">'+ globalInfoLabels.contentValue[0]["text"] + '</label></form>');
        $('.logoImage').html("<img src='" + localStorage.getItem("image_1") + "'></img>");
    }
    else {
        $('.infoLabel').html("");
        $('.logoImage').html("");
    }

    $('.statusText2').text(getActualFullDate());
}


function setOutputText() {
    $('.mainWindowHeadlineInput').html(localStorage.getItem("mainWindowHeadlineInput"));
    $('.datasetWindowHeadline').html(localStorage.getItem("datasetWindowHeadline"));
    if (self.innerWidth > 1200) {
        $('.infoLabel').html('<form method="POST" class="form-horizontal formTop ms-1 me-3 ps-3 pe-3 pt-0 border rounded-4">\
            <label class="col-form-label infoLabel">'+ globalInfoLabels.contentValue[0]["text"] + '</label></form>');
    }
    else
        $('.infoLabel').html("");

}

function setTopHeadlines() {

    localStorage.setItem("datasetTopHeadlineCnt", globalTopHeadlines.contentValue.length);
    console.log(localStorage.getItem("datasetTopHeadlineCnt"));
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
    $('.selectButtonSave').val(localStorage.getItem("mainHeadline_10"));
    $('.selectButtonSaveDB').val(localStorage.getItem("mainHeadline_11"));
    $('.logoImage').html("<img src='" + localStorage.getItem("image_1") + "'></img>");
}

function resetClick() {
    //    localStorage.setItem("selectCnt", 1);
    //    selectCnt = 1;
    let i;
    let formTop;
    let n;
    formTop = document.querySelector('.formTop');
    formTop.reset();
    publisherReset();
    yearReset();
    stateReset();

    for (n = 0; n < localStorage.getItem("topicHeadlineCnt"); n++) {
        for (i = 0; i < localStorage.getItem("amountTopicsHeadline_" + n); i++) {
            localStorage.removeItem("checked_topic_" + n + "_" + i);
            $(".topic_" + n + "_" + i).prop("checked", false);
            $(".topic_" + n + "_" + i).css("backgroundColor", "#056289");
        }
    }

    $(".doReset").trigger("blur");
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
        $("." + topicName).css("backgroundColor", "#056289");
        globalTopicItems[this.attributes[2].value].contentValue[this.attributes[3].value]["active"] = false;
        localStorage.setItem("checked_" + topicName, "unchecked");
    }
    else {
        $("." + topicName).css("backgroundColor", "#00ee00");
        lastTopicName = topicName;
    }
    $("." + topicName).trigger("blur");

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

export function changeStatus1(str) {
    $(".statusText1").html(str);
}

export function changeStatus2(str) {
    $(".statusText2").html(str);
}

export function changeStatus3(str) {
    $(".statusText3").html("&nbsp; " + str);
}


function publisherSchool(str) {
    publisherIs = localStorage.getItem("school");
    $(".freeLabel").css("backgroundColor", "#ffffff");
    $(".schoolLabel").css("backgroundColor", "#00ffff");
    $(".schoolLabel").css("color", "#000000");
}

function publisherFree(str) {
    publisherIs = localStorage.getItem("free");
    $(".freeLabel").css("backgroundColor", "#00ffff");
    $(".freeLabel").css("color", "#000000");
    $(".schoolLabel").css("backgroundColor", "#ffffff");
}

function publisherReset() {
    publisherIs = "";
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

function yearReset() {
    $(".dropdownYear").text("...");
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


function prepareNumber(nr) {
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
        default: res1 = "Number too large";
    }

    //console.log(res1);
    return res1;
}


function doDataset() {

    if (selectCnt > maxDatasetTabs) {
        alert("Maximale Anzahl (10) der gemerkten Datensätze erreicht.\n\nBitte kontrollieren und Speichern.");
        return;
    }

    /*    prepareNumber(1);
        prepareNumber(12);
        prepareNumber(123);
        prepareNumber(1234);
        prepareNumber(12345);
    */

    datasetTopItems[selectCnt][0] = $('.name').val();        // Save top item values in the top-item dataset array (not local storage)
    datasetTopItems[selectCnt][1] = $('.schoolPublisher').val();
    datasetTopItems[selectCnt][2] = $('.city').val();
    datasetTopItems[selectCnt][3] = $(".dropdownState").text();
    datasetTopItems[selectCnt][4] = publisherIs;
    datasetTopItems[selectCnt][5] = $(".dropdownYear").text();
    datasetTopItems[selectCnt][6] = $('.publishNo').val();

    let i = 0, n = 0, itemCnt = 0;

    localStorage.setItem("selectCnt", selectCnt);

    for (n = 0; n < globalTopicHeadlines.contentValue.length; n++) {        // Save selected topics in the topics dataset array
        for (i = 0; i < globalTopicItems[n].contentValue.length; i++) {
            if (localStorage.getItem("checked_topic_" + n + "_" + i) == "checked") {
                datasetTopicsItems[selectCnt][itemCnt] = "topic_" + n + "_" + i;  // Saved for use in range select
                itemCnt++;
            }
        }
    }

    for (i = 0; i < localStorage.getItem("datasetTopItemCount"); i++) {        // Save top dataset values to local storage
        localStorage.setItem("datasetItem_" + i, datasetTopItems[selectCnt][i]);
    }

    let datasetNumber = localStorage.getItem("datasetNumber");
    datasetNumber++;
    let nr = prepareNumber(datasetNumber);
    localStorage.setItem("datasetNumber", datasetNumber)
    let datasetFileName = "./Dataset_" + selectCnt + ".html";

    console.log("cnt: " + selectCnt + ",  maxDatasetTabs: " + maxDatasetTabs + "  datasetFile: " + datasetFileName);

    localStorage.setItem("datasetWindowSubheadline", "Nr.: " + nr);

    $(".navtab-" + selectCnt).text(nr);
    newTab(selectCnt, datasetFileName, nr);
    selectCnt++;

    $(".selectButtonSave").trigger("blur");

}

