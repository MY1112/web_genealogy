import React, { PureComponent } from 'react'
import { message } from 'antd'
import { loadCDN } from 'util/Tool'
import { Pig } from './pig'
import { Fan } from './fan'
import { Dragon, SmokeParticle } from './dragon'
import { Fire } from './fire'
import './about.less'

const initialState = {
  CDNLoading: false,
}

export default class About extends PureComponent {
  state = initialState
  pig
  fan
  componentDidMount() {
    const script = [
      'http://39.97.229.246/threejs/three.min.js',
      'http://39.97.229.246/threejs/TweenMax.min.js',
      'http://39.97.229.246/threejs/orbitControls.js',
      'http://39.97.229.246/threejs/mtlLoader.js',
      'http://39.97.229.246/threejs/objLoader.js',
    ]
    loadCDN(script)
      .then(() => {
        this.setState(
          {
            CDNLoading: true,
          },
          () => {
            let scene,
              camera,
              controls,
              fieldOfView,
              aspectRatio,
              nearPlane,
              farPlane,
              shadowLight,
              backLight,
              light,
              renderer,
              container,
              scope,
              mouse,
              raycaster,
              clock,
              objectArr = [],
              isBlowing,
              helicopter

            //SCENE
            let floor,
              dragon,
              otherFireGroup,
              awaitingFireParticles = [],
              globalSpeedRate = 1,
              isFire = false,
              isWindFire = false,
              touchStartDate,
              touchAllTime;

            //SCREEN VARIABLES

            let HEIGHT,
              WIDTH,
              windowHalfX,
              windowHalfY,
              mousePos = { x: 0, y: 0 }

            //INIT THREE JS, SCREEN AND MOUSE EVENTS

            const init = () => {
              scene = new THREE.Scene()
              HEIGHT = window.innerHeight
              WIDTH = window.innerWidth
              aspectRatio = WIDTH / HEIGHT
              fieldOfView = 60
              nearPlane = 1
              farPlane = 3000
              camera = new THREE.PerspectiveCamera(
                fieldOfView,
                aspectRatio,
                nearPlane,
                farPlane
              )
              camera.position.z = 1000
              camera.position.y = 300
              scope = new THREE.Vector3(0, 0, 0)
              camera.lookAt(new THREE.Vector3(0, 0, 0))
              renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
              })
              renderer.setPixelRatio(window.devicePixelRatio)
              renderer.setSize(WIDTH, HEIGHT)
              renderer.shadowMap.enabled = true

              clock = new THREE.Clock()

              //创建三轴表示
              // var axes = new THREE.AxisHelper(400)
              // scene.add(axes)

              container = document.getElementById('world')
              container.appendChild(renderer.domElement)

              // 自带的相机转动视角
              controls = new THREE.OrbitControls(camera, renderer.domElement)
              controls.minDistance = 400
              controls.maxDistance = 1500
              controls.maxPolarAngle = Math.PI / 2

              windowHalfX = (WIDTH * 2) / 3
              windowHalfY = (HEIGHT * 2) / 3

              raycaster = new THREE.Raycaster()
              mouse = new THREE.Vector2()

              window.addEventListener('resize', this.onWindowResize, false)
              document.addEventListener(
                'mousedown',
                this.handleMouseDown,
                false
              )
              document.addEventListener('mouseup', this.handleMouseUp, false)
              document.addEventListener(
                'mousemove',
                this.handleMouseMove,
                false
              )
              document.addEventListener(
                'touchstart',
                this.handleTouchStart,
                false
              )
              document.addEventListener('touchend', this.handleTouchEnd, false)
              document.addEventListener(
                'touchmove',
                this.handleTouchMove,
                false
              )
              document.addEventListener('click', this.handleMouseClick, false)
            }

            this.onWindowResize = () => {
              HEIGHT = window.innerHeight
              WIDTH = window.innerWidth
              windowHalfX = (WIDTH * 2) / 3
              windowHalfY = (HEIGHT * 2) / 3
              renderer.setSize(WIDTH, HEIGHT)
              camera.aspect = WIDTH / HEIGHT
              camera.updateProjectionMatrix()
            }

            this.handleMouseClick = (event) => {
              event.preventDefault()

              var intersects = getIntersects(event.layerX, event.layerY)
              if (intersects.length > 0) {
                var res = intersects.filter((res) => res && res.object)[0]
                if (res && res.object) {
                  if (res.object.name.indexOf('pig') > -1) {
                    this.pig.lovelyLeft()
                    this.pig.lovelyRight()
                  }
                  if (res.object.name.indexOf('dragon') > -1) {
                    dragon.clickUp()
                  }
                }
              }
            }

            this.handleMouseMove = (event) => {
              mousePos = { x: event.clientX, y: event.clientY }
            }

            this.handleMouseDown = (event) => {
              isBlowing = true;
              touchStartDate = Date.now();
            }
            this.handleMouseUp = (event) => {
              isBlowing = false;
              isWindFire = false;
              touchAllTime = (Date.now() - touchStartDate) / 1000;
              if (touchAllTime > 2) {
                isFire = false;
              }
            }

            const getIntersects = (x, y) => {
              //将鼠标位置转换成设备坐标。x和y方向的取值范围是(-1 to 1)
              x = (x / window.innerWidth) * 2 - 1
              y = -(y / window.innerHeight) * 2 + 1
              mouse.set(x, y)

              //通过摄像机和鼠标位置更新射线
              raycaster.setFromCamera(mouse, camera)

              // 返回物体和射线的焦点
              return raycaster.intersectObjects(
                [this.pig.threegroup, dragon.threegroup],
                true
              )
            }

            this.handleTouchStart = (event) => {
              if (event.touches.length > 1) {
                event.preventDefault()
                mousePos = {
                  x: event.touches[0].pageX,
                  y: event.touches[0].pageY,
                }
                isBlowing = true;
                touchStartDate = Date.now();
              }
            }

            this.handleTouchMove = (event) => {
              if (event.touches.length == 1) {
                event.preventDefault()
                mousePos = {
                  x: event.touches[0].pageX,
                  y: event.touches[0].pageY,
                }
                isBlowing = true;
              }
            }

            this.handleTouchEnd = (event) => {
              isBlowing = false;
              isWindFire = false;
              touchAllTime = (Date.now() - touchStartDate) / 1000;
              if (touchAllTime > 2.5) {
                isFire = false;
              }
            }

            const createLights = () => {
              light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5)

              shadowLight = new THREE.DirectionalLight(0xffffff, 0.8)
              shadowLight.position.set(200, 200, 200)
              shadowLight.castShadow = true

              backLight = new THREE.DirectionalLight(0xffffff, 0.4)
              backLight.position.set(-100, 200, 50)
              backLight.castShadow = true

              scene.add(backLight)
              scene.add(light)
              scene.add(shadowLight)
            }

            const createFloor = () => {
              floor = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(1500, 2000),
                new THREE.MeshBasicMaterial({ color: 0xe0dacd })
              )
              floor.rotation.x = -Math.PI / 2
              floor.position.y = -33
              floor.receiveShadow = true
              scene.add(floor)
            }

            const creatStick = () => {
              var cylinderGeo = new THREE.CylinderGeometry(8, 8, 440, 4, 1)
              var cylinderMat = new THREE.MeshLambertMaterial({
                color: 0x653f4c,
              })
              //创建圆柱体网格模型
              var cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat)
              cylinderMesh.position.y = 235
              cylinderMesh.castShadow = true
              // 梯形石墩
              const dash_geometry = new THREE.CylinderGeometry(50, 70, 50, 4, 1)
              const dash_material = new THREE.MeshLambertMaterial({
                color: 0x919190,
              })
              const dash_mesh = new THREE.Mesh(dash_geometry, dash_material)
              dash_mesh.castShadow = true

              this.fan = new Fan()
              this.fan.threeGroup.position.set(-8, 446, 8)

              const stickGroup = new THREE.Group()
              stickGroup.add(cylinderMesh)
              stickGroup.add(dash_mesh)
              stickGroup.add(this.fan.threeGroup)
              stickGroup.position.set(450, -8, -420)

              scene.add(stickGroup)
            }

            const createPig = () => {
              this.pig = new Pig()
              this.pig.side = 'right'
              this.pig.threegroup.position.set(-370, 8, 170)
              this.pig.threegroup.rotation.y = Math.PI / 5
              scene.add(this.pig.threegroup)
            }

            const creatBgWall = () => {
              var bgWallPlane = new THREE.PlaneGeometry(2000, 1000, 60, 60)
              var loader = new THREE.TextureLoader()
              loader.load(
                'http://39.97.229.246/images/mountain.png',
                (texture) => {
                  var bgWallMaterial = new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.FrontSide,
                  })
                  bgWallMaterial.map.minFilter = THREE.LinearFilter
                  var bgWallMesh = new THREE.Mesh(bgWallPlane, bgWallMaterial)
                  bgWallMesh.position.set(0, 400, -1000)
                  scene.add(bgWallMesh)
                }
              )
            }
            // 递归出所有mesh
            const getMesh = (s, arr, name = '') => {
              s.forEach((v) => {
                if (v.children && v.children.length > 0) {
                  getMesh(v.children, arr, v.name)
                } else {
                  if (v instanceof THREE.Mesh) {
                    if (name) {
                      v.name = name
                    }
                    arr.push(v)
                  }
                }
              })
            }
            // 加载模型
            const initObjModel = () => {
              var onProgress = (xhr) => {
                if (xhr.lengthComputable) {
                  var percentComplete = (xhr.loaded / xhr.total) * 100
                  // 每次加载完毕将mesh放进数组
                  if (percentComplete === 100) {
                    objectArr = []
                    scene.traverse((s) => {
                      if (s && s.type === 'Scene') {
                        getMesh(s.children, objectArr)
                      }
                    })
                  }
                }
              }
              var onError = (xhr) => {}
              var mtlLoader = new THREE.MTLLoader()
              // 树
              mtlLoader.load(
                'http://39.97.229.246/objs/tree.mtl',
                (materials) => {
                  materials.preload()
                  var objLoader = new THREE.OBJLoader()
                  objLoader.setMaterials(materials)
                  objLoader.load(
                    'http://39.97.229.246/objs/tree.obj',
                    (object) => {
                      object.position.x = 400
                      object.position.z = 30
                      object.position.y = -20
                      object.scale.set(10, 10, 10)
                      object.name = 'lowTree'
                      helicopter = object
                      scene.add(object)
                    },
                    onProgress,
                    onError
                  )
                }
              )
              // 瀑布
              // mtlLoader.load('http://39.97.229.246/objs/water.mtl', (materials) => {
              //   materials.preload();
              //   var objLoader = new THREE.OBJLoader();
              //   objLoader.setMaterials(materials);
              //   objLoader.load('http://39.97.229.246/objs/water.obj', (object) => {
              //     object.position.x = -500;
              //     object.position.z = -550;
              //     object.position.y = -8;
              //     object.scale.set(32, 32, 32);
              //     object.rotation.x = - Math.PI / 2
              //     object.rotation.z = - Math.PI / 3
              //     object.name = 'lowWater';
              //     waterShip = object
              //     scene.add(object);
              //   }, onProgress, onError);
              // });
            }

            const getSmokeParticle = () => {
              var p
              if (!dragon.awaitingSmokeParticles.length) {
                p = new SmokeParticle(dragon.globalSpeedRate, (_this) => {
                  dragon.awaitingSmokeParticles.push(_this)
                })
              }
              p = dragon.awaitingSmokeParticles.pop()
              return p
            }

            const createDragon = () => {
              dragon = new Dragon()
              dragon.threegroup.position.x = 100
              dragon.threegroup.position.z = 50
              dragon.threegroup.rotation.y = -Math.PI / 4
              scene.add(dragon.threegroup)
            }

            const otherFireFly = () => {
              let f
              if (awaitingFireParticles.length < 6) {
                f = new Fire({ globalSpeedRate, otherFireGroup }, (_this) => {
                  awaitingFireParticles.push(_this)
                })
              }
              f = awaitingFireParticles.pop()
              return f
            }

            const createFire = () => {
              otherFireGroup = new THREE.Group()
              otherFireGroup.position.set(-50, -30, 160)
              for (let i = 0; i < 10; i++) {
                const fireBox = new Fire(
                  { globalSpeedRate, otherFireGroup },
                  (_this) => {
                    awaitingFireParticles.push(_this)
                  }
                )
                fireBox.mesh.position.set(
                  8 + Math.random() * 10,
                  Math.random() * 5,
                  8 + Math.random() * 10
                )
                fireBox.mesh.rotation.x = Math.random() * Math.PI * 3
                fireBox.mesh.rotation.y = Math.random() * Math.PI * 3
                fireBox.color = {
                  r: 0 / 255,
                  g: 0 / 255,
                  b: 0 / 255,
                }
                fireBox.mesh.material.color.setRGB(fireBox.color.r, fireBox.color.g, fireBox.color.b)
                otherFireGroup.add(fireBox.mesh)
              }
              otherFireGroup.myTweenList = [];
              scene.add(otherFireGroup)
            }

            // const changeFire = (data) => {
            //   data.forEach(obj => {
            //     obj.updateTo({bezier: {
            //       type: 'cubic',
            //       values: [{
            //         x: -100 - Math.random() * 20,
            //         y: 180 + Math.random() * 10,
            //         z: 260
            //       }]
            //     }}, false);
            //   })
            // }

            const loop = () => {
              if (!this.pig.isBlink) {
                this.pig.isBlink = true
                this.pig.blink()
              }
              if (!this.pig.isInhale) {
                this.pig.isInhale = true
                this.pig.behaviourInterval = setInterval(() => {
                  this.pig.inhale()
                }, 7000)
              }

              this.fan.isBlowing = isBlowing
              this.fan.update()

              if (
                otherFireGroup &&
                awaitingFireParticles.length > 4 &&
                !(Date.now() % 2) &&
                isFire
              ) {
                const f = otherFireFly()

                f.mesh.position.x = 5 + Math.random() * 10
                f.mesh.position.y = Math.random() * 5
                f.mesh.position.z = 5 + Math.random() * 10
                f.color = {
                  r: 255 / 255,
                  g: 205 / 255,
                  b: 74 / 255,
                }
                f.mesh.material.color.setRGB(f.color.r, f.color.g, f.color.b)
                f.mesh.material.opacity = 1

                otherFireGroup.add(f.mesh)
                if (isBlowing) {
                  // if (!isWindFire && otherFireGroup.myTweenList.length) {
                  //   changeFire(otherFireGroup.myTweenList)
                  // }
                  isWindFire = true
                  f.blowFly()
                } else {
                  f.fly()
                }
              }

              if (!dragon.isSneezing) {
                dragon.update()
              }

              if (dragon.timeSmoke > 0) {
                var noseTarget =
                  Math.random() > 0.5 ? dragon.noseL : dragon.noseR
                var p = getSmokeParticle()
                // var pos = noseTarget.localToWorld(new THREE.Vector3(0, 0, 2));
                var pos = noseTarget.position

                p.mesh.position.x = pos.x
                p.mesh.position.y = pos.y
                p.mesh.position.z = pos.z
                p.mesh.material.color.setHex(0x555555)
                p.mesh.material.opacity = 0.2

                // scene.add(p.mesh);
                dragon.head.add(p.mesh)
                p.fly()
                dragon.timeSmoke--
              }

              if (dragon.timeFire > 0) {
                if (dragon.timeFire === 1) {
                  isFire = true
                }
                var noseTarget =
                  Math.random() > 0.5 ? dragon.noseL : dragon.noseR
                var colTarget = Math.random() > 0.5 ? 0xfdde8c : 0xcb3e4c
                var f = getSmokeParticle()
                // var posF = noseTarget.localToWorld(new THREE.Vector3(-2, 0, 2));
                var posF = noseTarget.position

                f.mesh.position.x = posF.x
                f.mesh.position.y = posF.y
                f.mesh.position.z = posF.z
                f.color = {
                  r: 255 / 255,
                  g: 205 / 255,
                  b: 74 / 255,
                }
                f.mesh.material.color.setRGB(f.color.r, f.color.g, f.color.b)
                f.mesh.material.opacity = 1

                // scene.add(f.mesh);
                dragon.head.add(f.mesh)
                f.fire(dragon.fireRate, dragon.maxSneezingRate)
                dragon.timeFire--
              }

              render()
              requestAnimationFrame(loop)
            }

            const render = () => {
              if (controls) controls.update()
              renderer.render(scene, camera)
            }

            init()
            createLights()
            createFloor()
            createPig()
            creatStick()
            creatBgWall()
            createDragon()
            createFire()
            initObjModel()
            loop()
          }
        )
      })
      .catch(() => {
        message.error('静态资源加载失败')
      })
  }

  componentWillUnmount() {
    this.pig?.behaviourInterval && clearInterval(this.pig.behaviourInterval)
    window.removeEventListener('resize', this.onWindowResize, false)
    document.removeEventListener('mousemove', this.handleMouseMove, false)
    document.removeEventListener('touchstart', this.handleTouchStart, false)
    document.removeEventListener('touchend', this.handleTouchEnd, false)
    document.removeEventListener('touchmove', this.handleTouchMove, false)
    document.removeEventListener('click', this.handleMouseClick, false)
    document.removeEventListener('mousedown', this.handleMouseDown, false)
    document.removeEventListener('mouseup', this.handleMouseUp, false)
  }

  render() {
    const { CDNLoading } = this.state
    return (
      <div className="about">
        {CDNLoading && <div id="world" />}
        {CDNLoading && (
          <div className="authInfo">
            <div className="authInfo_row">
              <span className="authInfo_row_title">作者 :</span>
              <span className="authInfo_row_content ml-12">孟 元</span>
            </div>
            <div className="authInfo_row">宜未雨而绸缪；毋临渴而掘井</div>
          </div>
        )}
      </div>
    )
  }
}
// // 获取时间
// let elapsedTime = clock.getElapsedTime()

// // 获取到红布cloth
// let plane = scene.getObjectByName('cloth')
// // 拿到geometry
// let planeGeo = plane.geometry
// // 使其按照Math.sin规律性的动态改变红布的顶点
// planeGeo.vertices.forEach((vertex, index) => {
//     vertex.z = (Math.sin((vertex.x*10/vertex.y)*0.3) + Math.cos((vertex.x*10/vertex.y)*0.5)) * 1;
// })
// // 改变顶点后设置verticesNeedUpdate为true才有效果
// planeGeo.verticesNeedUpdate = true

// const getClothText = () => {
//   var canvas = document.createElement("canvas");
//   canvas.width = 512;
//   canvas.height = 128;
//   var c = canvas.getContext('2d');
//   // 矩形区域填充背景
//   c.fillStyle = "#d92a07";
//   c.fillRect(0, 0, 512, 128);
//   c.beginPath();
//   // 文字
//   // c.beginPath();
//   // c.translate(256,64);
//   // c.fillStyle = "#000000"; //文本填充颜色
//   // c.font = "bold 48px 宋体"; //字体样式设置
//   // c.textBaseline = "middle"; //文本与fillText定义的纵坐标
//   // c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
//   // c.fillText("蓝 氏 舰 队", 0, 0);
//   return canvas;
// }

// const creatFlag = () => {
//               var texture = new THREE.CanvasTexture(getClothText());
//               var plane = function (u, v, target) {
//                 var wr = 300;
//                 var hr = 150;
//                 var x = Math.sin(u) * wr;
//                 var y = Math.sin(v / 2) * 2 * hr;
//                 var z = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;

//                 target.set( x, y, z );
//               };
//               var geometry = new THREE.ParametricGeometry(plane, 120, 120);
//               var material = new THREE.MeshPhongMaterial({
//                 map: texture,
//                 opacity: 0.85,
//                 side: THREE.DoubleSide,
//               })
//               material.flatShading = true
//               var mesh = new THREE.Mesh(geometry, material)
//               mesh.position.set(-162, 300, -321) //设置圆柱坐标
//               mesh.castShadow = true
//               mesh.name = 'cloth'
//               scene.add(mesh)
//             }

//             const creatSky = () => {
//               var skyGeometry = new THREE.BoxGeometry(2000, 2000, 2000)
//               // var loader = new THREE.TextureLoader();
//               var materials = []
//               for (let i = 0; i < 6; i++) {
//                 const skyLineMaterial = new THREE.MeshBasicMaterial({
//                   map:
//                     i === 5
//                       ? THREE.ImageUtils.loadTexture(
//                         'http://39.97.229.246/images/mountain.png'
//                         )
//                       : null,
//                   side: THREE.BackSide,
//                 })
//                 if (i === 5) skyLineMaterial.map.minFilter = THREE.LinearFilter
//                 materials.push(skyLineMaterial)
//               }
//               if (materials.length) {
//                 var cubeMaterial = new THREE.MeshFaceMaterial(materials)
//                 var skyBox = new THREE.Mesh(skyGeometry, cubeMaterial)
//                 skyBox.position.y = 430
//                 scene.add(skyBox)
//               }
//             }
