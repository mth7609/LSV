import { changeStatus1 } from "./ArchivScripts.js";
import { globalStates, globalTopHeadlines, globalTopicItems, globalTopicHeadlines, globalInfoLabels, globalFrontPages } from "./Globals.js";
import { sleep } from "./helpers.js";


export function getInitValues() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/getInitValues',     // the http port is set already before loading
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


export function getOutputText() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/getOutputText',
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
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/getStates',
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
    $(".states").html(globalStates.content);
}


export function getDBStatus() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/getDBStatus',
        async: false,
        success: function (data) {
            if (data == "command2") {
                alert("No connection to database! Program will exit.");
                window.electronAPI.closeMainProcess();
            }
        }
    });
}

export function getDBRunning() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/getDBRunning',
        async: false,
        success: function (data) {
            if (data == "command1") {
                changeStatus1(localStorage.getItem("dbConnected"));
                $(".statusbar1").css("background-color", "#c2e2ec");
                $(".statusbar1").css("color", "#000000");
                return true;
            }
            else {
                changeStatus1(localStorage.getItem("dbDisconnected"));
                $(".statusbar1").css("background-color", "#ff1111");
                $(".statusbar1").css("color", "#ffffff");
                return false;
            }
        }
    });
}

export function getTopicHeadlinesInfo() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/getTopicHeadlinesInfo',
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
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/getTopHeadlines',
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
            url: 'http://localhost:' + localStorage.getItem("httpPort") + '/' + i,
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
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/getInfoLabels',
        async: false,
        success: function (hl) {
            globalInfoLabels.content = hl;
        },
        error: function (error) {
            console.log(error);
        }
    });

}


export function getFrontPageFiles() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/getFrontPageFiles',
        async: true,
        success: function (fp) {
            globalFrontPages.content = fp;
            //console.log(fp);
        },
        error: function (error) {
            console.log(error);
        }
    });

}