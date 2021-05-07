// JavaScript Document
// function change_bg(obj) {
//     var a = document.getElementById("menu").getElementsByTagName("a");
//     for (var i = 0; i < a.length; i++) {
//         a[i].className = "";
//     }
//     obj.className = "current";
// }
//
// function change_bg02(obj) {
//     var a = document.getElementById("menu02").getElementsByTagName("a");
//     for (var i = 0; i < a.length; i++) {
//         a[i].className = "";
//     }
//     if (i == 0) {
//         obj.className = "current02";
//     } else {
//         obj.className = "current03";
//     }
// }

// 页面加载完毕之后执行函数
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload !== "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

// 突出显示当前导航
function highlightPage() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers = document.getElementsByTagName("header");
    if (headers.length === 0) return false;
    var navs = headers[0].getElementsByTagName("nav");
    if (navs.length === 0) return false;
    var links = navs[0].getElementsByTagName("a");
    var linkurl;
    for (var i = 0; i < links.length; i++) {
        linkurl = links[i].getAttribute("href");
        if(window.location.href.indexOf(linkurl) !== -1) {
            links[i].className = "current";
        }
    }
}


function loadEvents() {
    highlightPage();
}
addLoadEvent(loadEvents);
