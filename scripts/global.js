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
        if (window.location.href.indexOf(linkurl) !== -1) {
            links[i].className = "current";
        }
    }
}

// pages/works 点击子导航显示相应的内容
function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") === id) {
            sections[i].style.display = "block";
        } else {
            sections[i].style.display = "none";
        }
    }
}
function prepareInternalnav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var subnavs = document.getElementsByClassName("subnav");
    if (subnavs.length === 0) return false;
    var subnav = subnavs[0];
    var links = subnav.getElementsByTagName("a");

    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1];
        links[i].destination = sectionId;    // 解决sectionId是局部变量的问题，为每个链接创建一个自定义属性destination
        links[i].onclick = function () {
            showSection(this.destination);
            return false;
        }
    }
}


function loadEvents() {
    highlightPage();
    prepareInternalnav();
}

addLoadEvent(loadEvents);
