
let tabs = document.querySelector(".tabs")
let webviews = document.querySelector(".webviews")

document.getElementsByTagName("form")[0].onsubmit = function (event) {
    //createWebview(form.input.value)
    createBrowserWindow(form.input.value)
    return false;
}

function createWebview(url) {

    let webview = new WebView()
    webview.setAttribute("autosize", "on")
    webview.setAttribute("nodeintegration", "on")
    webview.setAttribute("disablewebsecurity", "on")
    webview.setAttribute("webpreferences", "allowRunningInsecureContent")
    webview.src = url
    webviews.appendChild(webview)

    let tab = document.createElement("div")
    tab.textContent = url
    tab.target = webview

    tabs.appendChild(tab)

}

function createBrowserWindow(url) {

    let win = new BrowserWindow({
        width: 800,
        height: 600,
        y: 100,
        x: 100,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: false
        }
    })

    win.setMenu(null)

    win.on('closed', () => {
        win = null
    })

    view = new BrowserView({
        webPreferences: {
            nodeIntegration: false
        }
    })

    win.webContents.openDevTools()

    // Load a remote URL
    win.loadURL(url)

}