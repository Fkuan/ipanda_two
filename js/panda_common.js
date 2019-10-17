//测点工具
function getlookat() {
    var krpano = document.getElementById("krpanoSWFObject");
    if (krpano && krpano.get) // it can take some time until krpano is loaded and ready
    {
        krpano.call("screentosphere(mouse.x, mouse.y, mouseath, mouseatv); js( showmouseinfo() );");
    }
}

function showmouseinfo() {
    var krpano = document.getElementById("krpanoSWFObject");
    var mouse_at_x = krpano.get("mouse.x");
    var mouse_at_y = krpano.get("mouse.y");
    var mouse_at_h = krpano.get("mouseath");
    var mouse_at_v = krpano.get("mouseatv");
    console.log("ath=" + '"' + mouse_at_h.toFixed(2) + '"' + " " + "atv=" + '"' + mouse_at_v.toFixed(2) + '"');
}

document.onmousedown = getlookat; // mozilla

var krpano = $("#krpanoSWFObject")[0];
//操作盘
$(".add").on("click", function () {
    /*放大*/
    krpano.set("fov_moveforce", -1);
    setTimeout("krpano.set('fov_moveforce',0)", 200);
});

$(".reduce").on("click", function () {
    /*缩小*/
    krpano.set("fov_moveforce", 1);
    setTimeout("krpano.set('fov_moveforce',0)", 200);
});

$(".auto").on("click", function () {

    $(".speak").slideUp("slow");
    $(".haveSay").stop(true, false).slideDown("slow");
    if (!$('.main_left_btn').hasClass("main_leftHidden")) {
        $('.main_left').addClass("main_leftHidden")
    }
    
    // 自动旋转
    if ($(this).hasClass("on")) {
        
        $(this).removeClass("on");
        krpano.set("autorotate.enabled", false);
    } else {
        
        $(this).addClass("on");
        krpano.set("autorotate.enabled", true);
        bombtimer(0);

    }
});
// 场景切换
$(".arrow_up").on("click", function () {
    /*前进*/
    var sceneIndex = krpano.get("scene[get(xml.scene)].index");
    sceneIndex++;

    if (sceneIndex >= krpano.get("scene.count")) {
        sceneIndex = 0;
    }
    $(".location-map").text(" ");
    var newSceneName = krpano.get("scene[" + sceneIndex + "].name");
    krpano.call("loadscene(" + newSceneName + ",null, MERGE, OPENBLEND(1.0, -0.5, 0.3, 0.8, linear));");

});
$(".arrow_down").on("click", function () {
    /*后退*/
    $(".location-map").text(" ");
    var sceneIndex = krpano.get("scene[get(xml.scene)].index");
    sceneIndex--;
    if (sceneIndex < 0) {
        sceneIndex = krpano.get("scene.count") - 1;
    }
    var newSceneName = krpano.get("scene[" + sceneIndex + "].name");
    krpano.call("loadscene(" + newSceneName + ",null, MERGE, OPENBLEND(1.0, -0.5, 0.3, 0.8, linear));");
});
//自动巡游
var timerLine;
var isAuto = false;

function bombtimer(timer) {
    var rotateState = krpano.get("autorotate.enabled");
    if (rotateState) {
        isAuto = true;
        timer++;
        timerLine = setTimeout(function () {
            bombtimer(timer);
        }, 1000);

        var rotateSpeed = Math.abs(krpano.get("autorotate.speed"));
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if (isIE) {
            if (isIE11 || isEdge) {
                rotateSpeed = 10;
            }
        }
        var timeAll = 300 / rotateSpeed;
        timeAll += krpano.get("autorotate.waittime");
        if (timer >= timeAll) {
            timer = 0;
            nextscene();
        }
    }

}

function nextscene() {
    var nowSceneName = krpano.get("xml.scene");
    var sceneIndex = getIndex(nowSceneName, sceneArr);
    sceneIndex++;
    if (sceneIndex >= sceneArr.length) {
        sceneIndex = 0;
    }
    krpano.call("loadscene(" + sceneArr[sceneIndex] + ",null, MERGE, OPENBLEND(1.0, -0.5, 0.3, 0.8, linear));");
}

function getIndex(indexName, nameArr) {
    for (var i = 0; i < nameArr.length; i++) {
        if (indexName === nameArr[i]) {
            return i;
        }
    }
}

//点击任何地方取消自动巡游(除自动巡游按钮)
$(document).on("click", function (event) {
    if (event.target !== $(".auto")[0]) {
        if (isAuto) {
            if (timerLine) {
                $(".auto").removeClass("on");

                clearInterval(timerLine);
                krpano.set("autorotate.enabled", "false")
            }
        }
    }
});