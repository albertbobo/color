// JavaScript Document
function change_bg(obj){
    var a=document.getElementById("Menu").getElementsByTagName("a");
    for(var i=0;i<a.length;i++){
        a[i].className="";
    }
    obj.className="current";
}

function change_bg02(obj){
    var a=document.getElementById("Menu02").getElementsByTagName("a");
    for(var i=0;i<a.length;i++){
        a[i].className="";
    }
	if(i==0){
		obj.className="current02";
	}else{
		obj.className="current03";
	}
}

