import { Power } from './power';

export class SmokeParticle {
  constructor(globalSpeedRate, cb) {
    this.color = {
      r: 0,
      g: 0,
      b: 0,
    }
    const particleMat = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0.5
    })
    particleMat.flatShading = true;
    this.mesh = this.makeCube(particleMat, 4, 4, 4, 0, 0, 0, 0, 0, 0)
    cb(this)

    this.initialize = () => {
      this.mesh.rotation.x = 0
      this.mesh.rotation.y = 0
      this.mesh.rotation.z = 0

      this.mesh.position.x = 0
      this.mesh.position.y = 0
      this.mesh.position.z = 0

      this.mesh.scale.x = 1
      this.mesh.scale.y = 1
      this.mesh.scale.z = 1

      this.mesh.material.opacity = 0.5
      cb(this)
    }

    this.updateColor = () => {
      this.mesh.material.color.setRGB(this.color.r, this.color.g, this.color.b)
    }

    this.fly = () => {
      const _this = this
      const speed = 10 * globalSpeedRate
      const ease = Strong.easeOut
      const initX = this.mesh.position.x
      const initY = this.mesh.position.y
      const initZ = this.mesh.position.z
      const bezier = {
        type: 'cubic',
        values: [
          {
            x: initX,
            y: initY,
            z: initZ,
          },
          {
            x: initX + 30 - Math.random() * 10,
            y: initY + 20 + Math.random() * 2,
            z: initZ + 20,
          },
          {
            x: initX + 10 + Math.random() * 20,
            y: initY + 40 + Math.random() * 5,
            z: initZ - 30,
          },
          {
            x: initX + 50 - Math.random() * 20,
            y: initY + 70 + Math.random() * 10,
            z: initZ + 20,
          },
        ],
      }
      TweenMax.to(this.mesh.position, speed, {
        bezier: bezier,
        ease: ease,
      })
      TweenMax.to(this.mesh.rotation, speed, {
        x: Math.random() * Math.PI * 3,
        y: Math.random() * Math.PI * 3,
        ease: ease,
      })
      TweenMax.to(this.mesh.scale, speed, {
        x: 5 + Math.random() * 5,
        y: 5 + Math.random() * 5,
        z: 5 + Math.random() * 5,
        ease: ease,
      })
      TweenMax.to(this.mesh.material, speed, {
        opacity: 0,
        ease: ease,
        onComplete: () => {
          _this.initialize()
        },
      })
    }

    this.fire = (f, m) => {
      const _this = this
      const speed = 1 * globalSpeedRate
      const ease = Strong.easeOut
      const initX = this.mesh.position.x
      const initY = this.mesh.position.y
      const initZ = this.mesh.position.z

      TweenMax.to(this.mesh.position, speed, {
        x: 0,
        y: initY - 2 * f,
        z: Math.max(initZ + 15 * f, initZ + 40),
        ease: ease,
      })
      TweenMax.to(this.mesh.rotation, speed, {
        x: Math.random() * Math.PI * 3,
        y: Math.random() * Math.PI * 3,
        ease: ease,
      })

      const bezierScale = [
        {
          x: 1,
          y: 1,
          z: 1,
        },
        {
          x: f / m + Math.random() * 0.3,
          y: f / m + Math.random() * 0.3,
          z: (f * 2) / m + Math.random() * 0.3,
        },
        {
          x: f / m + Math.random() * 0.5,
          y: f / m + Math.random() * 0.5,
          z: (f * 2) / m + Math.random() * 0.5,
        },
        {
          x: (f * 2) / m + Math.random() * 0.5,
          y: (f * 2) / m + Math.random() * 0.5,
          z: (f * 4) / m + Math.random() * 0.5,
        },
        {
          x: f * 2 + Math.random() * 5,
          y: f * 2 + Math.random() * 5,
          z: f * 2 + Math.random() * 5,
        },
      ]

      TweenMax.to(this.mesh.scale, speed * 2, {
        bezier: bezierScale,
        ease: ease,
        onComplete: () => {
          _this.initialize()
        },
      })

      TweenMax.to(this.mesh.material, speed, {
        opacity: 0,
        ease: ease,
      })

      const bezierColor = [
        {
          r: 255 / 255,
          g: 205 / 255,
          b: 74 / 255,
        },
        {
          r: 255 / 255,
          g: 205 / 255,
          b: 74 / 255,
        },
        {
          r: 255 / 255,
          g: 205 / 255,
          b: 74 / 255,
        },
        {
          r: 247 / 255,
          g: 34 / 255,
          b: 50 / 255,
        },
        {
          r: 0 / 255,
          g: 0 / 255,
          b: 0 / 255,
        },
      ]

      TweenMax.to(this.color, speed, {
        bezier: bezierColor,
        ease: Strong.easeOut,
        onUpdate: () => {
          _this.updateColor()
        },
      })
    }
  }

  makeCube = (mat, w, h, d, posX, posY, posZ, rotX, rotY, rotZ) => {
    const geom = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.x = posX;
    mesh.position.y = posY;
    mesh.position.z = posZ;
    mesh.rotation.x = rotX;
    mesh.rotation.y = rotY;
    mesh.rotation.z = rotZ;
    return mesh;
  }
}

export class Dragon {
  constructor() {
    this.globalSpeedRate = 1;
    this.sneezingRate = 0;
    this.maxSneezingRate = 8;
    this.sneezeDelay = 500;
    this.sneezeTimeout;
    this.timeSmoke = 0;
    this.timeFire = 0;
    this.fireRate = 0;
    this.awaitingSmokeParticles = [];

    this.tailAmplitude = 3
    this.tailAngle = 0
    this.tailSpeed = 0.07

    this.wingAmplitude = Math.PI / 8
    this.wingAngle = 0
    this.wingSpeed = 0.1
    this.isSneezing = false

    this.threegroup = new THREE.Group()

    // Materials
    const greenMat = new THREE.MeshLambertMaterial({
      color: 0x5da683
    })
    greenMat.flatShading = true;
    const lightGreenMat = new THREE.MeshLambertMaterial({
      color: 0x95c088
    })
    lightGreenMat.flatShading = true;
    const yellowMat = new THREE.MeshLambertMaterial({
      color: 0xfdde8c
    })
    yellowMat.flatShading = true;
    const redMat = new THREE.MeshLambertMaterial({
      color: 0xcb3e4c
    })
    redMat.flatShading = true;
    const whiteMat = new THREE.MeshLambertMaterial({
      color: 0xfaf3d7
    })
    whiteMat.flatShading = true;
    const brownMat = new THREE.MeshLambertMaterial({
      color: 0x874a5c
    })
    brownMat.flatShading = true;
    const blackMat = new THREE.MeshLambertMaterial({
      color: 0x403133
    })
    blackMat.flatShading = true;

    // body 身体
		this.body = new THREE.Group()
		this.body.name = 'dragon-body'
    this.belly = this.makeCube(greenMat, 30, 30, 40, 0, 0, 0, 0, 0, Math.PI / 4)

    // Wings 翅膀
    this.wingL = this.makeCube(
      yellowMat,
      5,
      30,
      20,
      15,
      15,
      0,
      -Math.PI / 4,
      0,
      -Math.PI / 4
    )
    this.wingL.geometry.applyMatrix4(
      new THREE.Matrix4().makeTranslation(0, 15, 10)
    )
    this.wingR = this.wingL.clone()
    this.wingR.position.x = -this.wingL.position.x
    this.wingR.rotation.z = -this.wingL.rotation.z

    // pike body 龙脊
    const pikeBodyGeom = new THREE.CylinderGeometry(0, 10, 10, 4, 1)
    this.pikeBody1 = new THREE.Mesh(pikeBodyGeom, greenMat)
    this.pikeBody1.scale.set(0.2, 1, 1)
    this.pikeBody1.position.z = 10
    this.pikeBody1.position.y = 26

    this.pikeBody2 = this.pikeBody1.clone()
    this.pikeBody2.position.z = 0
    this.pikeBody3 = this.pikeBody1.clone()
    this.pikeBody3.position.z = -10

    // tail 尾巴线
		this.tail = new THREE.Group()
		this.tail.name = 'dragon-tail'
    this.tail.position.z = -20
    this.tail.position.y = 10

    const tailMat = new THREE.LineBasicMaterial({
      color: 0x5da683,
      linewidth: 5,
    })

    const tailGeom = new THREE.Geometry()
    tailGeom.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 5, -10),
      new THREE.Vector3(0, -5, -20),
      new THREE.Vector3(0, 0, -30)
    )

    this.tailLine = new THREE.Line(tailGeom, tailMat)

    // pike 尾巴尖
    const pikeGeom = new THREE.CylinderGeometry(0, 10, 10, 4, 1)
    pikeGeom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2))
    this.tailPike = new THREE.Mesh(pikeGeom, yellowMat)
    this.tailPike.scale.set(0.2, 1, 1)
    this.tailPike.position.z = -35
    this.tailPike.position.y = 0

    this.tail.add(this.tailLine)
    this.tail.add(this.tailPike)

    this.body.add(this.belly)
    this.body.add(this.wingL)
    this.body.add(this.wingR)
    this.body.add(this.tail)
    this.body.add(this.pikeBody1)
    this.body.add(this.pikeBody2)
    this.body.add(this.pikeBody3)

    // head
    this.head = new THREE.Group()
		this.head.name = 'dragon-head'
    // head face 脑袋
    this.face = this.makeCube(greenMat, 60, 50, 80, 0, 25, 40, 0, 0, 0)

    // head horn 角
    const hornGeom = new THREE.CylinderGeometry(0, 6, 10, 4, 1)
    this.hornL = new THREE.Mesh(hornGeom, yellowMat)
    this.hornL.position.y = 55
    this.hornL.position.z = 10
    this.hornL.position.x = 10

    this.hornR = this.hornL.clone()
    this.hornR.position.x = -10

    // head ears 耳朵
    this.earL = this.makeCube(greenMat, 5, 10, 20, 32, 42, 2, 0, 0, 0)
    this.earL.geometry.applyMatrix4(
      new THREE.Matrix4().makeTranslation(0, 5, -10)
    )
    this.earL.geometry.applyMatrix4(
      new THREE.Matrix4().makeRotationX(Math.PI / 4)
    )
    this.earL.geometry.applyMatrix4(
      new THREE.Matrix4().makeRotationY(-Math.PI / 4)
    )

    this.earR = this.makeCube(greenMat, 5, 10, 20, -32, 42, 2, 0, 0, 0)
    this.earR.geometry.applyMatrix4(
      new THREE.Matrix4().makeTranslation(0, 5, -10)
    )
    this.earR.geometry.applyMatrix4(
      new THREE.Matrix4().makeRotationX(Math.PI / 4)
    )
    this.earR.geometry.applyMatrix4(
      new THREE.Matrix4().makeRotationY(Math.PI / 4)
    )

    // head mouth
		this.mouth = new THREE.Group()
		this.mouth.name = 'dragon-mouth'
    this.mouth.position.z = 50
    this.mouth.position.y = 3
    this.mouth.rotation.x = 0 //Math.PI / 8;

    // head mouth jaw 下巴
    this.jaw = this.makeCube(greenMat, 30, 10, 30, 0, -5, 15, 0, 0, 0)
    this.mouth.add(this.jaw)

    // head mouth tongue 舌头
    this.tongue = this.makeCube(redMat, 20, 10, 20, 0, -3, 15, 0, 0, 0)
    this.mouth.add(this.tongue)

    // head smile 微笑
    const smileGeom = new THREE.TorusGeometry(6, 2, 2, 10, Math.PI)
    this.smile = new THREE.Mesh(smileGeom, blackMat)
    this.smile.position.z = 82
    this.smile.position.y = 5
    this.smile.rotation.z = -Math.PI

    // head cheek
    this.cheekL = this.makeCube(lightGreenMat, 4, 20, 20, 30, 18, 55, 0, 0, 0)
    this.cheekR = this.cheekL.clone()
    this.cheekR.position.x = -this.cheekL.position.x

    // head eye
    this.eyeL = this.makeCube(whiteMat, 10, 22, 22, 27, 34, 18, 0, 0, 0)
    this.eyeR = this.eyeL.clone()
    this.eyeR.position.x = -27

    // head iris
    this.irisL = this.makeCube(brownMat, 10, 12, 12, 28, 30, 24, 0, 0, 0)
    this.irisR = this.irisL.clone()
    this.irisR.position.x = -this.irisL.position.x

    // head nose
    this.noseL = this.makeCube(blackMat, 5, 5, 8, 5, 40, 77, 0, 0, 0)
    this.noseR = this.noseL.clone()
    this.noseR.position.x = -this.noseL.position.x

    this.head.position.z = 30
    this.head.add(this.face)
    this.head.add(this.hornL)
    this.head.add(this.hornR)
    this.head.add(this.earL)
    this.head.add(this.earR)
    this.head.add(this.mouth)
    this.head.add(this.eyeL)
    this.head.add(this.eyeR)
    this.head.add(this.irisL)
    this.head.add(this.irisR)
    this.head.add(this.noseL)
    this.head.add(this.noseR)
    this.head.add(this.cheekL)
    this.head.add(this.cheekR)
    this.head.add(this.smile)

    // legs
    this.legFL = this.makeCube(greenMat, 20, 10, 20, 20, -30, 15, 0, 0, 0)
    this.legFR = this.legFL.clone()
    this.legFR.position.x = -30
    this.legBL = this.legFL.clone()
    this.legBL.position.z = -15
    this.legBR = this.legBL.clone()
    this.legBR.position.x = -30

    this.powerLoad = new Power();
    this.powerLoad.powerGroup.position.y = 110;
    this.powerLoad.powerGroup.position.z = 70;
    this.powerLoad.powerGroup.rotation.z = -Math.PI / 2;

    this.threegroup.add(this.body)
    this.threegroup.add(this.head)
    this.threegroup.add(this.legFL)
    this.threegroup.add(this.legFR)
    this.threegroup.add(this.legBL)
    this.threegroup.add(this.legBR)
    this.threegroup.add(this.powerLoad.powerGroup)
		
		this.threegroup.name = 'dragon'

    this.threegroup.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })

    this.update = () => {
      this.tailAngle += this.tailSpeed / this.globalSpeedRate
      this.wingAngle += this.wingSpeed / this.globalSpeedRate
      for (let i = 0; i < this.tailLine.geometry.vertices.length; i++) {
        const v = this.tailLine.geometry.vertices[i]
        v.y =
          Math.sin(this.tailAngle - (Math.PI / 3) * i) *
          this.tailAmplitude *
          i *
          i
        v.x =
          Math.cos(this.tailAngle / 2 + (Math.PI / 10) * i) *
          this.tailAmplitude *
          i *
          i
        if (i == this.tailLine.geometry.vertices.length - 1) {
          this.tailPike.position.x = v.x
          this.tailPike.position.y = v.y
          this.tailPike.rotation.x = v.y / 30
        }
      }
      this.tailLine.geometry.verticesNeedUpdate = true

      this.wingL.rotation.z =
        -Math.PI / 4 + Math.cos(this.wingAngle) * this.wingAmplitude
      this.wingR.rotation.z =
        Math.PI / 4 - Math.cos(this.wingAngle) * this.wingAmplitude
    }

    this.prepareToSneeze = (s) => {
      const _this = this
      const speed = 0.7 * this.globalSpeedRate
      TweenLite.to(this.head.rotation, speed, {
        x: -s * 0.12,
        ease: Back.easeOut,
      })
      TweenLite.to(this.head.position, speed, {
        z: 30 - s * 2.2,
        y: s * 2.2,
        ease: Back.easeOut,
      })
      TweenLite.to(this.mouth.rotation, speed, {
        x: s * 0.18,
        ease: Back.easeOut,
      })

      TweenLite.to(this.smile.position, speed / 2, {
        z: 75,
        y: 10,
        ease: Back.easeOut,
      })
      TweenLite.to(this.smile.scale, speed / 2, {
        x: 0,
        y: 0,
        ease: Back.easeOut,
      })

      TweenMax.to(this.noseL.scale, speed, {
        x: 1 + s * 0.1,
        y: 1 + s * 0.1,
        ease: Back.easeOut,
      })
      TweenMax.to(this.noseR.scale, speed, {
        x: 1 + s * 0.1,
        y: 1 + s * 0.1,
        ease: Back.easeOut,
      })
      TweenMax.to(this.eyeL.scale, speed, {
        y: 1 + s * 0.01,
        ease: Back.easeOut,
      })
      TweenMax.to(this.eyeR.scale, speed, {
        y: 1 + s * 0.01,
        ease: Back.easeOut,
      })
      TweenMax.to(this.irisL.scale, speed, {
        y: 1 + s * 0.05,
        z: 1 + s * 0.05,
        ease: Back.easeOut,
      })
      TweenMax.to(this.irisR.scale, speed, {
        y: 1 + s * 0.05,
        z: 1 + s * 0.05,
        ease: Back.easeOut,
      })
      TweenMax.to(this.irisL.position, speed, {
        y: 30 + s * 0.8,
        z: 24 - s * 0.4,
        ease: Back.easeOut,
      })
      TweenMax.to(this.irisR.position, speed, {
        y: 30 + s * 0.8,
        z: 24 - s * 0.4,
        ease: Back.easeOut,
      })
      TweenMax.to(this.earL.rotation, speed, {
        x: -s * 0.1,
        y: -s * 0.1,
        ease: Back.easeOut,
      })
      TweenMax.to(this.earR.rotation, speed, {
        x: -s * 0.1,
        y: s * 0.1,
        ease: Back.easeOut,
      })
      TweenMax.to(this.wingL.rotation, speed, {
        z: -Math.PI / 4 - s * 0.1,
        ease: Back.easeOut,
      })
      TweenMax.to(this.wingR.rotation, speed, {
        z: Math.PI / 4 + s * 0.1,
        ease: Back.easeOut,
      })
      TweenMax.to(this.body.rotation, speed, {
        x: -s * 0.05,
        ease: Back.easeOut,
      })
      TweenMax.to(this.body.scale, speed, {
        y: 1 + s * 0.01,
        ease: Back.easeOut,
      })
      TweenMax.to(this.body.position, speed, {
        z: -s * 2,
        ease: Back.easeOut,
      })

      TweenMax.to(this.tail.rotation, speed, {
        x: s * 0.1,
        ease: Back.easeOut,
      })
    }

    this.sneeze = (s) => {
      const _this = this
      const sneezeEffect = 1 - s / this.maxSneezingRate
      const speed = 0.1 * this.globalSpeedRate
      this.timeFire = Math.round(s * 10)

      TweenLite.to(this.head.rotation, speed, {
        x: s * 0.05,
        ease: Back.easeOut,
      })
      TweenLite.to(this.head.position, speed, {
        z: 30 + s * 2.4,
        y: -s * 0.4,
        ease: Back.easeOut,
      })

      TweenLite.to(this.mouth.rotation, speed, {
        x: 0,
        ease: Strong.easeOut,
      })

      TweenLite.to(this.smile.position, speed * 2, {
        z: 82,
        y: 5,
        ease: Strong.easeIn,
      })

      TweenLite.to(this.smile.scale, speed * 2, {
        x: 1,
        y: 1,
        ease: Strong.easeIn,
      })

      TweenMax.to(this.noseL.scale, speed, {
        y: sneezeEffect,
        ease: Strong.easeOut,
      })
      TweenMax.to(this.noseR.scale, speed, {
        y: sneezeEffect,
        ease: Strong.easeOut,
      })
      TweenMax.to(this.noseL.position, speed, {
        y: 40, // - (sneezeEffect * 5),
        ease: Strong.easeOut,
      })
      TweenMax.to(this.noseR.position, speed, {
        y: 40, // - (sneezeEffect * 5),
        ease: Strong.easeOut,
      })
      TweenMax.to(this.irisL.scale, speed, {
        y: sneezeEffect / 2,
        z: 1,
        ease: Strong.easeOut,
      })
      TweenMax.to(this.irisR.scale, speed, {
        y: sneezeEffect / 2,
        z: 1,
        ease: Strong.easeOut,
      })
      TweenMax.to(this.eyeL.scale, speed, {
        y: sneezeEffect / 2,
        ease: Back.easeOut,
      })
      TweenMax.to(this.eyeR.scale, speed, {
        y: sneezeEffect / 2,
        ease: Back.easeOut,
      })

      TweenMax.to(this.wingL.rotation, speed, {
        z: -Math.PI / 4 + s * 0.15,
        ease: Back.easeOut,
      })
      TweenMax.to(this.wingR.rotation, speed, {
        z: Math.PI / 4 - s * 0.15,
        ease: Back.easeOut,
      })

      TweenMax.to(this.body.rotation, speed, {
        x: s * 0.02,
        ease: Back.easeOut,
      })
      TweenMax.to(this.body.scale, speed, {
        y: 1 - s * 0.03,
        ease: Back.easeOut,
      })
      TweenMax.to(this.body.position, speed, {
        z: s * 2,
        ease: Back.easeOut,
      })

      TweenMax.to(this.irisL.position, speed * 7, {
        y: 35,
        ease: Back.easeOut,
      })
      TweenMax.to(this.irisR.position, speed * 7, {
        y: 35,
        ease: Back.easeOut,
      })
      TweenMax.to(this.earR.rotation, speed * 3, {
        x: s * 0.2,
        y: s * 0.2,
        ease: Back.easeOut,
      })
      TweenMax.to(this.earL.rotation, speed * 3, {
        x: s * 0.2,
        y: -s * 0.2,
        ease: Back.easeOut,
        onComplete: () => {
          _this.backToNormal(s)
          this.fireRate = s
        },
      })

      TweenMax.to(this.tail.rotation, speed * 3, {
        x: -s * 0.1,
        ease: Back.easeOut,
      })
    }

    this.backToNormal = (s) => {
      const _this = this
      const speed = 1 * this.globalSpeedRate
      TweenLite.to(this.head.rotation, speed, {
        x: 0,
        ease: Strong.easeInOut,
      })
      TweenLite.to(this.head.position, speed, {
        z: 30,
        y: 0,
        ease: Back.easeOut,
      })
      TweenMax.to(this.noseL.scale, speed, {
        x: 1,
        y: 1,
        ease: Strong.easeInOut,
      })
      TweenMax.to(this.noseR.scale, speed, {
        x: 1,
        y: 1,
        ease: Strong.easeInOut,
      })
      TweenMax.to(this.noseL.position, speed, {
        y: 40,
        ease: Strong.easeInOut,
      })
      TweenMax.to(this.noseR.position, speed, {
        y: 40,
        ease: Strong.easeInOut,
      })
      TweenMax.to(this.irisL.scale, speed, {
        y: 1,
        z: 1,
        ease: Back.easeOut,
      })
      TweenMax.to(this.irisR.scale, speed, {
        y: 1,
        z: 1,
        ease: Back.easeOut,
      })
      TweenMax.to(this.irisL.position, speed * 0.7, {
        y: 30,
        ease: Back.easeOut,
      })
      TweenMax.to(this.irisR.position, speed * 0.7, {
        y: 30,
        ease: Back.easeOut,
      })
      TweenMax.to(this.eyeL.scale, speed, {
        y: 1,
        ease: Strong.easeOut,
      })
      TweenMax.to(this.eyeR.scale, speed, {
        y: 1,
        ease: Strong.easeOut,
      })
      TweenMax.to(this.body.rotation, speed, {
        x: 0,
        ease: Back.easeOut,
      })
      TweenMax.to(this.body.scale, speed, {
        y: 1,
        ease: Back.easeOut,
      })
      TweenMax.to(this.body.position, speed, {
        z: 0,
        ease: Back.easeOut,
      })

      TweenMax.to(this.wingL.rotation, speed * 1.3, {
        z: -Math.PI / 4,
        ease: Back.easeInOut,
      })
      TweenMax.to(this.wingR.rotation, speed * 1.3, {
        z: Math.PI / 4,
        ease: Back.easeInOut,
      })

      TweenMax.to(this.earL.rotation, speed * 1.3, {
        x: 0,
        y: 0,
        ease: Back.easeInOut,
      })
      TweenMax.to(this.earR.rotation, speed * 1.3, {
        x: 0,
        y: 0,
        ease: Back.easeInOut,
        onComplete: () => {
          _this.isSneezing = false
          this.timeSmoke = Math.round(s * 5)
        },
      })

      TweenMax.to(this.tail.rotation, speed * 1.3, {
        x: 0,
        ease: Back.easeOut,
      })
    }

    this.clickUp = () => {
      if (this.sneezeTimeout) clearTimeout(this.sneezeTimeout);
      this.sneezingRate += (this.maxSneezingRate - this.sneezingRate) / 10;
      if (!this.powerLoad.isInhale) {
        this.powerLoad.isInhale = true
        this.powerLoad.storage(this.sneezingRate*100 / this.maxSneezingRate)
      }
      if (!this.powerLoad.isAnger && this.sneezingRate*100 / this.maxSneezingRate > 80) {
        this.powerLoad.isAnger = true
        this.powerLoad.threshold()
      }
      const sneeze = () => {
        this.sneeze(this.sneezingRate);
        this.sneezingRate = 0;
        this.powerLoad.isInhale = false;
        this.powerLoad.storage(1);
        this.powerLoad.isAnger = false;
      }
      this.prepareToSneeze(this.sneezingRate);
      this.sneezeTimeout = setTimeout(sneeze, this.sneezeDelay*this.globalSpeedRate);
      this.isSneezing = true;
    }
	}
	
	makeCube = (mat, w, h, d, posX, posY, posZ, rotX, rotY, rotZ) => {
    const geom = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.x = posX;
    mesh.position.y = posY;
    mesh.position.z = posZ;
    mesh.rotation.x = rotX;
    mesh.rotation.y = rotY;
    mesh.rotation.z = rotZ;
    return mesh;
  }
}
