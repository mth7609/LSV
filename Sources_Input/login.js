

$('.logoImage').html("<img src='./images/LOGO1_blau_250.gif'></img>");

$(".login").on('click', function (event) {
    const username = $('.us').val();
    const password = $('.pw').val();
    if (username == "admin" && password == "admin")
        window.electronAPI.closeLogin("admin", "ok");
    else {
        window.electronAPI.closeLogin("admin", "ok");
    }
});

$(".cancel").on('click', function (event) {
    const username = $('.us').val();
    const password = $('.pw').val();
    if (username == "admin" && password == "admin")
        window.electronAPI.closeLogin("admin", "nok");
    else {
        window.electronAPI.closeLogin("admin", "nok");
    }
});

window.electronAPI.getStatusLogin((value) => {
    console.log("Splash");
});
