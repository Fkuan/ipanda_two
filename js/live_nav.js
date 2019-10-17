var sceneArr = [
    "scene_01",
    "scene_02",
    "scene_03",
    "scene_04",
    "scene_05",
    "scene_06",
    "scene_07",
    "scene_08",
    "scene_09",
    "scene_10",
    "scene_11",
    "scene_12",
    "scene_13",
    "scene_14",
    "scene_15",
    "scene_16",
    "scene_17",
    "scene_18",
    "scene_19",
    "scene_20",
    "scene_21",
    "scene_22",
    "scene_23",
    "scene_24",
    "scene_25",
    "scene_26",
    "scene_27",
    "scene_28",
    "scene_29",
    "scene_30",
    "scene_31",
    "scene_32",
    "scene_33",
    "scene_34",
    "scene_35",
    "scene_36",
    "scene_37",
    "scene_38",
    "scene_39",
    "scene_40",
    "scene_41",
    "scene_42",
    "scene_43",
    "scene_44",
    "scene_45",
    "scene_46",
];

var spotSite = [
    ["1.35" , "1.82"],
    ["1.22" , "1.85"],
    ["1.1" , "2.05"],
    ["1.14" , "1.79"],
    ["1.22" , "1.75"],
    ["0.92" , "1.99"],
    ["0.65" , "2.04"],
    ["1" , "1.7"],
    ["1" , "1.5"],
    ["0.95" , "1.3"],
    ["0.9" , "1.2"],
    ["0.75" , "0.87"],
    ["0.75" , "0.8"],
    ["0.7" , "0.64"],
    ["0.58" , "0.64"],
    ["0.55" , "0.78"],
    ["0.55" , "0.85"],
    ["0.48" , "0.9"],
    ["0.48" , "1"],
    ["0.52" , "1.15"],
    ["0.42" , "1.38"],
    ["0.8" , "1.79"],
    ["0.55" , "1.9"],
    ["0.5" , "1.8"],
    ["0.45" , "1.85"],
    ["0.52" , "1.35"],
    ["0.45" , "1.25"],
    ["0.52" , "1.18"],
    ["0.6" , "1.18"],
    ["0.9" , "1.7"],
    ["0.6" , "1.18"],
    ["0.6" , "1.7"],
    ["0.48" , "1.7"],
    ["0.52" , "1.35"],
    ["0.58" , "1.35"],
    ["0.68" , "1.3"],
    ["0.8" , "1.5"],
    ["0.4" , "1.65"],
    ["0.48" , "1.8"],
    ["0.55" , "1.85"],
    ["0.59" , "1.68"],
    ["0.7" , "1.56"],
    ["0.8" , "1.35"],
    ["0.65" , "1.4"],
    ["0.8" , "1.4"],
    ["0.6" , "1.18"]
];
//左边主题显示隐藏
$(document).ready(function(){
    
    $('.main_left_btn').click(function(){
        // $('.main_left').animate({width:"-382px"},500);
        $('.main_left').toggleClass("main_leftHidden")
        if($('.main_left').hasClass("main_leftHidden")){
            $('.main_left_btn').addClass("btnright")
        }else{
            $('.main_left_btn').removeClass("btnright")
        }
        // $('.main_left_btn').css("left",0)
    });

  });
  //直播列表的显示隐藏
  $('.fast_navigation_list').on("click", function(event){
    var $target = $(event.target);
    if( $target.is("li") ) {
     $target.next().slideToggle()
     $target.toggleClass("li_change")
    }
    else if( $target.is("span")||$target.is("p")||$target.is("i") ) {
        $target. parent().next().slideToggle()
        $target. parent().toggleClass("li_change")
       }
    });
    //自定义滚动条
    (function ($) {
        $(window).on("load", function () {
            
            $(".fast_navigation_list").mCustomScrollbar({
                axis: "y",
                autoHideScrollbar: true
            });
        });
    
    })(jQuery);

//左侧视频列表内容
// $.ajax({
//     url: "//api.cntv.cn/videoset/getVideoListByAlbumId",
//     type: "get",
//     dataType: "jsonp",
//     jsonpCallback: "jsonp_callback",
//     data: {
//         "serviceId": "panda",
//         "id": "VIDA34Cn5YM8xIhBsxFkertj170315",
//         "t":"jsonp",
//         "cb":"jsonp_callback"
//     },
//     success:function(data){
//         // console.log(data);
//         var itemList=data.itemList;
//         console.log(itemList);
//         itemList.forEach(function(item){
//             var videoImage = item.video_image;
//             var videoTitle = item.video_title;
//             var videoUrl = item.video_url;
//             var num = item.num;
//             var str=`
//                 <li>
//                     <span>${num}</span>
//                     <p>${videoTitle}</p>
//                     <i></i>
//                 </li>
//                 <div class="video">
//                 <img src=${videoImage} alt="">
//                 <a class="right_panda_play" href=${videoUrl} target="_blank">
//                     <img src="../img/live_nav/fn_video-1.png" alt=""> 
//                     <img class="videoPlay" src="../img/live_nav/fn_bofang.png" alt="">
//                 </a>
//                 </div>
//             `
//             $(".fast_navigation_list").append(str)          
//         })
//     },
//     error: function (err) {
//         console.log(err)
//     }
// });
