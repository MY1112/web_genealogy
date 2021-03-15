export class Pig {
    constructor() {
      this.rSegments = 10
      this.hSegments = 8
      this.cylRay = 120
      this.bodyPigInitPositions = []
      this.vAngle = this.hAngle = 0
      this.normalSkin = { r: 255 / 255, g: 222 / 255, b: 121 / 255 }
      this.shySkin = { r: 255 / 255, g: 157 / 255, b: 101 / 255 }
      this.color = {
        r: this.normalSkin.r,
        g: this.normalSkin.g,
        b: this.normalSkin.b,
      }
      this.side = 'left'
  
      this.shyAngles = { h: 0, v: 0 }
      this.behaviourInterval
      this.intervalRunning = false
  
      this.threegroup = new THREE.Group()
  
      // materials
      this.pinkMat = new THREE.MeshLambertMaterial({
        color: 0xe8c0b7,
      })
      this.pinkPlusMat = new THREE.MeshLambertMaterial({
        color: 0xe6ada1,
      })
      this.blackMat = new THREE.MeshLambertMaterial({
        color: 0x000000,
      })
      this.orangeMat = new THREE.MeshLambertMaterial({
        color: 0xff5535,
      })
      this.brownMat = new THREE.MeshLambertMaterial({
        color: 0x591a1a,
      })
  
      // 不规则图形参数
      var extrudeSettings = {
        depth: 8,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 1,
        bevelThickness: 1,
      }
  
      //BODY
  
      var bodyShape = new THREE.Shape()
      bodyShape.moveTo(-50, 0)
      bodyShape.moveTo(-50, 50)
      bodyShape.moveTo(-46, 54)
      bodyShape.moveTo(-50, 58)
      bodyShape.lineTo(-50, 120)
      bodyShape.lineTo(-40, 130)
      bodyShape.lineTo(40, 130)
      bodyShape.lineTo(50, 120)
      bodyShape.lineTo(50, 58)
      bodyShape.lineTo(46, 54)
      bodyShape.lineTo(50, 50)
      bodyShape.lineTo(50, 0)
      bodyShape.lineTo(-50, 0)
      var bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
        ...extrudeSettings,
        depth: 20,
      })
      this.bodyPig = new THREE.Mesh(bodyGeom, this.pinkMat)
      this.bodyPig.position.z = -6
      this.threegroup.add(this.bodyPig)
  
      // hoof
  
      // EAR
  
      var earLeftShape = new THREE.Shape()
      earLeftShape.moveTo(0, 0)
      earLeftShape.lineTo(0, 15)
      earLeftShape.lineTo(15, 15)
      earLeftShape.lineTo(0, 0)
      var earLeftGeom = new THREE.ExtrudeGeometry(earLeftShape, extrudeSettings)
      this.earLeftPig = new THREE.Mesh(earLeftGeom, this.pinkMat)
      this.earLeftPig.position.x = -59
      this.earLeftPig.position.y = 126
      var earLeftVector3 = new THREE.Vector3(1, 1, 0)
      this.earLeftPig.setRotationFromAxisAngle(earLeftVector3, Math.PI / 6)
  
      var earRightShape = new THREE.Shape()
      earRightShape.moveTo(0, 0)
      earRightShape.lineTo(0, 15)
      earRightShape.lineTo(-15, 15)
      earRightShape.lineTo(0, 0)
      var earRightGeom = new THREE.ExtrudeGeometry(earRightShape, extrudeSettings)
      this.earRightPig = new THREE.Mesh(earRightGeom, this.pinkMat)
      this.earRightPig.position.x = 59
      this.earRightPig.position.y = 126
      var earRightVector3 = new THREE.Vector3(1, -1, 0)
      this.earRightPig.setRotationFromAxisAngle(earRightVector3, Math.PI / 4)
  
      this.threegroup.add(this.earRightPig)
      this.threegroup.add(this.earLeftPig)
  
      // EARRING
  
      var earringGeometry = new THREE.TorusGeometry( 8, 1, 16, 100 );
      var earringMaterial = new THREE.MeshPhongMaterial({
        color: 0x889199,
        specular: 0xb9c2c9,
        shininess: 100,
      })
      this.earring = new THREE.Mesh( earringGeometry, earringMaterial );
      this.earring.position.set(-52, 95, 13)
      this.earring.rotation.set(Math.PI / 2, Math.PI / 4, 0)
  
      this.threegroup.add(this.earring)
  
      // EYES
  
      this.face = new THREE.Group()
      this.face.name = 'pig-face'
      var irisGeom = new THREE.BoxGeometry(10, 3, 4)
  
      this.leftIris = new THREE.Mesh(irisGeom, this.blackMat)
      this.leftIris.position.x = -15
      this.leftIris.position.y = 105
      this.leftIris.position.z = 20
  
      this.rightIris = new THREE.Mesh(irisGeom, this.blackMat)
      this.rightIris.position.x = 15
      this.rightIris.position.y = 105
      this.rightIris.position.z = 20
  
      // BLUSH
      var blushGeom = new THREE.CircleGeometry(5, 32)
  
      this.leftBlush = new THREE.Mesh(blushGeom, this.orangeMat)
      this.leftBlush.position.x = -26
      this.leftBlush.position.y = 80
      this.leftBlush.position.z = 20
  
      this.rightBlush = new THREE.Mesh(blushGeom, this.orangeMat)
      this.rightBlush.position.x = 26
      this.rightBlush.position.y = 80
      this.rightBlush.position.z = 20
  
      // GLASSES
  
      var glassesShape = new THREE.Shape()
      glassesShape.moveTo(0, 5)
      glassesShape.bezierCurveTo(0, 5, -2, 4, -3, 2)
      glassesShape.bezierCurveTo(-3, 2, -5, -2, -7, -2)
      glassesShape.bezierCurveTo(-7, -2, -14, -2, -23, -2)
      glassesShape.bezierCurveTo(-23, -2, -25, 1, -27, 10)
      glassesShape.bezierCurveTo(-27, 10, -25, 11, -23, 12)
      glassesShape.bezierCurveTo(-23, 12, 0, 12, 23, 12)
      glassesShape.bezierCurveTo(23, 12, 25, 11, 27, 10)
      glassesShape.bezierCurveTo(27, 10, 25, 1, 23, -2)
      glassesShape.bezierCurveTo(23, -2, 14, -2, 7, -2)
      glassesShape.bezierCurveTo(7, -2, 5, -2, 3, 2)
      glassesShape.bezierCurveTo(3, 2, 2, 4, 0, 5)
      var glassesGeom = new THREE.ExtrudeGeometry(glassesShape, {
        ...extrudeSettings,
        depth: 2
      })
      const glassesMaterial =  new THREE.MeshPhongMaterial({
          color: 0x1dcdf5,
          opacity: 0.7,
          transparent: true,
          specular: 0xccff00,
          shininess: 100,
        })
      glassesMaterial.flatShading = true
      this.glasses = new THREE.Mesh(
        glassesGeom,
        glassesMaterial
      )
      this.glasses.position.z = 30
      this.glasses.position.y = 100
      this.glasses.position.x = 0
  
      // NOSE
      this.nose = new THREE.Group();
      this.nose.name = 'pig-nose'
      var noseBodyGeom = new THREE.CylinderGeometry(15, 15, 10, 32)
      var nostrilGeom = new THREE.BoxGeometry(4, 7, 4)
  
      this.noseBody = new THREE.Mesh(noseBodyGeom, this.pinkPlusMat)
      this.noseBody.position.z = 30
      this.noseBody.position.y = 80
      this.noseBody.rotation.x = Math.PI / 2
  
      this.leftNostril = new THREE.Mesh(nostrilGeom, this.brownMat)
      this.leftNostril.position.x = -6
      this.leftNostril.position.y = 80
      this.leftNostril.position.z = 34
  
      this.rightNostril = new THREE.Mesh(nostrilGeom, this.brownMat)
      this.rightNostril.position.x = 6
      this.rightNostril.position.y = 80
      this.rightNostril.position.z = 34
  
      this.nose.add(this.rightNostril)
      this.nose.add(this.leftNostril)
      this.nose.add(this.noseBody)
      this.face.add(this.rightIris)
      this.face.add(this.leftIris)
      this.face.add(this.glasses)
      this.face.add(this.nose)
      this.face.add(this.leftBlush)
      this.face.add(this.rightBlush)
  
      this.threegroup.add(this.face)
      this.threegroup.name = 'pig'
  
      //FEATHERS
  
      this.threegroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true
          object.receiveShadow = true
        }
      })
  
      this.blink = () => {
        new TweenMax([this.leftIris.scale, this.rightIris.scale], 0.6, {
          z: 1.5,
          x: 0.6,
          y: 2,
          repeat: -1,
          repeatDelay: 2,
        })
      }
  
      this.inhale = () => {
        if (this.tm) {
          this.tm.restart()
        } else {
          this.tm = TweenMax.to(this.noseBody.scale, 0.3, {
            z: 0.8,
            repeat: 2,
            yoyo: true,
            onComplete: () => {
              TweenMax.to(this.noseBody.scale, 0.3, {
                z: 1,
              })
            },
          })
        }
      }
  
      this.lovelyLeft = () => {
        if (this.loveTwLeft) {
          this.loveTwLeft.restart()
        } else {
          this.loveTwLeft = TweenMax.to(this.earLeftPig.rotation, 0.2, {
            x: 1.6,
            y: 1,
            z: -0.5,
            repeat: 2,
            yoyo: true,
            onComplete: () => {
              TweenMax.to(this.earLeftPig.rotation, 0.3, {
                x: 0.6,
                y: 0.53,
                z: -0.15,
              })
            },
          })
        }
      }
      this.lovelyRight = () => {
        if (this.loveTwRight) {
          this.loveTwRight.restart()
        } else {
          this.loveTwRight = TweenMax.to(this.earRightPig.rotation, 0.2, {
            x: 1.5,
            y: -0.8,
            z: 0.2,
            repeat: 2,
            yoyo: true,
            onComplete: () => {
              TweenMax.to(this.earRightPig.rotation, 0.3, {
                x: 1,
                y: -0.78,
                z: 0.4,
              })
            },
          })
        }
      }
    }
  }