

$('.logoImage').html("<img src='./images/LOGO1_blau_250.gif'></img>");


$(".cancel").on('click', function (event) {
    window.electronAPI.closeMessageWindow();
});


window.electronAPI.getMessage((value) => {
    console.log("message");
    $(".message").text(value);
});

