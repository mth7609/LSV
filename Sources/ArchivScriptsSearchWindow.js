import { globalSearchItems } from "./Globals.js";

console.log("+++++++++++++++++++++++++ " + globalSearchItems[0].contentValue);

updateSearchWindow();

function updateSearchWindow() {
    let i;
    let el = "";

    console.log("::: " + globalSearchItems[0].contentValue);
    for (i = 0; i <= 6; i++) {
        el = el + "<label class='topicListLabel searchItem_" + i + "'>" + globalSearchItems[i].contentValue + "</label><br>\n";
    }

    $('#topicListLabels').html(el);

}

