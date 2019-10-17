var krpano = $("#krpanoSWFObject")[0];

function locationFloor(){
    //全景图的角度
    var hlookat = krpano.get("view.hlookat")

    console.log(hlookat)
    var sceneName = krpano.get("xml.scene");
    var num = sceneName.split("_")[1]
    if(num <= 6){
        $(".chengdu_map").show()
        $(".dujiangyan_map").hide()
        $(".position_text").text("回望1869-纪念大熊猫科学发现150周年系列活动特展")
        $(".introduce p").text("展览根据时间线，分为“伴你回家”、“迁地保护”、“熊猫与世界”和“回到1869”四个展厅，集中展示了大量具有史料价值的图片、文字，对人类认知大熊猫的历史进行了全面梳理。")
    }else{
        $(".chengdu_map").hide()
        $(".dujiangyan_map").show()
        $(".position_text").text("大熊猫博物馆")
        $(".introduce p").text("展览较系统地介绍了大熊猫的演化历史、古今分布概况、大熊猫野外生态习性、解剖生物学特征，野外保护大熊猫及人工繁育大熊猫成果等，让人们全面认识大熊猫及大熊猫生存环境。")
    }
    $(".map_spot").each(function(index,ele){
        if($(ele).attr("data-scene") == sceneName){
            $(ele).addClass("on").siblings().removeClass("on")
            $(ele).children("span").hide().parent().siblings().children("span").show()
        }
    })
}
$(".map_spot").click(function(){
    $(this).addClass("on").siblings().removeClass("on")
    $(this).children("span").hide().parent().siblings().children("span").show()
    var scene_num = $(this).attr("data-scene")
    krpano.call("loadscene("+ scene_num +",null, MERGE, OPENBLEND(1.0, -0.5, 0.3, 0.8, linear));");
})
$(".map_spot").first().click()
$(".main_left_btn").click(function(){
    $(this).toggleClass("on")
    if($(this).hasClass("on")){
        $(".left_content").addClass("hideLeft")
    }else{
        $(".left_content").removeClass("hideLeft")
    }
})
$(".haveSay").click(function(){
    $(this).hide()
    $(".speak").slideToggle()
})
$(".close_speak").click(function(){
    $(".speak").slideToggle()
    $(".haveSay").show(500)
})

$(".scienceContent").mCustomScrollbar();



$.ajax({
    url: "//api.cntv.cn/videoset/getVideoListByAlbumId",
    type: "get",
    dataType: "jsonp",
    jsonpCallback: "jsonp_callback",
    data: {
        "serviceId": "panda",
        "id": "VIDAphkcsaGydCNv7nkBqRm1160905",
        "t":"jsonp",
        "cb":"jsonp_callback"
    },
    success:function(data){
        var itemList=data.itemList;
        // console.log(itemList);
        itemList.forEach(function(item){
            var videoImage = item.video_image;
            var videoTitle = item.video_title;
            var videoUrl = item.video_url;
        //     $(".scienceContent").append("<li class=\"lis2\">\n" +
        //         "<div class=\"right_panda\">\n" +
        //         "<img class=\"pandaVideoImg\" src= " + videoImage + "  alt=\"\">\n" +
        //         "<a class=\"right_panda_play\" href= "+ videoUrl + " target=\"_blank\" ></a>\n" +
        //         "</div>\n" +
        //         "<div class=\"right_word\">\n" +
        //         videoTitle  +
        //         "</div>\n" +
        //         "</li>")
        })
        console.log(12347891)
        console.log(data)
    },
    error: function (err) {
        console.log(err)
    }
});

