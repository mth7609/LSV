import { globalTopicItems, globalTopicHeadlines } from "./Globals.js";

let searchItems = [];
let mainHeadline = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function updateSearchWindow() {
    let i;
    let el = "";

    for (i = 0; i < 11; i++) {
        mainHeadline[i] = localStorage.getItem("mainHeadline_" + i);
        searchItems[i] = localStorage.getItem("searchItem_" + i);
        if (searchItems[i] != null)
            el = el + "<nobr><label class='topicHeadline searchItem_" + i + "'>" + mainHeadline[i] + ": </label> \
                       <label class='searchListItems searchItem_" + i + "'>" + searchItems[i] + "</label><br>\n";
    }

    $('#searchWindowHeadline').html(localStorage.getItem("searchWindowHeadline"));
    $('#searchCountText').html(localStorage.getItem("searchWindowSubheadline"));
    $('#searchCount').html(localStorage.getItem("searchCount"));
    $('#topSearchItems').html(el);

    el = "";
    for (i = 0; i < localStorage.getItem("topicHeadlineCnt"); i++) {
    }

    $('#topicSearchItems').html(el);
}

updateSearchWindow();

while (true) {
    await sleep(1000).then(() => {
        console.log(localStorage.getItem("searchCount"));
        $('#searchCount').html(localStorage.getItem("searchCount"));
    });
}
