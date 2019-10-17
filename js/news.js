$(".newsClose").on("click",function(){
    history.go(-1);
});
$(window).on("mouseover",function(){
    console.log($(window).scrollTop()) 
    if($(window).scrollTop()>=300){
        $(".topBack").fadeIn(300);
    }else{
        $(".topBack").fadeOut(300);
    }
});
$(".topBack").on("click",function(){
    var s=0;
　　　　$('body,html').animate({
　　　　　　scrollTop:s,
　　　　},30)
});
