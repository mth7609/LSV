import { changeStatus1, setHeadlines } from "./ArchivScripts.js";
import { globalStates, globalTopicHeadlines, globalTopicItems } from "./Globals.js";

var statesList = "";
var titles = ""


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

export function getTopicHeadlines() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/getTopicHeadlines',
        async: false,
        success: function (headlines) {
            globalTopicHeadlines.content = headlines;
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });

    var s = [];
    var i;

    for (i = 0; i < globalTopicHeadlines.contentValue.length; i++) {
        s = s + globalTopicHeadlines.contentValue[i]['headline'] + "\n";
        //console.log(globalTopicHeadlines.contentValue[i]['headline']);
    }
}

export function getTopicItems() {

    let i;
    for (i = 0; i < 11; i++) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/' + i,
            async: false,
            success: function (data) {
                globalTopicItems[i].contentValue = data;
                //console.log(globalTopicItems[i].contentValue);
            }
        });
    }
}

