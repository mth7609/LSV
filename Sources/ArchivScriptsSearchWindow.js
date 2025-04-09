
let searchItems = [];
let mainHeadline = [];

updateSearchWindow();

function updateSearchWindow() {
    let i;
    let el = "";

    for (i = 0; i < 7; i++) {
        mainHeadline[i] = localStorage.getItem("mainHeadline_" + i);
        searchItems[i] = localStorage.getItem("searchItem_" + i);
        if (searchItems[i] != null)
            el = el + "<nobr><b><label class='searchListLabel searchItem_" + i + "'>" + mainHeadline[i] + ": </label></b> \
                       <label class='searchListItems searchItem_" + i + "'>" + searchItems[i] + "</label><br>\n";
    }

    $('#topicListLabels').html(el);

}

