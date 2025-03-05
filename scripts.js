var selectedDropdown = 0;
var publisherIs = "";
let searchCnt = 1;
elementsOnForm = 7;
maxSearchSets = 10;
maxReached = false;

changeRange(searchCnt);

const searchItems = Array.from({ length: maxSearchSets + 1 }, () => new Array(elementsOnForm).fill(0));

$(".dropdown-menu li a").on('click', updateValue);
$(".doSearch").on('click', doSearch);
$("#dropdown-state").on('click', sel1);
$("#dropdown-year").on('click', sel2);
$("#btnradio1").on('click', publisherSchool);
$("#btnradio2").on('click', publisherFree);
$(".r1").on('click', updateRange);



function updateRange(str) {

    //console.log(searchItems[$(".r1").val()][4]);

    document.getElementById('dropdown-state').innerText = searchItems[$(".r1").val()][3];
    document.getElementById('dropdown-year').innerText = searchItems[$(".r1").val()][5];

    if (searchItems[$(".r1").val()][4] == "Frei") {
        $('#btnradio1').prop("checked", false);
        $('#btnradio2').prop("checked", true);
    }
    else
        if (searchItems[$(".r1").val()][4] == "Schule") {
            $('#btnradio1').prop("checked", true);
            $('#btnradio2').prop("checked", false);
        }
        else {
            $('#btnradio1').prop("checked", false);
            $('#btnradio2').prop("checked", false);
        }


    document.getElementById('name').value = searchItems[$(".r1").val()][0];
    document.getElementById('schoolPublisher').value = searchItems[$(".r1").val()][1];
    document.getElementById('city').value = searchItems[$(".r1").val()][2];
    document.getElementById('no').value = searchItems[$(".r1").val()][6];
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

    if ((searchCnt < maxSearchSets)) {
        if (!maxReached)
            changeRange(searchCnt);
        searchCnt = searchCnt + 1;
    }
    else {
        maxReached = true;
        searchCnt = 1;
    }

}
