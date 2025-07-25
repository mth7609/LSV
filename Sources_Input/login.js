
import { requestSHA } from "./ServerRequests.js";

$('.logoImage').html("<img src='" + localStorage.getItem("image_1") + "'></img>");
$(".us").on('keydown', checkUserKeydown);
$(".pw").on('keydown', checkUserKeydown);
$(".loginBody").on('keydown', checkUserKeydown);
$(".loginErrorBody").on('keydown', checkLoginErrorKeydown);
$(".passwordLabel").text(localStorage.getItem("passwordLabel"));
$(".userName").text(localStorage.getItem("userName"));
$(".cancel").text(localStorage.getItem("cancel"));
$(".login").text(localStorage.getItem("login"));
$(".databaseLogin").text(localStorage.getItem("databaseLogin"));


$(".cancel").on('click', function (event) {
    window.electronAPI.closeLogin("", "nok");
});


$(".login").on('click', function (event) {
    const user = $('.us').val();
    const password = $('.pw').val();
    requestSHA(user);
    //    console.log(user + "    " + password + "    " + localStorage.getItem(user));
    window.electronAPI.closeLogin(user, password, localStorage.getItem(user));
});


$(".loginErrorCancel").on('click', function (event) {
    window.electronAPI.closeLogin("loginErrorClose", "-", "-");
});


function checkUserKeydown(event) {
    let key = event.which;
    if (key != 13 && key != 27) {
        return;
    }
    if (key == 27) {
        window.electronAPI.closeLogin("", "nok", "");
        return;
    }
    const user = $('.us').val();
    const password = $('.pw').val();
    requestSHA(user);
    window.electronAPI.closeLogin(user, password, localStorage.getItem(user));
}


function checkLoginErrorKeydown(event) {
    let key = event.which;
    if (key == 13 || key == 27) {
        window.electronAPI.closeLogin("loginErrorClose", "-", "-");
    }

}