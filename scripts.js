
//alert("jjjj");

var selectedDropdown = 0;
var publisherIs = "";
let searchCnt = 1;
elementsOnForm = 7;
maxSearchSets = 10;
maxReached = false;

changeRange(searchCnt);

const searchItems = Array.from({ length: maxSearchSets+1 }, () => new Array(elementsOnForm).fill(0));

$(".dropdown-menu li a").click(updateValue);
$(".doSearch").click(doSearch);
$("#dropdown-state").click(sel1);
$("#dropdown-year").click(sel2);
$("#btnradio1").click(publisherSchool);
$("#btnradio2").click(publisherFree);
$(".r1").click(updateRange);

function updateRange(str) {


    document.getElementById('name').value = searchItems[$(".r1").val()][0];

}

function changeRange(str) {
    let r = document.getElementById('r1');
    r.attributes[3].value = str;
    $('#debug').text(str);
    r.value = str;
}

function publisherSchool(str) {
    publisherIs = "Schule";
}

function publisherFree(str) {
    publisherIs = "Frei";
}

function sel1(str) {
    selectedDropdown = 1;
}

function sel2(str) {
    selectedDropdown = 2;
}

function updateValue(str) {
    var selText = $(this).text();

    if (selectedDropdown == 1) {
        document.querySelector('.d2').innerText = selText;
    }

    if (selectedDropdown == 2) {
        document.querySelector('.d1').innerText = selText;
    }
}

function doSearch() {
    console.log(searchCnt);

    searchItems[searchCnt][0] = $('#name').val();
    searchItems[searchCnt][1] = $('#schoolPublisher').val();
    searchItems[searchCnt][2] = $('#city').val();
    searchItems[searchCnt][3] = document.querySelector('.d2').innerText;
    searchItems[searchCnt][4] = publisherIs;
    searchItems[searchCnt][5] = document.querySelector('.d1').innerText;
    searchItems[searchCnt][6] = $('#no').val();

    $('#name-Read').text(searchItems[searchCnt][0]);
    $('#schoolPublisher-Read').text(searchItems[searchCnt][1]);
    $('#city-Read').text(searchItems[searchCnt][2]);
    $('#state-Read').text(searchItems[searchCnt][3]);
    $('#publisherIs-Read').text(searchItems[searchCnt][4]);
    $('#year-Read').text(searchItems[searchCnt][5]);
    $('#no-Read').text(searchItems[searchCnt][6]);
    $('#searchCnt').text(searchCnt);
    $('#debug').text($(".form-range").val());


    if ((searchCnt < maxSearchSets))
    {
        if( !maxReached)
            changeRange(searchCnt);
        searchCnt = searchCnt + 1;
    }
    else
    {
        maxReached = true;
        searchCnt = 1;
    }

}
