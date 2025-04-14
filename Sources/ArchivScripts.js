import { getDBStatus, getStates, getTopicHeadlinesInfo, getTopicItems, getInitValues } from "./HTTPRequests.js";
import { globalTopicHeadlines, globalStates, globalTopicItems, globalTopHeadlines } from "./Globals.js";

var selectedDropdown = 0;
var publisherIs = "";
let searchCnt = 1;
var elementsOnForm = 7;
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
setOutputText()

const searchTopItems = Array.from({ length: maxSearchSets + 1 }, () => new Array(elementsOnForm).fill(0));

$(".dropdown-menu li a").on('click', updateValue);
$(".doSearch").on('click', doSearch);
$("#dropdownState").on('click', sel1);
$("#dropdownYear").on('click', sel2);
$("#btnradio1").on('click', publisherSchool);
$("#btnradio2").on('click', publisherFree);
$(".searchRange").on('click', updateRange);
$(".topicListButton").on('click', topicListClick);


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
}


function topicListClick() {
    var topicName = this.attributes[4].value;

    console.log(topicName + "    " + $(`#${topicName}`).prop("checked") + "    " + lastTopicName);
    globalTopicItems[this.attributes[2].value].contentValue[this.attributes[3].value]["active"] = true;
    console.log(globalTopicItems);

    $(`#${topicName}`).trigger("focus");

    if (topicName == lastTopicName) {
        $(`#${topicName}`).prop("checked", false);
        lastTopicName = "null";
        $(`#${topicName}`).css("backgroundColor", "#056289");
        globalTopicItems[this.attributes[2].value].contentValue[this.attributes[3].value]["active"] = false;
    }
    else {
        $(`#${topicName}`).css("backgroundColor", "#00ff00");
        lastTopicName = topicName;
    }
    $(`#${topicName}`).trigger("blur");
    console.log($(`#${topicName}`).prop("checked"));
}

function updateRange(str) {

    document.getElementById('dropdownState').innerText = searchItems[$(".searchRange").val()][3];
    document.getElementById('dropdownYear').innerText = searchItems[$(".searchRange").val()][5];

    if (searchItems[$(".searchRange").val()][4] == "Frei") {
        $('#btnradio1').prop("checked", false);
        $('#btnradio2').prop("checked", true);
    }
    else
        if (searchItems[$(".searchRange").val()][4] == "Schule") {
            $('#btnradio1').prop("checked", true);
            $('#btnradio2').prop("checked", false);
        }
        else {
            $('#btnradio1').prop("checked", false);
            $('#btnradio2').prop("checked", false);
        }

    document.getElementById('name').value = searchItems[$(".searchRange").val()][0];
    document.getElementById('schoolPublisher').value = searchItems[$(".searchRange").val()][1];
    document.getElementById('city').value = searchItems[$(".searchRange").val()][2];
    document.getElementById('publishNo').value = searchItems[$(".searchRange").val()][6];

    changeStatus3("Sucheingabe Nr.: " + $(".searchRange").val());
}

export function setTopicHeadlines() {
    let i;
    for (i = 0; i < globalTopicHeadlines.contentValue.length; i++) {
        var el = 'topicHeadline_' + i;
        let r = document.getElementById(el);
        r.innerText = globalTopicHeadlines.contentValue[i]['headline'];
        console.log(globalTopicHeadlines.contentValue[i]['headline']);
        setTopicItems(i)
    }
}

export function setTopicItems(nr) {
    let i;
    let el = "";
    for (i = 0; i < globalTopicItems[nr].contentValue.length; i++) {
        el = el + "<nobr><input type='radio' class='form-check-input topicListButton  topic_" + nr + "_" + i + "' topicListNo='" + nr + "' topicNoInList='" + i + "' id='topic_" + nr + "_" + i + "'>\n \
                  <label class='form-check-label topicListLabel topicLabel_" + nr + "_" + i + "'>" + globalTopicItems[nr].contentValue[i]["text"] + "</label><br>\n";
    }
    $('#topicList_' + nr).html(el);
}

export function changeStatus1(str) {
    let r = document.getElementById('statusText1');
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

function sel1(str) {
    selectedDropdown = 1;
}

function sel2(str) {
    selectedDropdown = 2;
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
    searchTopItems[searchCnt][0] = $('#name').val();
    searchTopItems[searchCnt][1] = $('#schoolPublisher').val();
    searchTopItems[searchCnt][2] = $('#city').val();
    searchTopItems[searchCnt][3] = document.querySelector('.dropdownState').innerText;
    searchTopItems[searchCnt][4] = publisherIs;
    searchTopItems[searchCnt][5] = document.querySelector('.dropdownYear').innerText;
    searchTopItems[searchCnt][6] = $('#publishNo').val();
    localStorage.setItem("searchTopItemCnt", 7);

    let i = 0;

    for (i = 0; i < localStorage.getItem("searchTopItemCnt"); i++) {
        localStorage.setItem("searchItem_" + i, searchTopItems[searchCnt][i]);
    }

    localStorage.setItem("searchCount", searchCnt);

    if ((searchCnt < maxSearchSets)) {
        if (!maxReached)
            changeRange(searchCnt);
        searchCnt = searchCnt + 1;
    }
    else {
        maxReached = true;
        searchCnt = 1;
    }
    window.electronAPI.openSearchProcess();
}

