

$('.logoImage').html("<img src='./images/LOGO1_blau_250.gif'></img>");
$('.canc').on('click', aboardLogin);


function aboardLogin() {
    console.log("cancel");
    window.electronAPI.closeLogin("admin", "failed");
}
