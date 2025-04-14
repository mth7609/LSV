import { globalTopicItems, globalTopicHeadlines } from "./Globals.js";

let searchItems = [];
let mainHeadline = [];


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
    $('#searchCountText').html(localStorage.getItem("searchWindowSubheadline") + localStorage.getItem("searchCount"));
    $('#topSearchItems').html(el);

    el = "";
    for (i = 0; i < localStorage.getItem("topicHeadlineCnt"); i++) {
        //el = el + globalTopicHeadlines[i].contentValue["headline"] + "<br>";
    }

    $('#topicSearchItems').html(el);
}

updateSearchWindow();

