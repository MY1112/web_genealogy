export class Power {
  constructor() {
    this.powerGroup = new THREE.Group();

    const redMat = new THREE.MeshLambertMaterial({
        color: 0xcb3e4c
    });
    redMat.flatShading = true;
    const whiteMat =  new THREE.MeshLambertMaterial({
        color: 0xfaf3d7,
        opacity: 0.4,
        transparent: true
    })
    whiteMat.flatShading = true;

    const pipeGeometry = new THREE.CylinderGeometry(3, 3, 100, 32);
    this.pipe = new THREE.Mesh( pipeGeometry, whiteMat );

    const powerGeometry = new THREE.CylinderGeometry( 2, 2, 1, 32 );
    this.power = new THREE.Mesh( powerGeometry, redMat );
    this.power.position.y = -49.5;

    this.powerGroup.add(this.pipe)
    this.powerGroup.add(this.power)


    this.storage = (scaleY) => {
      const _this = this;
      TweenMax.to(this.power.position, 0.3, {
          y: (-100 + scaleY)/2
      })
      TweenMax.to(this.power.scale, 0.3, {
          y: scaleY,
          onComplete: () => {
              _this.isInhale = false;
          },
      })
    }

    this.threshold = function() {
        const _this = this;
        TweenMax.to(this.powerGroup.position, 0.05, {
            y: 109,
            repeat: 3,
            yoyo: true,
            onComplete: () => {
                _this.isAnger = false;
            },
        })
    }
  }
}

  