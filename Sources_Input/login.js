

$('.logoImage').html("<img src='./images/LOGO1_blau_250.gif'></img>");

$(".us").on('keydown', checkUserKeydown);
$(".pw").on('keydown', checkUserKeydown);
$("body").on('keydown', checkUserKeydown);

//$("body").on('keydown', doKeydown);

$(".cancel").on('click', function (event) {
    window.electronAPI.closeLogin("", "nok");
});


$(".login").on('click', function (event) {
    const username = $('.us').val();
    const password = $('.pw').val();
    window.electronAPI.closeLogin(username, password, "45537b6ad7112eae2dcaa9933213cc2c4757418882aa255c523967057fc0177a");
});


function checkUserKeydown(event) {
    let key = event.which;

    if (key != 13 && key != 27) {
        return;
    }

    if (key == 27) {
        window.electronAPI.closeLogin("", "nok");
        return;
    }

    const username = $('.us').val();
    const password = $('.pw').val();
    window.electronAPI.closeLogin(username, password, "45537b6ad7112eae2dcaa9933213cc2c4757418882aa255c523967057fc0177a");
}