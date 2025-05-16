import { changeStatus1 } from "./ArchivScripts.js";
import { v } from "./Globals.js";

var statesList = " ";


export function getSetStates() {
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
                v.content = s;
            },
            error: function (error) {
                console.log(`Error ${error}`);
            }
        });
    //console.log(v.content);
    document.getElementById("states").innerHTML = v.content;
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

