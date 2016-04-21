/**
 * Created by reborn36 on 2016/4/19.
 */

var flag = 0;//用于解决左右入之间的margin

window.onload = function(){
    var lin = document.getElementById("l_in");
    var rin = document.getElementById("r_in");
    var lout = document.getElementById("l_out");
    var rout = document.getElementById("r_out");
    var random = document.getElementById("random");
    var output = document.getElementById("output");
    var sort = document.getElementById("sort");
    lin.onclick = function(){
        if(input_legal()){
            left_in()
        }
    };
    rin.onclick = function(){
        if(input_legal()){
            right_in()
        }
    };
    lout.onclick = function(){
//        var output = document.getElementById("output");
        output.removeChild(output.firstChild);
    };
    rout.onclick = function(){
//        var output = document.getElementById("output");
        output.removeChild(output.lastChild);
    };

    random.onclick = function(){
        random_50();
    };

    sort.onclick = function(){
        var i = 0;
        var n = output.childNodes.length;
        var BS = setInterval(function(){
            if(i>n){
                clearInterval(BS);
                return;
            }
            BubbleSort(i);
            i++
        },500);
    };

    output.onmouseover = function () {
        var div = output.getElementsByTagName("div");
        for (var i = 0; i < div.length; i++) {
            div[i].onclick = (function (del, n) {
                return function(){
                    del_child(del[n]);
                }
            })(div, i);
        }
    };
};

//判断输入合法性
function input_legal(){
    var num = /^[-+]?\d+(\.\d+)?$/;
    var input = document.getElementsByTagName("input")[0].value;
    var output = document.getElementById("output");
    input = input.replace(/(^\s*)|(\s*$)/g, "");
    if(num.test(input)){
        if(output.childNodes.length>=60){
            alert("最大容纳60个数");
            return false;
        }
        if(input<=100 && input>=10){
            return true;
        }
        else{
            alert("输入范围10~100");
            return false;
        }
    }
    else{
        alert("请输入数字");
        return false;
    }
}

//左侧入
function left_in(){
    var input = document.getElementsByTagName("input")[0];
    var re_input = input.value.replace(/(^\s*)|(\s*$)/g, "");
    var output = document.getElementById("output");
    var div = document.createElement("div");
    div.style.height = re_input*5+'px';
    div.style.width = '15px';
    div.id = re_input;
    div.style.display = 'inline-block';
    div.style.backgroundColor = '#FF0000';
    div.style.marginLeft = '3px';
    div.style.cursor = 'pointer';
    output.insertBefore(div,output.firstChild);
    input.value = null;
    if(flag===0){
        flag = 1;
    }
}

//右侧入
function right_in(){
    var input = document.getElementsByTagName("input")[0];
    var re_input = input.value.replace(/(^\s*)|(\s*$)/g, "");
    var output = document.getElementById("output");
    var div = document.createElement("div");
    div.style.height = re_input*5+'px';
    div.style.width = '15px';
    div.id = re_input;
    div.style.display = 'inline-block';
    div.style.backgroundColor = '#FF0000';
    div.style.marginLeft = '3px';
    div.style.cursor = 'pointer';
    if(flag === 1){
        div.style.marginLeft = '-2px';
        flag = -1;
    }
    output.appendChild(div);
    input.value = null;
}

//删除子节点
function del_child(div){
    var parent = div.parentNode;
    parent.removeChild(div);
}

//随机生成50个数
function random_50(){
    var output = document.getElementById("output");
    output.innerHTML = "";
    var i = 0;
    while(i<50){
        var n = Math.random()*100;
        if(n<10 || n>100){
            continue;
        }
        var div = document.createElement("div");
        div.style.height = n*5+'px';
        div.style.width = '15px';
        div.id = n;
        div.style.display = 'inline-block';
        div.style.backgroundColor = '#FF0000';
        div.style.marginLeft = '3px';
        div.style.cursor = 'pointer';
        output.appendChild(div);
        i++;
    }
}

function BubbleSort(j){
    var output = document.getElementById("output");
    var a = output.childNodes;
    var n = output.childNodes.length;

    var i = 0;
    var BS = setInterval(function(){
        if(i>n-j){
            clearInterval(BS);
            a[i].style.backgroundColor = '#FF0000';
            return;
        }
        if (a[i].id > a[i + 1].id) {
            a[i].style.backgroundColor = '#00FF00';
            output.insertBefore(output.childNodes[i+1],output.childNodes[i]);
        }
        i++;
    },10);
}

