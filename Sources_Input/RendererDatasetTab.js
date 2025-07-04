function updateDatasetTab(tab) {
    let i;
    let n;
    let el = "";

    let datasetItems = [];
    let mainHeadline = [];

    for (i = 0; i < localStorage.getItem("datasetTopItemCount"); i++) {
        mainHeadline[i] = localStorage.getItem("mainHeadline_" + i);
        datasetItems[i] = localStorage.getItem("datasetItem_" + i);
        if (datasetItems[i] != null)
            el = el + "<label class='mainHeadline datasetItem_" + i + "'>" + mainHeadline[i] + ": </label> \
                       <label class='datasetListItems text-wrap datasetItem_" + i + "'>" + datasetItems[i] + "</label><br>\n";
    }

    $('.datasetWindowHeadline_' + tab).html(localStorage.getItem("datasetWindowHeadline"));
    $('.datasetWindowSubheadline_' + tab).html(localStorage.getItem("datasetWindowSubheadline"));
    $('.topDatasetItems_' + tab).html(el);
    //$('.comment_' + tab).val(localStorage.getItem("datasetItem_7"));   // Special handling for comment that should be shown in textarea

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

function removeTab(tab) {
    $(".navtab-" + tab).removeClass("active");
    $(".navtab-" + tab).remove();
    let selectCnt = localStorage.getItem("selectCnt");
    selectCnt--;
    localStorage.setItem("selectCnt", selectCnt);
    $(".navtab-0").addClass("active");
    $(".tab-0").show();
}







