//tylko to co ze strony dsa, nic tu nie ma do oglądania
class Game {

    constructor() {
        window.onresize = () => this.resize()
        this.pos = -60
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.camera.position.set(this.pos, 30, 0)
        this.camera.lookAt(this.scene.position);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x2596BE);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        this.platformaMaterial = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('https://i.imgur.com/xZqEj7C.jpeg'),
            transparent: true,
            opacity: 1,
            color: 0xb0e1ab,
        })
        this.platformaGeometry = new THREE.CylinderGeometry(10, 10, 0.5, 32);
        this.render() 
        //this.start()

    }
    
    start = () => {
        this.platforma1 = new THREE.Mesh(this.platformaGeometry, this.platformaMaterial)
        this.platforma1.position.x -= 20
        this.platforma1.position.z -= 10
        this.scene.add(this.platforma1)
        this.platforma2 = new THREE.Mesh(this.platformaGeometry, this.platformaMaterial)
        this.platforma2.position.x += 20
        this.platforma2.position.z += 10
        this.scene.add(this.platforma2)
    }

    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        console.log("render leci")
    }

    resize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}