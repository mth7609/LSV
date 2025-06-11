


function updateDatasetTab(tab) {
    let i;
    let n;
    let el = "";

    let datasetItems = [];
    let mainHeadline = [];

    for (i = 0; i < 11; i++) {
        mainHeadline[i] = localStorage.getItem("mainHeadline_" + i);
        datasetItems[i] = localStorage.getItem("datasetItem_" + i);
        if (datasetItems[i] != null)
            el = el + "<nobr><label class='mainHeadline datasetItem_" + i + "'>" + mainHeadline[i] + ": </label> \
                       <label class='datasetListItems datasetItem_" + i + "'>" + datasetItems[i] + "</label><br>\n";
    }

    $('.datasetWindowHeadline_' + tab).html(localStorage.getItem("datasetWindowHeadline"));
    $('.datasetWindowSubheadline_' + tab).html(localStorage.getItem("datasetWindowSubheadline"));
    $('.topDatasetItems_' + tab).html(el);

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

    $('.topicDatasetItems_' + tab).html(el);
}



