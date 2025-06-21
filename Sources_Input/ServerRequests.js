
import { globalStates, globalTopHeadlines, globalTopicItems, globalTopicHeadlines, globalInfoLabels } from "./Globals.js";


export function requestInitValues() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestInitValues',     // the http port is set already before loading
        async: false,
        success: function (text) {
            var i;
            var s = "";
            for (const [key, value] of Object.entries(text)) {
                //console.log(`${key}: ${value}`);
                localStorage.setItem(`${key}`, `${value}`);
            }
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}


export function requestOutputText() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestSqlOutputText',
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


export function requestStates() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestSqlStates',
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


export function requestTopicHeadlinesInfo() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestSqlTopicHeadlinesInfo',
        async: false,
        success: function (data) {
            globalTopicHeadlines.content = data;
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}


export function requestTopHeadlines() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestSqlDatasetTopHeadlines',
        async: false,
        success: function (data) {
            globalTopHeadlines.content = data;
        },
        error: function (error) {
            console.log(error);
        }
    });

}


export function requestTopicItems() {

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


export function requestInfoLabels() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestSqlInfoLabels',
        async: false,
        success: function (hl) {
            globalInfoLabels.content = hl;
        },
        error: function (error) {
            console.log(error);
        }
    });

}


export function requestImages() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestSqlImages',
        async: false,
        success: function (data) {
            let i;
            for (i = 0; i < data.length; i++) {
                localStorage.setItem("image_" + data[i]["image_nr"], data[i]["image_path"]);
            }
        }
    });
}


export function requestConstValues() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestConstants',
        async: false,
        success: function (data) {
            let i;
            for (i = 0; i < data.length; i++) {
                localStorage.setItem(data[i]["const_name"], data[i]["const_value"]);
            }
        }
    });
}

export function requestSelectDatasetNumber(nr) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestSelectDatasetNumber',
        async: false,
        success: function (data) {
            let i;
            for (i = 0; i < data.length; i++) {
                if (data[i]["dataset_number"] == nr) {
                    localStorage.setItem("selectedDatasetNumber", nr);
                    localStorage.setItem("selectedDatasetComment", data[i]["comment"]);
                }
            }
            if (i == data.lenght) {
                localStorage.setItem("selectedDatasetNumber", "");
                localStorage.setItem("selectedDatasetComment", "");
            }
        }
    });
}

export function requestNewDatasetNumber() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestNewDatasetNumber',
        async: false,
        success: function (data) {
            localStorage.setItem("datasetNumber", data);
            console.log("New: " + localStorage.getItem("datasetNumber"));
        }
    });
    return localStorage.getItem("datasetNumber");
}
