
!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.BubbleHearts = e()
}(this, function() {
    "use strict";
    function t(t, n, r) {
        var i = e.uniformDiscrete(89, 91) / 100
            , o = 1 - i
            , u = (e.uniformDiscrete(45, 60) + e.uniformDiscrete(45, 60)) / 100
            , a = function(t) {
            return t > i ? Math.max(((1 - t) / o).toFixed(2), .1) * u : u
        }
            , c = e.uniformDiscrete(-30, 30)
            , f = function(t) {
            return c
        }
            , h = 10
            , s = n.width / 2 + e.uniformDiscrete(-h, h)
            , d = (n.width - Math.sqrt(Math.pow(t.width, 2) + Math.pow(t.height, 2))) / 2 - h
            , l = e.uniformDiscrete(.8 * d, d) * (e.uniformDiscrete(0, 1) ? 1 : -1)
            , m = e.uniformDiscrete(250, 400)
            , w = function(t) {
            return t > i ? s : s + l * Math.sin(m * (i - t) * Math.PI / 180)
        }
            , v = function(e) {
            return t.height / 2 + (n.height - t.height / 2) * e
        }
            , p = e.uniformDiscrete(14, 18) / 100
            , g = function(t) {
            return t > p ? 1 : 1 - ((p - t) / p).toFixed(2)
        };
        return function(e) {
            if (!(e >= 0))
                return !0;
            r.save();
            var n = a(e)
                , i = f(e)
                , o = w(e)
                , u = v(e);
            r.translate(o, u),
                r.scale(n, n),
                r.rotate(i * Math.PI / 180),
                r.globalAlpha = g(e),
                r.drawImage(t, -t.width / 2, -t.height / 2, t.width, t.height),
                r.restore()
        }
    }
    var e = function(t) {
        var e = t
            , n = Math.floor
            , r = Math.random;
        return t.uniform = function(t, e) {
            return t + (e - t) * r()
        }
            ,
            t.uniformDiscrete = function(t, r) {
                return t + n((r - t + 1) * e.uniform(0, 1))
            }
            ,
            t
    }({})
        , n = function(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
        , r = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                "value"in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r)
            }
        }
        return function(e, n, r) {
            return n && t(e.prototype, n),
            r && t(e, r),
                e
        }
    }()
        , i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(t) {
        return setTimeout(t, 16)
    }
        , o = function() {
        function o() {
            n(this, o);
            var t = this.canvas = document.createElement("canvas")
                , e = this.context = t.getContext("2d")
                , r = this._children = []
                , u = function n() {
                i(n),
                    e.clearRect(0, 0, t.width, t.height);
                for (var o = 0, u = r.length; o < u; ) {
                    var a = r[o];
                    a.render.call(null, (a.timestamp + a.duration - new Date) / a.duration) ? (r.splice(o, 1),
                        u--) : o++
                }
            };
            i(u)
        }
        return r(o, [{
            key: "bubble",
            value: function(n) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.uniformDiscrete(2400, 3600)
                    , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t(n, this.canvas, this.context);
                return this._children.push({
                    render: i,
                    duration: r,
                    timestamp: +new Date
                }),
                    this
            }
        }]),
            o
    }();
    return o
});
var assets = ['../img/icon_four/1.png'];
var images = [];
assets.forEach(function(src, index) {
    // assets[index] = new Promise(function(resolve) {
    //         var img = new Image;
    //         img.onload = resolve.bind(null, img);
    //         img.src = src;
    //     }
    // );
    var img = new Image;
    img.onload = function () {
       images.push(img)
    };
    img.src = src;
});

var random = {
    uniform: function(min, max) {
        return min + (max - min) * Math.random();
    },
    uniformDiscrete: function(j,i) {
        return i + Math.floor(( i - j + 1) * random.uniform(0, 1));
    }
};
var stage = new BubbleHearts();
var canvas = stage.canvas;
var zanIcon = document.getElementsByClassName('zan_icon');
canvas.width = 300;
canvas.height = 170;
canvas.style['width'] = '300px';
canvas.style['height'] = '170px';
canvas.classList.add("canvas-class");
canvas.classList.add("canvas-show");
if(document.getElementsByClassName('zanPic').length > 0){
    document.getElementsByClassName('zanPic')[0].appendChild(canvas);
    zanIcon[0].addEventListener("click",function () {
        
        if(zanIcon[0].classList.contains("click_zan_icon2")){
            // canvas.classList.add("canvas-show");
        }else{
            document.getElementsByClassName('zanPic')[0].style.display = "block";
            canvas.classList.remove("canvas-show");
            stage.bubble(images[random.uniformDiscrete(0, images.length - 1)]);
            zanIcon[0].classList.add("click_zan_icon2");
            // setTimeout(function(){
            //     canvas.classList.add("canvas-show");
            // },2500)
            setTimeout(function(){
                postLike();
                canvas.classList.add("canvas-show");
                document.getElementsByClassName('zanPic')[0].style.display = "none";
            },2501)
        }

    })
}

if(document.getElementsByClassName("like").length > 0){
    document.getElementsByClassName("like")[0].appendChild(canvas);
    document.getElementsByClassName("like")[0].addEventListener("click",function () {
        if(this.classList.contains("likes")){
            // canvas.classList.add("canvas-show");
        }else{
            canvas.classList.remove("canvas-show");
            stage.bubble(images[random.uniformDiscrete(0, images.length - 1)]);
            this.classList.add("likes");
            // setTimeout(function(){
            //     canvas.classList.add("canvas-show");
            // },2500)
            setTimeout(function(){
                postLike();
                canvas.classList.add("canvas-show");
            },2501)
        }

    })
}


//
// Promise.all(assets).then(function(images) {
//     var random = {
//         uniform: function(min, max) {
//             return min + (max - min) * Math.random();
//         },
//         uniformDiscrete: function(i, j) {
//             return i + Math.floor((j - i + 1) * random.uniform(0, 1));
//         }
//     };
//     var stage = new BubbleHearts();
//     var canvas = stage.canvas;
//     var zanIcon = document.getElementsByClassName('zan_icon2');
//     canvas.width = 170;
//     canvas.height = 300;
//     canvas.style['width'] = '170px';
//     canvas.style['height'] = '300px';
//     canvas.classList.add("canvas-class");
//     canvas.classList.add("canvas-show");
//     document.getElementsByClassName('operation_board_box')[0].appendChild(canvas);
//     zanIcon[0].addEventListener("click",function () {
//         if(zanIcon[0].classList.contains("click_zan_icon2")){
//             // canvas.classList.add("canvas-show");
//         }else{
//             canvas.classList.remove("canvas-show");
//             stage.bubble(images[random.uniformDiscrete(0, images.length - 1)]);
//             zanIcon[0].classList.add("click_zan_icon2");
//             // setTimeout(function(){
//             //     canvas.classList.add("canvas-show");
//             // },2500)
//             setTimeout(function(){
//                 postLike();
//             },2501)
//         }
//
//     })
// });

//传点赞数据
function postLike(){
    $.ajax({
        url: "//api.itv.cntv.cn/praise/add",
        type: "post",
        dataType: "jsonp",
        jsonp: "jsonp_callback",
        data: {
            "type":"ipanda",
            "id":"IPANDAworld",
            "num": 1,
        },
        success: function(data) {
            if (data.msg === "OK") {
                // alert("点赞成功");
            } else {
                // alert("点赞失败");
            }
        },
        error: function(err) {
            console.log(err);
        }
    })
}
