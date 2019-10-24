//自定义滚动条
(function ($) {
  $(window).on("load", function () {
    $(".list-box").mCustomScrollbar({
      axis: "y",
      autoHideScrollbar: true,
      autoDraggerLength: false,
      advanced: {
        updateOnContentResize: true
      }
    });
  });
})(jQuery);
$(window).on("load", function () {
  // 地球模型
  threeStart();
  setTimeout(function () {
    $(".list-container").fadeIn();
    //$(".guide").fadeIn();
    $(".guideBtn").fadeIn();
  }, 2800);
});

 

//loading
var loadingText = 0;
var loadingInter = setInterval(function () {
  loadingText++
  changeLoading(loadingText);
  if(loadingText >= 99){
    clearInterval(loadingInter);
  }
},25);


function changeLoading(loadingText){
  $(".progressChange").css("width",loadingText+'%')
  $(".progressChange span").text(loadingText+'%');
}



//guideClose
$(".guideClose").on("click",function(){
  $(".guide").fadeOut();
});
$(".guideBtn").on("click",function(){
  $(".guide").fadeIn();
});

// 下拉列表
$(".div-child-china").click(function () {
  $(".jd-box").slideToggle();
  $(".slide-down-icon").toggleClass("active")
});
//收起列表
$(".list-turn-up-button").click(function () {
  $(".list-box").slideUp();
  $(".list-turn-up-button").hide();
  $(".list-title-down").addClass("active");
});
$(".list-title").click(function () {

  if($(".list-title-down").hasClass("active")){
    $(".list-box").slideDown();
    $(".list-turn-up-button").show();


    $(".list-title-down").removeClass("active");
  }else {
    $(".list-box").slideUp();
    $(".list-turn-up-button").hide();
    $(".list-title-down").addClass("active");
  }

})

$(".label-btn a").hover(function () {
  $(this).parent(".label-btn").addClass("active");
},function () {
  $(this).parent(".label-btn").removeClass("active");
})



var renderer, clock, camera, scene, mesh, light, controls, canvas;
var spritePos;
var raycaster, mouse;
var object = null;


function initThree() {

  width = document.getElementById('canvas-frame').clientWidth;
  height = document.getElementById('canvas-frame').clientHeight;
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(width, height);
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
  // renderer.setClearColor(0x000000, 1);

  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(0,0, 100);

  scene = new THREE.Scene();
  var sceneTexture = new THREE.TextureLoader().load('img/bg.jpg');
  scene.background = sceneTexture;

  light = new THREE.AmbientLight(0xFFFFFF, 2);
  scene.add(light);
  //射线
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // controls控制器
  // clock = new THREE.Clock()
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  //阻尼（惯性）
  controls.enableDamping = true;
  //竖直旋转的角度

  // controls.minPolarAngle = 0;
  // controls.maxPolarAngle = Math.PI;

  controls.panSpeed = 0.5;
  controls.enablePan = false;
  controls.rotateSpeed = 0.5;
  // //鼠标
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: ''
  }
  controls.minDistance = 60;
  controls.maxDistance = 100;

  window.addEventListener("resize", onWindowResize, false) ;
  // window.addEventListener( 'mousewheel', mousewheel, { passive: false} );
  document.getElementById('canvas-frame').addEventListener('mousemove', onMouseMove , false) ;
  document.getElementById('canvas-frame').addEventListener("mousedown",onMouseClick,false);
}
function initObject() {
  //替换昼夜贴图
  var now = new Date();
  var hour = now.getHours();
  var skinUrl;
  if(hour>= 6 && hour <= 18){
    console.log('白天');
    skinUrl = "./obj/diqiu.jpg"
  }else{
    console.log('黑天');
    skinUrl = "./obj/diqiu-night.jpg"
  }

  var modeLoader = new THREE.FBXLoader();
  var imgLoader = new THREE.TextureLoader();
  imgLoader.load(skinUrl, function (texture) {
    modeLoader.load("./obj/diqiu.fbx", function (obj) {
      obj.traverse(function (child) {

        if (child.isMesh) {

          texture.magFilter = THREE.NearestFilter;
          texture.minFilter = THREE.NearestFilter;
          texture.anisotropy = 16;
          child.material.map = texture;
        }

      });
      // obj.rotation.x = Math.PI / 5;

      obj.scale.set(5,5,5);
      obj.name = "earth";
      object = obj;
      scene.add(object);

      // //循环外国城市
      for (var i = 0; i < foreignCountries.length; i++) {
        var foreign = foreignCountries[i].position;
        var foreignImgUrl = foreignCountries[i].url;
        var foreignRadius = foreignCountries[i].r;
        createSprites(foreign, i , foreignImgUrl , foreignRadius,foreignCountries,4,"外国");
      }
      // //循环动物园
      for(var a = 0 ; a < zoos.length ; a++){
        var zoo = zoos[a].position;
        var zooRadius = zoos[a].r;
        createSprites(zoo , a ,"img/countryIcon/zoo-icon1.png",zooRadius,zoos,0.8,"动物园")
      }

    }, function (progress) {
      var progressNum = progress.loaded / progress.total;
      progressNum = progressNum.toFixed(2) * 100;
      if(progressNum == 100){
        clearInterval(loadingInter);
        changeLoading(100);
        $(".earth-loading-box").fadeOut();
      }

    }, function (err) {
      // console.log(err)
    });
  })
}
//Raycaster
var changeObj = "",changeObjIndex = "";
function onMouseMove(event){
  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -( event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera( mouse , camera);
  var divText = document.getElementsByClassName("zoo")[0];
  var intersects = raycaster.intersectObjects(scene.children );
  divText.innerText = " ";

  if( intersects.length > 0){
    for(var i = 0; i < intersects.length; i++){
      if(intersects[ i ].object.useType === "动物园"){

        console.log(intersects[ i ].object.name , event.clientX)
        var zooName = intersects[ i ].object.name;

        divText.innerText = zooName;
        divText.style.display ="block";
        divText.style.left = event.clientX - 33  + 'px';
        divText.style.top = event.clientY -33 + 'px';
        return;
      }else if(intersects[ i ].object.useType === "外国"){
        var imageIndex = intersects[ i ].object.index;
        var interObj = intersects[ i ].object;
        changeObj = interObj;
        changeObjIndex = imageIndex;
        var textureLoader = new THREE.TextureLoader();
        textureLoader.load(foreignCountries[imageIndex].urlHover,function (texture) {
           interObj.material.map = texture;
          interObj.material.needsUpdate = true;
        })
      }else {
        divText.style.display ="none";
        if(changeObj !== ""){
          var textureLoader = new THREE.TextureLoader();
          textureLoader.load(foreignCountries[changeObjIndex].url,function (texture) {
            changeObj.material.map = texture;
            changeObj.material.needsUpdate = true;
          })
        }


      }

    }
  }else {
    divText.style.display ="none";
    if(changeObj !== ""){
      var textureLoader = new THREE.TextureLoader();
      textureLoader.load(foreignCountries[changeObjIndex].url,function (texture) {
        changeObj.material.map = texture;
        changeObj.material.needsUpdate = true;
        changeObj = "";
      })

    }
  }

}


function onMouseClick(event) {
  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -( event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera( mouse , camera);
  var intersects = raycaster.intersectObjects(scene.children );

  if( intersects.length > 0){
    for(var i = 0; i < intersects.length; i++){
      if(intersects[ i ].object.useType === "动物园"){

        console.log(intersects[ i ].object.name , event.clientX)
        var zooName = intersects[ i ].object.name;
        console.log(intersects[ i ].object.index)
      //  点击动物园执行事件


      }else if(intersects[ i ].object.useType === "外国"){
        var imageIndex = intersects[ i ].object.index;
        console.log(intersects[ i ].object.name)
      //  点击外国图标执行事件



      }

    }
  }

}

//加精灵
function createSprites(lon, i ,imgUrl,radius,infoArr,scale,type) {
  var textureLoader = new THREE.TextureLoader();

  textureLoader.load(imgUrl, function (texture) {
    var spriteMaterials = new THREE.SpriteMaterial({
      map: texture
    });
    spritePos = new THREE.Sprite(spriteMaterials);
    spritePos.index = i;
    spritePos.useType = type;
    spritePos.name = infoArr[i].name;
    scale  = scale || 1;
    spritePos.scale.set(scale,texture.image.height / texture.image.width * scale ,1 );
    var position = createPosition(lon,radius);
    spritePos.position.set(position.x + 1, position.y + 1, position.z + 1);
    scene.add(spritePos);
  });

}

//转换经纬度
function createPosition(lnglat,radius) {
  var spherical = new THREE.Spherical();
  spherical.radius = radius; // 31.5
  const lng = lnglat[0] - 205; // -200 经度
  const lat = lnglat[1] - 2; // -36 纬度
  const theta = (lng + 90) * (Math.PI / 180);
  const phi = (90 - lat) * (Math.PI / 180);
  spherical.phi = phi;
  spherical.theta = theta;
  var position = new THREE.Vector3();
  position.setFromSpherical(spherical);
  return position;

}


//给标签赋坐标
function updateScreenPosition() {
  var canvas = renderer.domElement;

  countries.forEach(function (countryItem,countryIndex) {
    var countryPos = countryItem.position;
    var label_pos = createPosition(countryPos,31.5);
    var show = updateAnnotationOpacity(label_pos);
    var vector = new THREE.Vector3(label_pos.x, label_pos.y, label_pos.z);

    vector.project(camera);
    // vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
    // vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));

    vector.x = (0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio);
    vector.y = (0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio);

    var labelBox = $(".label-btn")[countryIndex];
    labelBox.style.top = vector.y  + "px"; //80
    labelBox.style.left = vector.x  + "px";
    labelBox.style.display = show ? "none" : "block";

  })



}
//转换透明度
function updateAnnotationOpacity(position) {
  var meshDistance = camera.position.distanceTo(object.position);

  var spriteDistance = camera.position.distanceTo(position);

  var spriteBehindObject = spriteDistance >  meshDistance - 20;
  return spriteBehindObject;

}

function threeStart() {
  initThree();
  initObject();
  animation();

}

function animation() {
  requestAnimationFrame(animation);
  render();
};


function render() {
  // var delta = clock.getDelta()
  controls.update(); //更新控制器.
  renderer.render(scene, camera);
  if (object) {
    updateScreenPosition();
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
var countries = [{
  name: "中国大熊猫保护研究中心",
  position: [103.62, 31]
},
  {
    name: "成都大熊猫繁育研究基地",
    position: [108.06, 30.67]
  }
]
var zoos = [
  {
    name: "北京动物园",
    position: [112, 39.56],
    r:31
  },
  {
    name: "上海动物园",
    position: [118.2, 30],
    r:31
  },
  {
    name: "广州动物园",
    position: [110, 23.6],
    r:31
  },
  {
    name: "澳门动物园",
    position: [111.2, 21.2],
    r:31
  },
  {
    name: "香港动物园",
    position: [112.7, 21.8],
    r:31
  },
  ];
var foreignCountries = [
  {
    name: "美国",
    position: [70,40],
    url:'img/countryIcon/russia.png',
    urlHover:'img/countryIcon/russia-hover.png',
    r:33
  },
  {
    name: "德国",
    position: [10.27, 51.09],
    url:'img/countryIcon/russia.png',
    urlHover:'img/countryIcon/russia-hover.png',
    r:33
  },
  {
    name: "俄罗斯",
    position: [37.37, 55.45],
    url:'img/countryIcon/russia.png',
    urlHover:'img/countryIcon/russia-hover.png',
    r:33
  },

  {
    name: "印度尼西亚",
    position: [106.49, -6.09],
    url:'img/countryIcon/russia.png',
    urlHover:'img/countryIcon/russia-hover.png',
    r:33
  },

  {
    name: "日本",
    position: [130.75, 35.67],
    url:'img/countryIcon/russia.png',
    urlHover:'img/countryIcon/russia-hover.png',
    r:31.5
  }

];









