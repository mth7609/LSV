import { globalTopicItems, globalTopicHeadlines } from "./Globals.js";
import { sleep } from "./Helpers.js";

let searchItems = [];
let mainHeadline = [];
let oldSearchCount = 0;


function updateSearchWindow() {
    let i;
    let n;
    let el = "";

    for (i = 0; i < 11; i++) {
        mainHeadline[i] = localStorage.getItem("mainHeadline_" + i);
        searchItems[i] = localStorage.getItem("searchItem_" + i);
        if (searchItems[i] != null)
            el = el + "<nobr><label class='mainHeadline searchItem_" + i + "'>" + mainHeadline[i] + ": </label> \
                       <label class='searchListItems searchItem_" + i + "'>" + searchItems[i] + "</label><br>\n";
    }

    $('#searchWindowHeadline').html(localStorage.getItem("searchWindowHeadline"));
    $('#searchCountText').html(localStorage.getItem("searchWindowSubheadline"));
    $('#statusSearchEntry').html(localStorage.getItem("searchWindowSubheadline"));
    $('#searchCount').html(localStorage.getItem("searchCount"));
    $('#topSearchItems').html(el);

    el = "";
    for (n = 0; n < localStorage.getItem("topicHeadlineCnt"); n++) {
        el = el + "<b>" + localStorage.getItem("topicHeadline_" + n) + "</b><br>";
        for (i = 0; i < localStorage.getItem("amountTopicsHeadline_" + n); i++) {
            if (localStorage.getItem("checked_topic_" + n + "_" + i) == "checked")
                el = el + "&nbsp; &nbsp; " + localStorage.getItem("topic_" + n + "_" + i) + "<br>";
        }
    }

    $('#topicSearchItems').html(el);
}

updateSearchWindow();

while (true) {
    await sleep(1000).then(() => {
        let c = localStorage.getItem("searchCount");
        if (oldSearchCount != c) {
            oldSearchCount = c;
            updateSearchWindow();
        }
    });
}
