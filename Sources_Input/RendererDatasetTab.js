function updateDatasetTabContent(tab) {
    let i;
    let n;
    let el = "";

    let datasetItems = [];
    let mainHeadline = [];

    $(".inputFieldWhen_" + tab).attr("placeholder", localStorage.getItem("placeholderWhen"));
    $(".inputFieldWho_" + tab).attr("placeholder", localStorage.getItem("placeholderWho"));

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

    let when = localStorage.getItem("releasedWhen");
    let who = localStorage.getItem("releasedWho");

    if (!who || who == "-") {
        $(".releasedButton_" + tab).removeClass('disabled');
        $(".removeReleasedButton_" + tab).addClass('disabled');
    }
    else {
        $(".releasedButton_" + tab).addClass('disabled');
        $(".removeReleasedButton_" + tab).removeClass('disabled');
        $('.inputFieldWho_' + tab).val(who);
        $('.inputFieldWhen_' + tab).val(when);
    }

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
    //$(".tab-content").before('<script>$(".tab-' + tab + '").load("empty.hml")</script>');

    let selectCnt = localStorage.getItem("selectCnt");
    selectCnt--;
    //console.log("Remove Tab cnt:" + selectCnt);
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


function saveReleased(tab) {
    //console.log("+++++  " + $(".inputFieldWhen_" + tab).val());
    let when = $(".inputFieldWhen_" + tab).val();
    let who = $(".inputFieldWho_" + tab).val();

    if ((when.split("/").length - 1) != 2 && (when.split("-").length - 1) != 2 && (when.split(".").length - 1) != 2) {
        $(".inputFieldWhen_" + tab).removeAttr("placeholder");
        $(".inputFieldWhen_" + tab).attr("placeholder", localStorage.getItem("placeholderWhen"));
        $(".inputFieldWhen_" + tab).val("");
        return;
    }

    if (who == "" || who.length > 4) {
        $(".inputFieldWho_" + tab).removeAttr("placeholder");
        $(".inputFieldWho_" + tab).attr("placeholder", localStorage.getItem("placeholderWho"));
        $(".inputFieldWho_" + tab).val("");
        return;
    }

    let dataset_number = localStorage.getItem("datasetWindowSubheadline").replace(".", "");

    let query = "update prolabor.archive_data set releasedWho = '" + who + "' where dataset_number = " + dataset_number;
    window.electronAPI.executeSimpleSQL(query);
    query = "update prolabor.archive_data set releasedWhen = '" + when + "' where dataset_number = " + dataset_number;
    window.electronAPI.executeSimpleSQL(query);
    query = "update prolabor.archive_data set released = 1 where dataset_number = " + dataset_number;
    window.electronAPI.executeSimpleSQL(query);

    localStorage.setItem("releasedWhen", when);
    localStorage.setItem("releasedWho", who);
    changeHomeContent(tab);
}


function removeReleased(tab) {
    let dataset_number = localStorage.getItem("datasetWindowSubheadline").replace(".", "");

    let query = "update prolabor.archive_data set releasedWho = '' where dataset_number = " + dataset_number;
    window.electronAPI.executeSimpleSQL(query);
    query = "update prolabor.archive_data set releasedWhen = '' where dataset_number = " + dataset_number;
    window.electronAPI.executeSimpleSQL(query);
    query = "update prolabor.archive_data set released = 0 where dataset_number = " + dataset_number;
    window.electronAPI.executeSimpleSQL(query);

    localStorage.setItem("releasedWhen", "");
    localStorage.setItem("releasedWho", "");
    $(".inputFieldWho_" + tab).removeAttr("placeholder");
    $(".inputFieldWho_" + tab).attr("placeholder", localStorage.getItem("placeholderWho"));
    $(".inputFieldWho_" + tab).val("");
    $(".inputFieldWhen_" + tab).removeAttr("placeholder");
    $(".inputFieldWhen_" + tab).attr("placeholder", localStorage.getItem("placeholderWhen"));
    $(".inputFieldWhen_" + tab).val("");
    updateDatasetTabContent(tab)
}




