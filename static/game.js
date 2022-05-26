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
        this.sonicMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("mats/SONIC.png"), // dowolny plik png, jpg
                morphTargets: true // ta własność odpowiada za możliwość animowania materiału modelu
            });
        this.beanMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("mats/BEAN.png"), // dowolny plik png, jpg
                morphTargets: true // ta własność odpowiada za możliwość animowania materiału modelu
            });
        this.amyMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("mats/AMY.png"), // dowolny plik png, jpg
                morphTargets: true // ta własność odpowiada za możliwość animowania materiału modelu
            });
        this.knucklesMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("mats/KNUCKLES.png"), // dowolny plik png, jpg
                morphTargets: true // ta własność odpowiada za możliwość animowania materiału modelu
            });
        this.tailsMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("mats/TAILS.png"), // dowolny plik png, jpg
                morphTargets: true // ta własność odpowiada za możliwość animowania materiału modelu
            });
        this.loader = new THREE.JSONLoader();
        this.render()
        //this.start()

    }
    tails = (x, y, z) => {
        this.loader.load('models/KNUCKLES.js', function (geometry) {

            game.tailsModel = new THREE.Mesh(geometry, game.tailsMaterial)
            game.tailsModel.name = "Tails";
            //meshModel.rotation.y = ??; // ustaw obrót modelu
            //meshModel.position.y = ??; // ustaw pozycje modelu
            //meshModel.scale.set(x,y,z); // ustaw skalę modelu
            game.tailsModel.scale.x = 0.3
            game.tailsModel.scale.y = 0.3
            game.tailsModel.scale.z = 0.3
            //
            game.tailsModel.position.x += x
            game.tailsModel.position.z += z
            game.tailsModel.rotation.y += y

            game.scene.add(game.tailsModel);

            // tutaj animacje z punktu 9
        })
    }
    amy = (x, y, z) => {
        this.loader.load('models/AMY.js', function (geometry) {

            game.amyModel = new THREE.Mesh(geometry, game.amyMaterial)
            game.amyModel.name = "Amy";
            //meshModel.rotation.y = ??; // ustaw obrót modelu
            //meshModel.position.y = ??; // ustaw pozycje modelu
            //meshModel.scale.set(x,y,z); // ustaw skalę modelu
            game.amyModel.scale.x = 0.3
            game.amyModel.scale.y = 0.3
            game.amyModel.scale.z = 0.3
            //
            game.amyModel.position.x += x
            game.amyModel.position.z += z
            game.amyModel.rotation.y += y

            game.scene.add(game.amyModel);

            // tutaj animacje z punktu 9
        })
    }
    knuckles = (x, y, z) => {
        this.loader.load('models/KNUCKLES.js', function (geometry) {

            game.knucklesModel = new THREE.Mesh(geometry, game.knucklesMaterial)
            game.knucklesModel.name = "Knuckles";
            //meshModel.rotation.y = ??; // ustaw obrót modelu
            //meshModel.position.y = ??; // ustaw pozycje modelu
            //meshModel.scale.set(x,y,z); // ustaw skalę modelu
            game.knucklesModel.scale.x = 0.3
            game.knucklesModel.scale.y = 0.3
            game.knucklesModel.scale.z = 0.3
            //
            game.knucklesModel.position.x += x
            game.knucklesModel.position.z += z
            game.knucklesModel.rotation.y += y

            game.scene.add(game.knucklesModel);

            // tutaj animacje z punktu 9
        })
    }
    bean = (x, y, z) => {
        this.loader.load('models/BEAN.js', function (geometry) {

            game.beanModel = new THREE.Mesh(geometry, game.beanMaterial)
            game.beanModel.name = "Bean";
            //meshModel.rotation.y = ??; // ustaw obrót modelu
            //meshModel.position.y = ??; // ustaw pozycje modelu
            //meshModel.scale.set(x,y,z); // ustaw skalę modelu
            game.beanModel.scale.x = 0.3
            game.beanModel.scale.y = 0.3
            game.beanModel.scale.z = 0.3
            //
            game.beanModel.position.x += x
            game.beanModel.position.z += z
            game.beanModel.rotation.y += y
            game.scene.add(game.beanModel);

            // tutaj animacje z punktu 9
        })
    }
    sonic = (x, y, z) => {
        this.loader.load('models/SONIC.js', function (geometry) {

            game.sonicModel = new THREE.Mesh(geometry, game.sonicMaterial)
            game.sonicModel.name = "Sonic";
            //meshModel.rotation.y = ??; // ustaw obrót modelu
            //meshModel.position.y = ??; // ustaw pozycje modelu
            //meshModel.scale.set(x,y,z); // ustaw skalę modelu
            game.sonicModel.scale.x = 0.3
            game.sonicModel.scale.y = 0.3
            game.sonicModel.scale.z = 0.3
            //
            game.sonicModel.position.x += x
            game.sonicModel.position.z += z
            game.sonicModel.rotation.y += y
            game.scene.add(game.sonicModel);

            // tutaj animacje z punktu 9

        });
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
        if (ui.skills1.avatar == "Sonic"){
            game.sonic(-20, -180, -10)
        }else if (ui.skills1.avatar == "Amy"){
            game.amy(-20, -180, -10)
        }else if (ui.skills1.avatar == "Bean"){
            game.bean(-20, -180, -10)
        }else if (ui.skills1.avatar == "Knuckles"){
            game.knuckles(-20, -180, -10)
        }else if (ui.skills1.avatar == "Tails"){
            game.tails(-20, -180, -10)
        }
        if (ui.skills2.avatar == "Sonic"){
            game.sonic(20, 0, 10)
        }else if (ui.skills2.avatar == "Amy"){
            game.amy(20, 0, 10)
        }else if (ui.skills2.avatar == "Bean"){
            game.bean(20, 0, 10)
        }else if (ui.skills2.avatar == "Knuckles"){
            game.knuckles(20, 0, 10)
        }else if (ui.skills2.avatar == "Tails"){
            game.tails(20, 0, 10)
        }
    }

    render = (x,z) => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        console.log("render leci")
    }

    resize = (x,z) => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}