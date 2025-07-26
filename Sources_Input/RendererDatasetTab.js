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
        for (i = 0; i < localStorage.getItem("amountTopicsHeadline_" + n); i++) {
            if (localStorage.getItem("checked_topic_" + n + "_" + i) == "checked") {
                el = el + "<b>" + localStorage.getItem("topicHeadline_" + n) + "</b><br>";
                for (i = 0; i < localStorage.getItem("amountTopicsHeadline_" + n); i++) {
                    if (localStorage.getItem("checked_topic_" + n + "_" + i) == "checked") {
                        el = el + "&nbsp; &nbsp; " + localStorage.getItem("topic_" + n + "_" + i) + " ";
                    }
                }
                el = el + "<br>";
                break;
            }
        }

        $(".topicsHeader").text(localStorage.getItem("topics"));
        $('.topicDatasetItems_' + tab).html(el);
    }
}


function removeTab(tab) {
    $(".navtab-0").addClass("active");
    $(".tab-0").show();
    $(".navtab-" + tab).removeClass("active");
    $(".tab-" + tab).removeClass("active");
    $(".navtab-" + tab).remove();
    $(".tab-" + tab).remove();
    $(".navtab-0").click();
    $(".tab-content").before('<script>$(".tab-' + tab + '").load("empty.hml")</script>');

    let selectCnt = localStorage.getItem("selectCnt");
    selectCnt--;
    //    console.log("4 cnt:" + selectCnt);
    localStorage.setItem("selectCnt", selectCnt);
    $(".doButtonDatasetRemember").removeClass('disabled');
}


function changeHomeContent(tab) {
    $(".navtab-0").addClass("active");
    $(".tab-0").show();
    $(".navtab-0").click();
    $(".dsNumber").val($('.datasetWindowSubheadline_' + tab).text());
    $(".doButtonFetch").click();
    setStatusTodo(localStorage.getItem("dataCouldBeChanged"));
}


function setStatusTodo(text) {
    $(".statusText3").html("&nbsp; " + text);
    $(".statusbar3").css("background-color", "#0000dd");
    $(".statusbar3").css("color", "#ffffff");
    setTimeout(() => {
        $(".statusbar3").css("color", "#000000");
        $(".statusbar3").css("background-color", "#c2e2ec");
        $(".statusText3").html("&nbsp; " + localStorage.getItem("enterData"));
    }, 5000);
}





