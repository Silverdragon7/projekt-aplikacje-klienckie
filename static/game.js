class Game {
    constructor() {
        window.onresize = () => this.resize()
        this.pos = -60
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(this.pos, 30, 0)
        this.camera.lookAt(this.scene.position);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x2596BE);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        //platformy
        this.platformaMaterial = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('https://i.imgur.com/xZqEj7C.jpeg'),
            transparent: true,
            opacity: 1,
            color: 0xb0e1ab,
        })
        this.platformaGeometry = new THREE.CylinderGeometry(10, 10, 0.5, 32);
        //materiały do modeli
        this.sonicMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("mats/SONIC.png"),
                morphTargets: true
            });
        this.beanMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("mats/BEAN.png"),
                morphTargets: true
            });
        this.creamMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("mats/CREAM.png"),
                morphTargets: true
            });
        this.knucklesMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("mats/KNUCKLES.png"),
                morphTargets: true
            });
        this.tailsMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("mats/TAILS.png"),
                morphTargets: true
            });
        //do ładowania modeli
        this.loader = new THREE.JSONLoader();
        //do raycastera
        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2()
        //onclick -> do usunięcia
        document.getElementById("root").onclick = (e) => this.click(e)
        this.lastClicked
        this.clock = new THREE.Clock();
        this.render()
    }
    click = (event) => {
        this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouseVector, this.camera);
        this.intersects = this.raycaster.intersectObjects(this.scene.children);
        //jeśli kliknięty obiekt nie jest platformą
        if (this.intersects.length > 0 && this.intersects[0].object.name != "") {
            console.log(this.intersects[0].object);
            this.lastClicked = this.intersects[0].object
        }
    }
    //model tails
    tails = (x, y, z) => {
        this.loader.load('models/TAILS.js', function (geometry) {
            game.tailsModel = new THREE.Mesh(geometry, game.tailsMaterial)
            game.tailsModel.name = "Tails";
            //skalowanie
            game.tailsModel.scale.x = 0.3
            game.tailsModel.scale.y = 0.3
            game.tailsModel.scale.z = 0.3
            //pozycja
            game.tailsModel.position.x += x
            game.tailsModel.position.z += z
            game.tailsModel.rotation.y += y
            //dodanie
            game.scene.add(game.tailsModel);
            game.tailsMixer = new THREE.AnimationMixer(game.tailsModel)
            //console.log(geometry.animations)
            // tutaj animacje
            if (ui.avatar == "Tails") {
                game.user = game.tailsModel
                game.mixer = game.tailsMixer
            } else if (ui.avatarPrzeciwnika == "Tails") {
                game.user2 = game.tailsModel
                game.mixer2 = game.tailsMixer
            }
        })
    }
    //model amy
    amy = (x, y, z) => {
        this.loader.load('models/CREAM.js', function (geometry) {
            game.creamModel = new THREE.Mesh(geometry, game.creamMaterial)
            game.creamModel.name = "Cream";
            //skalowanie
            game.creamModel.scale.x = 0.3
            game.creamModel.scale.y = 0.3
            game.creamModel.scale.z = 0.3
            //pozycja
            game.creamModel.position.x += x
            game.creamModel.position.z += z
            game.creamModel.rotation.y += y
            //dodanie
            game.scene.add(game.creamModel);
            // tutaj animacje
            console.log(geometry.animations)

            game.creamMixer = new THREE.AnimationMixer(game.creamModel)
            //game.amyMixer.clipAction("Fly").play()
            //game.amyMixer.clipAction("Item").play()
            if (ui.avatar == "Amy") {
                game.user = game.creamModel
                game.mixer = game.creamMixer
            } else if (ui.avatarPrzeciwnika == "Amy") {
                game.user2 = game.creamModel
                game.mixer2 = game.creamMixer
            }
        })
    }
    //model knuckles
    knuckles = (x, y, z) => {
        this.loader.load('models/KNUCKLES.js', function (geometry) {
            game.knucklesModel = new THREE.Mesh(geometry, game.knucklesMaterial)
            game.knucklesModel.name = "Knuckles";
            //skalowanie
            game.knucklesModel.scale.x = 0.3
            game.knucklesModel.scale.y = 0.3
            game.knucklesModel.scale.z = 0.3
            //pozycja
            game.knucklesModel.position.x += x
            game.knucklesModel.position.z += z
            game.knucklesModel.rotation.y += y
            //dodanie
            game.scene.add(game.knucklesModel);
            // tutaj animacje
            game.knucklesMixer = new THREE.AnimationMixer(game.knucklesModel)
            if (ui.avatar == "Knuckles") {
                game.user = game.knucklesModel
                game.mixer = game.knucklesMixer
            } else if (ui.avatarPrzeciwnika == "Knuckles") {
                game.user2 = game.knucklesModel
                game.mixer2 = game.knucklesMixer
            }
            //game.knucklesMixer.clipAction("GluideClimb").play()
            //game.knucklesMixer.clipAction("GrabItems").play()
            //game.knucklesMixer.clipAction("Jog").play()
        })
    }
    //model bean
    bean = (x, y, z) => {
        this.loader.load('models/BEAN.js', function (geometry) {
            game.beanModel = new THREE.Mesh(geometry, game.beanMaterial)
            game.beanModel.name = "Bean";
            //skalowanie
            game.beanModel.scale.x = 0.3
            game.beanModel.scale.y = 0.3
            game.beanModel.scale.z = 0.3
            //pozycja
            game.beanModel.position.x += x
            game.beanModel.position.z += z
            game.beanModel.rotation.y += y
            //dodanie
            game.scene.add(game.beanModel);
            if (ui.avatar == "Bean") {
                game.user = game.beanModel
                game.mixer = game.beanMixer
            } else if (ui.avatarPrzeciwnika == "Bean") {
                game.user2 = game.beanModel
                game.mixer2 = game.beanMixer
            }
            // tutaj animacje
            //console.log(geometry.animations)
            //game.beanMixer = new THREE.AnimationMixer(game.beanModel)
            //game.beanMixer.clipAction("Ability").play()
            //Grab00001e
        })
    }
    //model sonic
    sonic = (x, y, z) => {
        this.loader.load('models/SONIC.js', function (geometry) {
            game.sonicModel = new THREE.Mesh(geometry, game.sonicMaterial)
            game.sonicModel.name = "Sonic";
            //skalowanie
            game.sonicModel.scale.x = 0.3
            game.sonicModel.scale.y = 0.3
            game.sonicModel.scale.z = 0.3
            //pozycja
            game.sonicModel.position.x += x
            game.sonicModel.position.z += z
            game.sonicModel.rotation.y += y
            //dodanie
            game.scene.add(game.sonicModel);
            // tutaj animacje
            console.log(geometry.animations)
            //nie działa
            game.sonicMixer = new THREE.AnimationMixer(game.sonicModel)
            ///
            if (ui.avatar == "Sonic") {
                game.user = game.sonicModel
                game.mixer = game.sonicMixer
            } else if (ui.avatarPrzeciwnika == "Sonic") {
                game.user2 = game.sonicModel
                game.mixer2 = game.sonicMixer
            }
            //game.sonicMixer.clipAction("Spin").play()
            //game.sonicMixer.clipAction("Spring").play()
            ///
            //game.sonicMixer.clipAction("Super").play()
            //???
            //game.sonicMixer.clipAction("AirHurtDie").play()
            //game.sonicMixer.clipAction("Balance000e").play()
            //game.sonicMixer.clipAction("Fall00001e").play()
            //mixer.clipAction("Grab00001e").play()
            //game.sonicMixer.clipAction("SuperTrans").play()

        });
    }
    //generowanie platform i postaci. Start gry
    start = () => {
        //stworzenie i pozycjonowanie platform
        this.platforma1 = new THREE.Mesh(this.platformaGeometry, this.platformaMaterial)
        this.platforma1.position.x -= 20
        this.platforma1.position.z -= 10
        this.scene.add(this.platforma1)
        this.platforma2 = new THREE.Mesh(this.platformaGeometry, this.platformaMaterial)
        this.platforma2.position.x += 20
        this.platforma2.position.z += 10
        this.scene.add(this.platforma2)
        //dodanie postaci gracza
        if (ui.skills1.avatar == "Sonic") {
            game.sonic(-20, -180, -10)
        } else if (ui.skills1.avatar == "Amy") {
            game.amy(-20, -180, -10)
        } else if (ui.skills1.avatar == "Bean") {
            game.bean(-20, -180, -10)
        } else if (ui.skills1.avatar == "Knuckles") {
            game.knuckles(-20, -180, -10)
        } else if (ui.skills1.avatar == "Tails") {
            game.tails(-20, -180, -10)
        }
        //dodanie przeciwnika
        if (ui.skills2.avatar == "Sonic") {
            game.sonic(20, 169, 10)
        } else if (ui.skills2.avatar == "Amy") {
            game.amy(20, 169, 10)
        } else if (ui.skills2.avatar == "Bean") {
            game.bean(20, 169, 10)
        } else if (ui.skills2.avatar == "Knuckles") {
            game.knuckles(20, 169, 10)
        } else if (ui.skills2.avatar == "Tails") {
            game.tails(20, 169, 10)
        }
    }

    render = (x, z) => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        let delta = this.clock.getDelta();
        if (this.sonicMixer) this.sonicMixer.update(delta)
        if (this.beanMixer) this.beanMixer.update(delta)
        if (this.knucklesMixer) this.knucklesMixer.update(delta)
        if (this.amyMixer) this.amyMixer.update(delta)
        if (this.tailsMixer) this.tailsMixer.update(delta)
        if (this.mixer) this.mixer.update(delta)
        if (this.mixer2) this.mixer2.update(delta)
        // console.log("render leci")
    }

    resize = (x, z) => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}