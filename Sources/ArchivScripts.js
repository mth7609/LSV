import { getDBStatus, getStates, getTopicHeadlinesInfo, getTopicItems, getInitValues } from "./HTTPRequests.js";
import { globalTopicHeadlines, globalStates, globalTopicItems, globalTopHeadlines } from "./Globals.js";

var selectedDropdown = 0;
var publisherIs = "";
let searchCnt = 1;
let itemCnt = 1;
var elementsOnForm = 1;
var maxSearchSets = 10;
var maxReached = false;
var lastTopicName = "null";

getInitValues();
getDBStatus();
changeRange(searchCnt);
setYears();
getStates();
getTopicHeadlinesInfo();
getTopicItems();
setTopicHeadlines();
setTopHeadlines();
setOutputText();

const searchTopItems = Array.from({ length: maxSearchSets + 1 }, () => new Array(elementsOnForm).fill(0));
const searchTopicsItems = Array.from({ length: maxSearchSets + 1 }, () => new Array(elementsOnForm).fill(0));

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$(".dropdown-menu li a").on('click', updateValue);
$(".doSearch").on('click', doSearch);
$("#dropdownState").on('click', stateSel);
$("#dropdownYear").on('click', yearSel);
$("#btnradio1").on('click', publisherSchool);
$("#btnradio2").on('click', publisherFree);
$(".searchRange").on('click', updateRange);
$(".topicListButton").on('click', topicListButtonClick);
$(".doReset").on('click', resetClick);


function setOutputText() {
    $('.mainWindowHeadline').html(localStorage.getItem("mainWindowHeadline"));
    $('.searchWindowHeadline').html(localStorage.getItem("searchWindowHeadline"));
}

function setTopHeadlines() {
    $('.nameLabel').html(localStorage.getItem("mainHeadline_0"));
    $('.schoolPublisherLabel').html(localStorage.getItem("mainHeadline_1"));
    $('.yearLabel').html(localStorage.getItem("mainHeadline_5"));
    $('.noLabel').html(localStorage.getItem("mainHeadline_6"));
    $('.cityLabel').html(localStorage.getItem("mainHeadline_2"));
    $('.stateLabel').html(localStorage.getItem("mainHeadline_3"));
    $('.publisherIsLabel').html("<nobr>" + localStorage.getItem("mainHeadline_4") + "</nobr>");
    $('.resultLabel').html(localStorage.getItem("mainHeadline_7"));
    $('.freeLabel').html(localStorage.getItem("free"));
    $('.schoolLabel').html(localStorage.getItem("school"));
    $('.doSearch').val(localStorage.getItem("search"));
}

function resetClick() {
    //    localStorage.setItem("searchCount", 1);
    //    searchCnt = 1;
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
            $("#topic_" + n + "_" + i).prop("checked", false);
            $("#topic_" + n + "_" + i).css("backgroundColor", "#056289");
        }
    }

    window.electronAPI.closeSearchProcess();
    $(".doReset").trigger("blur");
}

function topicListButtonClick() {
    var topicName = this.attributes[4].value;

    //console.log(topicName + "    " + $(`#${topicName}`).prop("checked") + "    " + lastTopicName);
    globalTopicItems[this.attributes[2].value].contentValue[this.attributes[3].value]["active"] = true;
    localStorage.setItem("checked_" + topicName, "checked");

    $(`#${topicName}`).trigger("focus");

    if (topicName == lastTopicName) {
        $(`#${topicName}`).prop("checked", false);
        lastTopicName = "null";
        $(`#${topicName}`).css("backgroundColor", "#056289");
        globalTopicItems[this.attributes[2].value].contentValue[this.attributes[3].value]["active"] = false;
        localStorage.setItem("checked_" + topicName, "unchecked");
    }
    else {
        $(`#${topicName}`).css("backgroundColor", "#00ee00");
        lastTopicName = topicName;
    }
    $(`#${topicName}`).trigger("blur");

}


function updateRange(str) {
    let n, i, k;

    $('#dropdownState').html(searchTopItems[$(".searchRange").val()][3]);
    $('#dropdownYear').html(searchTopItems[$(".searchRange").val()][5]);

    if (searchTopItems[$(".searchRange").val()][4] == "Frei") {
        $('#btnradio1').prop("checked", false);
        $('#btnradio2').prop("checked", true);
    }
    else
        if (searchTopItems[$(".searchRange").val()][4] == "Schule") {
            $('#btnradio1').prop("checked", true);
            $('#btnradio2').prop("checked", false);
        }
        else {
            $('#btnradio1').prop("checked", false);
            $('#btnradio2').prop("checked", false);
        }

    $('#name').val(searchTopItems[$(".searchRange").val()][0]);
    $('#schoolPublisher').val(searchTopItems[$(".searchRange").val()][1]);
    $('#city').val(searchTopItems[$(".searchRange").val()][2]);
    $('#publishNo').val(searchTopItems[$(".searchRange").val()][6]);

    for (n = 0; n < localStorage.getItem("topicHeadlineCnt"); n++) {        // reset topics
        for (i = 0; i < localStorage.getItem("amountTopicsHeadline_" + n); i++) {
            $("#topic_" + n + "_" + i).css("backgroundColor", "#056289").css("border", "solid 2px #111111");
            localStorage.setItem("checked_" + "topic_" + n + "_" + i, "unchecked");  alles auf unchecked ist hier nicht die Lösung
        }
    }

    for (i = 0; i < 32; i++) {
        if (searchTopicsItems[$(".searchRange").val()][i]) {                // set saved topics according to the range position
            $("#" + searchTopicsItems[$(".searchRange").val()][i]).css("backgroundColor", "#00ee00").css("border", "solid 2px #111111");
        }
    }

    for (i = 0; i < localStorage.getItem("searchTopItemCnt"); i++) {
        localStorage.setItem("searchItem_" + i, searchTopItems[$(".searchRange").val()][i]);
    }

    changeStatus3(" " + localStorage.getItem("statusSearchEntry") + " " + $(".searchRange").val());

    localStorage.setItem("searchCount", $(".searchRange").val());

    window.electronAPI.openSearchProcess();

}

export function setTopicHeadlines() {
    let i;
    for (i = 0; i < globalTopicHeadlines.contentValue.length; i++) {
        var el = 'topicHeadline_' + i;
        let r = document.getElementById(el);
        r.innerText = globalTopicHeadlines.contentValue[i]['headline'];
        localStorage.setItem("amountTopicsHeadline_" + i, globalTopicHeadlines.contentValue[i]['amount_topics']);
        setTopicItems(i)
    }
}

export function setTopicItems(nr) {
    let i, n;
    let el = "";
    for (i = 0; i < globalTopicItems[nr].contentValue.length; i++) {
        el = el + "<nobr><input type='radio' class='form-check-input topicListButton  topic_" + nr + "_" + i + "' topicListNo='" + nr + "' topicNoInList='" + i + "' id='topic_" + nr + "_" + i + "'>\n \
                  <label class='form-check-label topicListLabel topicLabel_" + nr + "_" + i + "' id='topicLabel_" + nr + "_" + i + "'>" + globalTopicItems[nr].contentValue[i]["text"] + "</label><br>\n";
    }
    $('#topicList_' + nr).html(el);

    for (n = 0; n < globalTopicHeadlines.contentValue.length; n++) {            // copy the item headlines and the items from DB objects to local storage
        localStorage.setItem("topicHeadline_" + n, globalTopicHeadlines.contentValue[n]['headline']);
        for (i = 0; i < globalTopicItems[n].contentValue.length; i++) {
            localStorage.setItem("topic_" + n + "_" + i, globalTopicItems[n].contentValue[i]["text"]);
        }
    }
}

export function changeStatus1(str) {
    let r = document.getElementById('statusText1');
    r.innerText = str;
}

export function changeStatus2(str) {
    let r = document.getElementById('statusText2');
    r.innerText = str;
}

export function changeStatus3(str) {
    let r = document.getElementById('statusText3');
    r.innerText = str;
}

function changeRange(str) {
    let r = document.getElementById('searchRange');
    r.attributes[3].value = str;
    r.value = str;
}

function publisherSchool(str) {
    publisherIs = "Schule";
    $(".freeLabel").css("backgroundColor", "#ffffff");
    $(".schoolLabel").css("backgroundColor", "#00ffff");
    $(".schoolLabel").css("color", "#000000");
}

function publisherFree(str) {
    publisherIs = "Frei";
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
    document.querySelector('.dropdownState').innerText = "...";
}

function yearSel(str) {
    selectedDropdown = 2;
}

function yearReset() {
    document.querySelector('.dropdownYear').innerText = "...";
}

function updateValue(str) {
    var selText = $(this).text();

    if (selectedDropdown == 1) {
        document.querySelector('.dropdownState').innerText = selText;
    }

    if (selectedDropdown == 2) {
        document.querySelector('.dropdownYear').innerText = selText;
    }
}

function setYears() {
    let str = "";
    var i;
    for (i = 1945; i <= 2025; i++) {
        str = str + "<li><a class='dropdown-item' href='#'>" + i + "</a></li>";
    }
    document.getElementById("years").innerHTML = str;
}

function doSearch() {
    searchTopItems[searchCnt][0] = $('#name').val();        // Save top item values in the top-item search array (not local storage)
    searchTopItems[searchCnt][1] = $('#schoolPublisher').val();
    searchTopItems[searchCnt][2] = $('#city').val();
    searchTopItems[searchCnt][3] = document.querySelector('.dropdownState').innerText;
    searchTopItems[searchCnt][4] = publisherIs;
    searchTopItems[searchCnt][5] = document.querySelector('.dropdownYear').innerText;
    searchTopItems[searchCnt][6] = $('#publishNo').val();
    localStorage.setItem("searchTopItemCnt", 7);

    let i = 0, n = 0, itemCnt = 0;

    localStorage.setItem("searchCount", searchCnt);

    for (n = 0; n < globalTopicHeadlines.contentValue.length; n++) {        // Save selected topics in the topics search array 
        for (i = 0; i < globalTopicItems[n].contentValue.length; i++) {
            if (localStorage.getItem("checked_topic_" + n + "_" + i) == "checked") {
                searchTopicsItems[searchCnt][itemCnt] = "topic_" + n + "_" + i;
                itemCnt++;
            }
        }
    }

    for (i = 0; i < localStorage.getItem("searchTopItemCnt"); i++) {        // Save top search values to local storage
        localStorage.setItem("searchItem_" + i, searchTopItems[searchCnt][i]);
    }

    if ((searchCnt < maxSearchSets)) {
        if (!maxReached)
            changeRange(searchCnt);
        searchCnt = searchCnt + 1;
    }
    else {
        maxReached = true;
        searchCnt = 1;
    }
    $(".doSearch").trigger("blur");

    window.electronAPI.openSearchProcess();
}


while (true) {
    await sleep(2000).then(() => {
        $('.statusbar2').html(localStorage.getItem("searchCount"));
    });
}

