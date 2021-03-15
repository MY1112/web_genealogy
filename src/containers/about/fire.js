export class Fire {
  constructor({ globalSpeedRate, otherFireGroup }, cb) {
    this.color = {
      r: 0,
      g: 0,
      b: 0,
    }
    var particleMat = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 1,
    })
    particleMat.flatShading = true
    this.mesh = this.makeCube(particleMat, 4, 4, 4, 0, 0, 0, 0, 0, 0)
    cb(this)

    this.blowFly = function () {
      var _this = this
      var speed = 10 * globalSpeedRate
      var ease = Strong.easeOut
      var initX = this.mesh.position.x
      var initY = this.mesh.position.y
      var initZ = this.mesh.position.z
      var bezier = {
        type: 'cubic',
        values: [
          {
            x: initX,
            y: initY,
            z: initZ,
          },
          {
            x: initX - 5 - Math.random() * 10,
            y: initY + 30 + Math.random() * 2,
            z: initZ + 30,
          },
          {
            x: initX - 15 - Math.random() * 10,
            y: initY + 40 + Math.random() * 3,
            z: initZ + 45,
          },
          {
            x: initX - 40 + Math.random() * 20,
            y: initY + 70 + Math.random() * 5,
            z: initZ + 70,
          },
          {
            x: initX - 50 - Math.random() * 20,
            y: initY + 110 + Math.random() * 10,
            z: initZ + 100,
          },
        ],
      }
      TweenMax.to(this.mesh.position, speed / 2, {
        bezier: bezier,
        ease: ease,
      })
      TweenMax.to(this.mesh.rotation, speed / 2, {
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
      var bezierColor = [
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
        {
          r: 0 / 255,
          g: 0 / 255,
          b: 0 / 255,
        },
        {
          r: 0 / 255,
          g: 0 / 255,
          b: 0 / 255,
        },
      ]
      TweenMax.to(this.color, speed * 2, {
        bezier: bezierColor,
        ease: Strong.easeOut,
        onUpdate: function () {
          _this.updateColor()
        },
      })
      TweenMax.to(this.mesh.material, speed, {
        opacity: 0,
        ease: ease,
        onComplete: function () {
          _this.mesh.geometry.dispose()
          _this.mesh.material.dispose()
          otherFireGroup.remove(_this.mesh)
        },
      })
    }

    this.fly = function () {
      var _this = this
      var speed = 10 * globalSpeedRate
      var ease = Strong.easeOut
      var initX = this.mesh.position.x
      var initY = this.mesh.position.y
      var initZ = this.mesh.position.z
      var bezier = {
        type: 'cubic',
        values: [
          {
            x: initX,
            y: initY,
            z: initZ,
          },
          {
            x: initX + 5 - Math.random() * 10,
            y: initY + 30 + Math.random() * 2,
            z: initZ + 20,
          },
          {
            x: initX + 20 - Math.random() * 10,
            y: initY + 40 + Math.random() * 3,
            z: initZ - 20,
          },
          {
            x: initX + 10 + Math.random() * 20,
            y: initY + 70 + Math.random() * 5,
            z: initZ - 30,
          },
          {
            x: initX + 50 - Math.random() * 20,
            y: initY + 110 + Math.random() * 10,
            z: initZ + 30,
          },
        ],
      }
      var myTween = TweenMax.to(this.mesh.position, speed, {
        bezier: bezier,
        ease: ease,
			})
			otherFireGroup.myTweenList.push(myTween)
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
      var bezierColor = [
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
        {
          r: 0 / 255,
          g: 0 / 255,
          b: 0 / 255,
        },
        {
          r: 0 / 255,
          g: 0 / 255,
          b: 0 / 255,
        },
      ]
      TweenMax.to(this.color, speed * 2, {
        bezier: bezierColor,
        ease: Strong.easeOut,
        onUpdate: function () {
          _this.updateColor()
        },
      })
      TweenMax.to(this.mesh.material, speed, {
        opacity: 0,
        ease: ease,
        onComplete: function () {
          _this.mesh.geometry.dispose()
          _this.mesh.material.dispose()
          otherFireGroup.remove(_this.mesh)
        },
			})
    }

    this.updateColor = function () {
      this.mesh.material.color.setRGB(this.color.r, this.color.g, this.color.b)
    }
  }

  makeCube = (mat, w, h, d, posX, posY, posZ, rotX, rotY, rotZ) => {
    const geom = new THREE.BoxGeometry(w, h, d)
    const mesh = new THREE.Mesh(geom, mat)
    mesh.position.x = posX
    mesh.position.y = posY
    mesh.position.z = posZ
    mesh.rotation.x = rotX
    mesh.rotation.y = rotY
    mesh.rotation.z = rotZ
    return mesh
  }
}
