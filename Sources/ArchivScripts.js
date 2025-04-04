import { getDBStatus, getStates, getTopicHeadlines, getTopicItems } from "./HTTPRequests.js";
import { globalTopicHeadlines, globalTopicItems } from "./Globals.js";

var selectedDropdown = 0;
var publisherIs = "";
let searchCnt = 1;
var elementsOnForm = 7;
var maxSearchSets = 10;
var maxReached = false;

getDBStatus();
changeRange(searchCnt);
setYears();
getStates();
getTopicHeadlines();
getTopicItems();
setHeadlines();

const searchItems = Array.from({ length: maxSearchSets + 1 }, () => new Array(elementsOnForm).fill(0));

$(".dropdown-menu li a").on('click', updateValue);
$(".doSearch").on('click', doSearch);
$("#dropdownState").on('click', sel1);
$("#dropdownYear").on('click', sel2);
$("#btnradio1").on('click', publisherSchool);
$("#btnradio2").on('click', publisherFree);
$(".searchRange").on('click', updateRange);

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
    document.getElementById('no').value = searchItems[$(".searchRange").val()][6];

    changeStatus3("Sucheingabe Nr.: " + $(".searchRange").val());

}

export function setHeadlines() {
    let i;
    for (i = 0; i < globalTopicHeadlines.contentValue.length; i++) {
        var el = 'topicLabel_' + i;
        let r = document.getElementById(el);
        r.innerText = globalTopicHeadlines.contentValue[i]['headline'];
        setTopicItems(i)
    }

}

export function setTopicItems(nr) {
    let i;
    let el = "";
    for (i = 0; i < globalTopicItems[nr].contentValue.length; i++) {
        el = el + "<nobr><input type='radio' class='form-check-input topicListButton topic_" + nr + "_" + i + "' id='topic_" + nr + "_" + i + "'>\n \
                  <label for='flexRadioCheckedDisabled' class='form-check-label topicLabel_" + nr + "_" + i + "'>" + globalTopicItems[nr].contentValue[i]["text"] + "</label><br>\n";
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
}

function publisherFree(str) {
    publisherIs = "Frei";
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
        document.querySelector('.d2').innerText = selText;
    }

    if (selectedDropdown == 2) {
        document.querySelector('.d1').innerText = selText;
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
    searchItems[searchCnt][0] = $('#name').val();
    searchItems[searchCnt][1] = $('#schoolPublisher').val();
    searchItems[searchCnt][2] = $('#city').val();
    searchItems[searchCnt][3] = document.querySelector('.d2').innerText;
    searchItems[searchCnt][4] = publisherIs;
    searchItems[searchCnt][5] = document.querySelector('.d1').innerText;
    searchItems[searchCnt][6] = $('#no').val();
    //console.log(searchItems);

    if ((searchCnt < maxSearchSets)) {
        if (!maxReached)
            changeRange(searchCnt);
        searchCnt = searchCnt + 1;
    }
    else {
        maxReached = true;
        searchCnt = 1;
    }
}



