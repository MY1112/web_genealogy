export class Fan {
  constructor() {
    this.isBlowing = false
    this.speed = 0
    this.acc = 0
    this.redMat = new THREE.MeshLambertMaterial({
      color: 0xad3525
    })
    this.redMat.flatShading = true;
    this.greyMat = new THREE.MeshLambertMaterial({
      color: 0x653f4c
    })
    this.greyMat.flatShading = true;
    this.yellowMat = new THREE.MeshLambertMaterial({
      color: 0xfdd276
    })
    this.yellowMat.flatShading = true;

    var coreGeom = new THREE.BoxGeometry(10, 10, 20)
    var sphereGeom = new THREE.BoxGeometry(10, 10, 3)
    var propGeom = new THREE.BoxGeometry(10, 60, 2)
    propGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 25, 0))

    this.core = new THREE.Mesh(coreGeom, this.greyMat)

    // propellers
    var prop1 = new THREE.Mesh(propGeom, this.redMat)
    prop1.position.z = 15
    var prop2 = prop1.clone()
    prop2.rotation.z = Math.PI / 2
    var prop3 = prop1.clone()
    prop3.rotation.z = Math.PI
    var prop4 = prop1.clone()
    prop4.rotation.z = -Math.PI / 2

    this.sphere = new THREE.Mesh(sphereGeom, this.yellowMat)
    this.sphere.position.z = 15

    this.propeller = new THREE.Group()
    this.propeller.add(prop1)
    this.propeller.add(prop2)
    this.propeller.add(prop3)
    this.propeller.add(prop4)

    this.threeGroup = new THREE.Group()
    this.threeGroup.add(this.core)
    this.threeGroup.add(this.propeller)
    this.threeGroup.add(this.sphere)

    this.update = () => {
      this.threeGroup.lookAt(new THREE.Vector3(0, 80, 60))

      this.targetSpeed = this.isBlowing ? 0.3 : 0.01
      if (this.isBlowing && this.speed < 0.5) {
        this.acc += 0.001
        this.speed += this.acc
      } else if (!this.isBlowing) {
        this.acc = 0
        this.speed *= 0.98
      }
      this.propeller.rotation.z += this.speed
    }
  }
}
