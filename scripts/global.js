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

// pages/works 点击侧栏显示相应的内容
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
    var sidebars = document.getElementsByClassName("sidebar");
    var selectedStudents = document.getElementsByClassName("selected-students")[0];
    var sidebarTeachers = document.getElementsByClassName("sidebar-teachers")[0];
    if (sidebars.length === 0) return false;
    var sidebar = sidebars[0];
    var links = sidebar.getElementsByTagName("a");

    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1];
        links[i].destination = sectionId;    // 解决sectionId是局部变量的问题，为每个链接创建一个自定义属性destination
        links[i].onclick = function () {
            // 切换按钮样式
            if (this.destination === "students-works") {
                selectedStudents.className = "selected-students";
                sidebarTeachers.className = "sidebar-teachers";
            }
            if (this.destination === "teachers-works") {
                sidebarTeachers.className = "selected-teachers";
                selectedStudents.className = "sidebar-students";
            }

            showSection(this.destination);
            return false;
        }
    }
}

// 轮播图
function prepareSlideshow() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var slideshow = document.getElementsByClassName("slideshow")[0];
    var list = document.getElementsByClassName("list")[0];
    var btns = document.getElementsByClassName("buttons");
    if (btns.length === 0) return false;
    var buttons = btns[0].getElementsByTagName("span");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var timer;
    var index = 1;

    list.style.left = "0";
    buttons[0].className = "on";

    function animate(offset) {
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + "px";
        // 无限滚动判断
        if (newLeft < -919) {
            list.style.left = 0 + "px";
        }
        if (newLeft > 0) {
            list.style.left = -919 + "px";
        }
    }

    function play() {
        // 重复执行定时器
        timer = setInterval(function () {
            next.onclick();
        }, 4000)
    }

    function stop() {
        clearInterval(timer);
    }

    // 小圆点
    function showButtons() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className === "on") {
                buttons[i].className = "";
            }
        }
        buttons[index - 1].className = "on";
    }

    function clickButtons() {
        for (var i = 0; i < buttons.length; i++) {
            (function (i) {
                buttons[i].onclick = function () {
                    var clickIndex = this.getAttribute("index");
                    var offset = 919 * (index - clickIndex);
                    animate(offset);
                    index = clickIndex;
                    showButtons();
                }
            })(i);
        }
    }

    prev.onclick = function () {
        index -= 1;
        if (index < 1) {
            index = 2;
        }
        showButtons();
        animate(919);
    };

    next.onclick = function () {
        index += 1;
        if (index > 2) {
            index = 1;
        }
        showButtons();
        animate(-919);
    };

    slideshow.onmouseover = stop;
    slideshow.onmouseout = play;
    play();
    clickButtons();
}


function loadEvents() {
    highlightPage();
    prepareInternalnav();
    prepareSlideshow();
}

addLoadEvent(loadEvents);
