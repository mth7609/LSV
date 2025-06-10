


function updateSearchTab(tab) {
    let i;
    let n;
    let el = "";

    let searchItems = [];
    let mainHeadline = [];

    for (i = 0; i < 11; i++) {
        mainHeadline[i] = localStorage.getItem("mainHeadline_" + i);
        searchItems[i] = localStorage.getItem("searchItem_" + i);
        if (searchItems[i] != null)
            el = el + "<nobr><label class='mainHeadline searchItem_" + i + "'>" + mainHeadline[i] + ": </label> \
                       <label class='searchListItems searchItem_" + i + "'>" + searchItems[i] + "</label><br>\n";
    }

    $('.searchWindowHeadline_' + tab).html(localStorage.getItem("searchWindowHeadline"));
    $('.searchWindowSubheadline_' + tab).html(localStorage.getItem("searchWindowSubheadline"));
    $('.topSearchItems_' + tab).html(el);

    el = "";
    let checkFound = false;

    for (n = 0; n < localStorage.getItem("topicHeadlineCnt"); n++) {
        el = el + "<b>" + localStorage.getItem("topicHeadline_" + n) + "</b><br>";
        checkFound = false;
        for (i = 0; i < localStorage.getItem("amountTopicsHeadline_" + n); i++) {
            if (localStorage.getItem("checked_topic_" + n + "_" + i) == "checked") {
                checkFound = true;
                el = el + "&nbsp; &nbsp; " + localStorage.getItem("topic_" + n + "_" + i) + " ";
            }
        }
        if (checkFound)
            el = el + "<br>";
    }

    $('.topicSearchItems_' + tab).html(el);
}



