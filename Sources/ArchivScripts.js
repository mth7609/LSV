import { getDBStatus, getSetStates, getSetTopicHeadlines } from "./HTTPRequests.js";
import { globalStates, globalTopicHeadlines, globalTopicItems } from "./Globals.js";

var selectedDropdown = 0;
var publisherIs = "";
let searchCnt = 1;
var elementsOnForm = 7;
var maxSearchSets = 10;
var maxReached = false;

getDBStatus();
changeRange(searchCnt);
setYears();
getSetStates();
getSetTopicHeadlines();
setHeadlines();


const searchItems = Array.from({ length: maxSearchSets + 1 }, () => new Array(elementsOnForm).fill(0));

$(".dropdown-menu li a").on('click', updateValue);
$(".doSearch").on('click', doSearch);
$("#dropdown-state").on('click', sel1);
$("#dropdown-year").on('click', sel2);
$("#btnradio1").on('click', publisherSchool);
$("#btnradio2").on('click', publisherFree);
$(".searchRange").on('click', updateRange);

function updateRange(str) {

    document.getElementById('dropdown-state').innerText = searchItems[$(".searchRange").val()][3];
    document.getElementById('dropdown-year').innerText = searchItems[$(".searchRange").val()][5];

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

    changeStatus2("Sucheingabe Nr.: " + $(".searchRange").val());

}

export function setHeadlines() {
    let i;
    for (i = 0; i < globalTopicHeadlines.contentValue.length; i++) {
        var el = 'topicLabel_' + i;
        console.log(i);
        let r = document.getElementById(el);
        r.innerText = globalTopicHeadlines.contentValue[i]['headline'];
    }
}

export function setTopicItems() {
    let i;
    for (i = 0; i < globalTopicItems.contentValue.length; i++) {
        var el = "<input type='radio' class='form-check-input' id='topic_1_1'><label for='flexRadioCheckedDisabled' class='form-check-label topicLabel_1_1'>Name1</label><br>";
        console.log(el);
        //let r = document.getElementById(el);
        //r.innerText = globalTopicHeadlines.contentValue[i]['headline'];
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

    $('#name-Read').text(searchItems[searchCnt][0]);
    $('#schoolPublisher-Read').text(searchItems[searchCnt][1]);
    $('#city-Read').text(searchItems[searchCnt][2]);
    $('#state-Read').text(searchItems[searchCnt][3]);
    $('#publisherIs-Read').text(searchItems[searchCnt][4]);
    $('#year-Read').text(searchItems[searchCnt][5]);
    $('#no-Read').text(searchItems[searchCnt][6]);
    $('#searchCnt').text(searchCnt);

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



