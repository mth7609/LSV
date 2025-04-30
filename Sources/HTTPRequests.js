import { changeStatus1 } from "./ArchivScripts.js";
//import { globalStates, globalTopicHeadlines, globalTopicItems, globalAmountTopics } from "./Globals.js";
import { globalStates, globalTopHeadlines, globalTopicItems, globalTopicHeadlines, globalInfoLabels } from "./Globals.js";

var statesList = "";
var titles = ""


export function getInitValues() {
    localStorage.clear();
    getTopicHeadlinesInfo();
    localStorage.setItem("topicHeadlineCnt", globalTopicHeadlines.contentValue.length);
    getTopHeadlines();
    localStorage.setItem("topHeadlineCnt", globalTopHeadlines.contentValue.length);

    let i;
    for (i = 0; i < localStorage.getItem("topHeadlineCnt"); i++) {
        localStorage.setItem("mainHeadline_" + globalTopHeadlines.contentValue[i]["arraypos"], globalTopHeadlines.contentValue[i]["names"]);
    }

    getOutputText();
}

export function getOutputText() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/getOutputText',
        async: false,
        success: function (text) {
            var i;
            var s = "";
            for (i = 0; i < text.length; i++) {
                localStorage.setItem(text[i]["name"], text[i]["value"]);
            }
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}


export function getStates() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/getStates',
        async: false,
        success: function (states) {
            var i;
            var s = "";
            for (i = 0; i < states.length; i++) {
                s = s + "<li><a class='dropdown-item' href='#'>" + states[i]["name"] + "</a></li>\n";
            }
            globalStates.content = s;
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
    document.getElementById("states").innerHTML = globalStates.content;
}


export function getDBStatus() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/getDBStatus',
        async: false,
        success: function (data) {
            if (data == "command1") {
                changeStatus1("Verbunden mit Datenbank");
                $(".statusbar1").css("background-color", "#c2e2ec");
                $(".statusbar1").css("color", "#000000");
            }
            else {
                changeStatus1("Keine Verbindung zur Datenbank");
                $(".statusbar1").css("background-color", "#ff1111");
                $(".statusbar1").css("color", "#ffffff");
            }
        }
    });
}


export function getTopicHeadlinesInfo() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/getTopicHeadlinesInfo',
        async: false,
        success: function (data) {
            globalTopicHeadlines.content = data;
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}


export function getTopHeadlines() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/getTopHeadlines',
        async: false,
        success: function (hl) {
            globalTopHeadlines.content = hl;
        },
        error: function (error) {
            console.log(error);
        }
    });

}


export function getTopicItems() {

    let i;

    for (i = 0; i < globalTopicHeadlines.contentValue.length; i++) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/' + i,
            async: false,
            success: function (data) {
                globalTopicItems[i].contentValue = data;
            }
        });
    }
}

export function getInfoLabels() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/getInfoLabels',
        async: false,
        success: function (hl) {
            globalInfoLabels.content = hl;
        },
        error: function (error) {
            console.log(error);
        }
    });

}

