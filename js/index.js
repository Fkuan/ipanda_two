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
    $(".guide").fadeIn();
    $(".guideBtn").fadeIn();
  }, 2800);
});

 

//loading
var baifen = 0;
var loadTime = setInterval(() => {
  var proWidth = parseInt($(".progressChange").css("width"));
  
  console.log(proWidth)
  proWidth += 210;
  baifen += 42;
  if (proWidth < 481) {
    $(".progressChange span").text(baifen+'%')
    console.log(baifen)
    $(".progressChange").css("width", proWidth + 'px')
    proWidth += 40;
    baifen += 9;
  } else {
    clearInterval(loadTime);
  }
}, 300);
//guideClose
$(".guideClose").on("click",function(){
  $(".guide").fadeOut();
})
$(".guideBtn").on("click",function(){
  $(".guide").fadeIn();
})

// 下拉列表
$(".div-child-china").click(function () {
  $(".jd-box").slideToggle();
});
//收起列表
$(".list-turn-up-button").click(function () {
  $(".list-box").slideUp();
  $(".list-turn-up-button").hide();
});
$(".list-title").click(function () {
  $(".list-box").slideDown();
  $(".list-turn-up-button").show();
})


var renderer, clock, camera, scene, mesh, light, controls, canvas;
var spritePos;
var raycaster, mouse;
var annotation = document.querySelector(".annotation");
var annotation2 = document.querySelector(".annotation2");
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

  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(-13, 0, 100);

  scene = new THREE.Scene();
  var sceneTexture = new THREE.TextureLoader().load('img/bg.jpg');
  scene.background = sceneTexture;

  light = new THREE.AmbientLight(0xFFFFFF, 2);
  scene.add(light);
  renderer.domElement.style.display = "none";
  //射线
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // controls控制器
  clock = new THREE.Clock()
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  //阻尼（惯性）
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  //竖直旋转的角度
  controls.minPolarAngle = Math.PI * 0.4;
  controls.maxPolarAngle = Math.PI * 0.6;

  controls.panSpeed = 0.5;
  controls.enablePan = false;
  controls.rotateSpeed = 0.5;
  // //鼠标
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: ''
  }
  controls.minDistance = 55;
  controls.maxDistance = 200;

  window.addEventListener("resize", onWindowResize, false) ;
  window.addEventListener( 'mousewheel', mousewheel, { passive: false} );
  window.addEventListener('mousemove', onZooMouseMove , false) ;
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
      obj.rotation.x = Math.PI / 20; //5
      obj.scale.set(3.8, 3.8, 3.8);
      // obj.position.x =13;
      obj.name = "earth";
      object = obj;
      scene.add(object);
      renderer.domElement.style.display = "block";

      //循环国家
      for (var i = 0; i < countries.length; i++) {
        var country = countries[i].position;
        createSprites(country, i);
      }
      //循环外国城市
      for (var i = 0; i < foreignCountries.length; i++) {
        var foreign = foreignCountries[i].position;
        var foreignImgUrl = foreignCountries[i].url;
        var foreignRadius = foreignCountries[i].r;
        createMapSprites(foreign, i , foreignImgUrl , foreignRadius);
      }
      //循环动物园
      for(var a = 0 ; a < zoos.length ; a++){
        var zoo = zoos[a].position;
        zooRadius = zoos[a].r;
        console.log("动物园",zoo ,a ,zooRadius)
        createSpritesZoo(zoo , a ,zooRadius)
      }

    }, function (progress) {
      // console.log(progress)
    }, function (err) {
      // console.log(err)
    });
  })
}
//Raycaster
function onZooMouseMove(event){
  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -( event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera( mouse , camera);
  var divText = document.getElementsByClassName("zoo")[0];
  var intersects = raycaster.intersectObjects(scene.children );
  divText.innerText = " ";
  if( intersects.length > 0){
    for(var i = 0; i < intersects.length; i++){

      if(intersects[ i ].object.name === "北京动物园" || intersects[ i ].object.name === "上海动物园" || intersects[ i ].object.name === "广州动物园" || intersects[ i ].object.name === "澳门动物园" || intersects[ i ].object.name === "香港动物园"){

        console.log(intersects[ i ].object.name , event.clientX)
        var zooName = intersects[ i ].object.name;

        divText.innerText = zooName;
        divText.style.display =" block";
        divText.style.position = "absolute";
        divText.style.left = event.clientX - 33  + 'px';
        divText.style.top = event.clientY -33 + 'px';
        return;
      }else{
        divText.style.display =" none";
      }

    }
  }

}

//鼠标滑轮事件
function mousewheel(e) {
  var fov = 40;
  var near = 1;//最小范围
  var far = 1000;//最大范围
  e.preventDefault();
  // e.stopPropagation();
  if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
    if (e.wheelDelta > 0) { //当滑轮向上滚动时
      fov -= (near < fov ? 1 : 0);
      console.log('向上')
    }
    if (e.wheelDelta < 0) { //当滑轮向下滚动时
      fov += (fov < far ? 1 : 0);
      console.log('向下')
    }
  } else if (e.detail) {  //Firefox滑轮事件
    if (e.detail > 0) { //当滑轮向上滚动时
      fov -= 1;
      console.log('向上')
    }
    if (e.detail < 0) { //当滑轮向下滚动时
      fov += 1;
      console.log('向上')
    }
  }
  camera.fov = fov;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);

}
//加精灵
function createSprites(lon, i ) {
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load("img/sprite1.png", function (texture) {
    var spriteMaterials = new THREE.SpriteMaterial({
      map: texture
    });

    spritePos = new THREE.Sprite(spriteMaterials);

    spritePos.index = i;

    spritePos.name = countries[i].name;

    // spritePos.scale.set(1 ,1 ,1 );

    var position = createPosition(lon);

    spritePos.position.set(position.x + 1, position.y + 1, position.z + 1);

    scene.add(spritePos);
  });

}
//国外国家的精灵图
function createMapSprites(foreign, i , foreignImgUrl , foreignRadius) {
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load( foreignImgUrl, function (texture) {
    var materialB = new THREE.SpriteMaterial({
      map: texture
    });

    var mapPos = new THREE.Sprite(materialB);
    mapPos.scale.set(2 ,2 ,2 );

    mapPos.name = foreignCountries[i].name;
    var mapPlaces = createPosition2(foreign , foreignRadius);
    mapPos.position.set(mapPlaces.x + 1, mapPlaces.y + 1, mapPlaces.z + 1);

    scene.add(mapPos);

  });
}
//zoo精灵
function createSpritesZoo(zoo, i ,zooRadius ) {
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load("img/countryIcon/zoo-icon1.png", function (texture) {
    var spriteMaterials = new THREE.SpriteMaterial({
      map: texture
    });

    var zooPos = new THREE.Sprite(spriteMaterials);

    zooPos.index = i;

    zooPos.name = zoos[i].name;

    zooPos.scale.set(0.5 ,0.5 ,0.5 );

    var position = createPositionZoo(zoo , zooRadius);

    zooPos.position.set(position.x + 1, position.y + 1, position.z + 1);

    scene.add(zooPos);
  });

}


//转换经纬度
function createPosition(lnglat) {
  var spherical = new THREE.Spherical
  spherical.radius = 22; // 24
  const lng = lnglat[0] - 205; // -200
  const lat = lnglat[1] -10; // -36
  const theta = (lng + 90) * (Math.PI / 180)
  const phi = (90 - lat) * (Math.PI / 180)
  spherical.phi = phi
  spherical.theta = theta
  var position = new THREE.Vector3()
  position.setFromSpherical(spherical)
  return position

}
function createPosition2(lnglat , foreignRadius) {
  var spherical = new THREE.Spherical
  spherical.radius = foreignRadius;
  const lng = lnglat[0] - 200;
  const lat = lnglat[1]-30;
  const theta = (lng + 90) * (Math.PI / 180)
  const phi = (90 - lat) * (Math.PI / 180)
  spherical.phi = phi
  spherical.theta = theta
  var position = new THREE.Vector3()
  position.setFromSpherical(spherical)
  return position

}
function createPositionZoo(lnglat , zooRadius) {
  var spherical = new THREE.Spherical
  spherical.radius = zooRadius;
  const lng = lnglat[0] - 205;
  const lat = lnglat[1] - 10;
  const theta = (lng + 90) * (Math.PI / 180)
  const phi = (90 - lat) * (Math.PI / 180)
  spherical.phi = phi
  spherical.theta = theta
  var position = new THREE.Vector3()
  position.setFromSpherical(spherical)
  return position

}

//给标签赋坐标
function updateScreenPosition() {

  var countryPos1 = countries[0].position;
  var countryPos2 = countries[1].position;
  var label_pos1 = createPosition(countryPos1);

  var show1 = updateAnnotationOpacity(label_pos1);

  var label_pos2 = createPosition(countryPos2);
  var show2 = updateAnnotationOpacity(label_pos2);

  var vector = new THREE.Vector3(label_pos1.x, label_pos1.y, label_pos1.z);
  var vector2 = new THREE.Vector3(label_pos2.x, label_pos2.y, label_pos2.z);

  var canvas = renderer.domElement;

  vector.project(camera);
  vector2.project(camera);

  vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
  vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));

  vector2.x = Math.round((0.5 + vector2.x / 2) * (canvas.width / window.devicePixelRatio));
  vector2.y = Math.round((0.5 - vector2.y / 2) * (canvas.height / window.devicePixelRatio));

  annotation.style.top = vector.y - 90  + "px"; //80
  annotation.style.left = vector.x - 8  + "px";
  annotation.style.display = show1 ? "none" : "block";

  annotation2.style.top = vector2.y - 70 + "px";
  annotation2.style.left = vector2.x - 12 + "px";
  annotation2.style.display = show2 ? "none" : "block"
}
//转换透明度
function updateAnnotationOpacity(position) {
  var meshDistance = camera.position.distanceTo(object.position);

  var spriteDistance = camera.position.distanceTo(position);

  var spriteBehindObject = spriteDistance > meshDistance;
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
  var delta = clock.getDelta()
  controls.update(delta); //更新控制器.
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
    position: [106.06, 28.67]
  }
]
var zoos = [
  {
    name: "北京动物园",
    position: [112, 39.56],
    r:23
  },
  {
    name: "上海动物园",
    position: [118.2, 30],
    r:23.2
  },
  {
    name: "广州动物园",
    position: [110, 23.6],
    r:23.4
  },
  {
    name: "澳门动物园",
    position: [111.2, 21.2],
    r:23.4
  },
  {
    name: "香港动物园",
    position: [112.7, 21.8],
    r:23.4
  },
  ];
var foreignCountries = [
  {
    name: "美国",
    position: [70,40],
    url:'img/countryIcon/russia.png',
    r:25
  },
  {
    name: "德国",
    position: [10.27, 51.09],
    url:'img/countryIcon/russia.png',
    r:25.5
  },
  {
    name: "俄罗斯",
    position: [37.37, 55.45],
    url:'img/countryIcon/russia.png',
    r:25
  },
  {
    name: "英国",
    position: [-0.05, 51.36],
    url:'img/countryIcon/russia.png',
    r:26
  },
  {
    name: "印度尼西亚",
    position: [106.49, -6.09],
    url:'img/countryIcon/russia.png',
    r:24.5
  },
  {
    name: "泰国",
    position: [100.35, 13.45],
    url:'img/countryIcon/russia.png',
    r:24
  },
  {
    name: "日本",
    position: [139.75, 35.67],
    url:'img/countryIcon/russia.png',
    r:23.5
  },
  {
    name: "比利时",
    position: [4.21, 50.51],
    url:'img/countryIcon/russia.png',
    r:25.8
  },
  {
    name: "澳大利亚",
    position: [149.08, -35.15],
    url:'img/countryIcon/russia.png',
    r:25
  },
  {
    name: "奥地利",
    position: [16.22, 48.12],
    url:'img/countryIcon/russia.png',
    r:25.5
  }

]