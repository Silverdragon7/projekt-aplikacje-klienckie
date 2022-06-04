class Ui {
    constructor() {
        this.setName()
        //nazwy avatarów
        this.lista = ["Amy", "Bean", "Knuckles", "Sonic", "Tails"]
        //wszystkie dziwne opcje jakie będą miały
        this.skills = [
            { avatar: "Amy", lvl: "1", hp: 100, options: ["Attack", "Spin", "Heal", "Skip"] },
            { avatar: "Bean", lvl: "1", hp: 100, options: ["Attack", "Spin", "Heal", "Skip"] },
            { avatar: "Knuckles", lvl: "1", hp: 100, options: ["Attack", "Spin", "Heal", "Skip"] },
            { avatar: "Sonic", lvl: "1", hp: 100, options: ["Attack", "Spin", "Heal", "Skip"] },
            { avatar: "Tails", lvl: "1", hp: 100, options: ["Attack", "Spin", "Heal", "Skip"] }
        ]
    }
    //uzytkownik podaje nick, serwer sprawdza czy juz istnieje 
    setName = async () => {
        this.name = prompt("Podaj nick:")
        let dane = await net.checkNick(this.name)
        //jesli wolny, przechodzi do wyboru postaci
        if (dane.nick == true) {
            let data = await net.checkUsers()
            if (data.users == true) {
                this.choose(data.avatar)
                //jeśli jest za dużo użytkowników to krzyczy
            } else {
                alert("Już jest dwóch użytkowników")
            }
            //jesli nie, od nowa
        } else {
            alert("Nick jest zajęty")
            this.setName()
        }

    }
    //wybor postaci
    choose = async (avatar) => {
        //tu będą nazwy
        let lista = []
        //jeśli drugi użytkownik nic nie wybrał to cała lista, jesli wybral to bez tego wybranego
        if (avatar == null) {
            lista = this.lista
        } else {
            for (let el of this.lista) {
                if (el != avatar) {
                    lista.push(el)
                }
            }
        }
        //tworzymy selecta
        let div = document.getElementById("choose")
        let select = document.createElement("select")
        select.id = "selectAvatar"
        div.innerHTML = "Hello " + this.name + ". Choose your fighter: <br>"
        for (let a of lista) {
            let opt = document.createElement("option")
            opt.value = a
            opt.innerHTML = a
            select.append(opt)
        }
        div.append(select)
        div.innerHTML += "<br>"
        //Jakis button do potwierdzania
        let button = document.createElement("button")
        button.innerHTML = "AAA"
        //po kliknięciu sprawdza czy avatar jest wolny i znika diva
        button.onclick = async () => {
            this.avatar = document.getElementById("selectAvatar").value
            //przypisuje twoje skille
            for (let a of this.skills) {
                if (a.avatar == this.avatar) {
                    this.skills1 = a
                }
            }
            //wysyła na serwer i sprawdza czy jest wolny
            let dane = await net.sendAvatar(this.avatar)
            if (dane.zajete) {
                alert("Ten avatar jest już zajęty")
            } else if (dane.avatar2) {
                this.avatarPrzeciwnika = dane.avatar1
                for (let a of this.skills) {
                    if (a.avatar == this.avatarPrzeciwnika) {
                        this.skills2 = a
                    }
                }
                div.style.display = "none"
                //start
                this.start()
                this.you = 2
                this.opponentsTurn()

            } else {
                div.style.display = "none"
                //start czekania na drugiego gracza
                this.wait(0)
            }

        }
        div.append(button)
    }
    //funkcja z timeoutem czekająca na tego drugiego
    wait = async (x) => {
        let data = await net.checkSecondUser()
        if (x == 0) {
            document.getElementById("status").innerHTML = "Waiting for other player"
        }
        if (x == 1) {
            document.getElementById("status").innerHTML = "Waiting for other player."
        }
        if (x == 2) {
            document.getElementById("status").innerHTML = "Waiting for other player.."
        }
        if (x == 3) {
            document.getElementById("status").innerHTML = "Waiting for other player..."
            x = -1
        }
        if (data.second == false) {
            setTimeout(this.wait, 300, x + 1)
        } else {
            //jeśli drugi już jest, przypisuje sobie jego skille
            this.avatarPrzeciwnika = data.avatar2
            console.log(data)
            for (let a of this.skills) {
                if (a.avatar == this.avatarPrzeciwnika) {
                    this.skills2 = a
                    console.log(ui.skills2)
                }
            }
            document.getElementById("status").innerHTML = ""
            //start gry
            this.you = 1
            this.start()
            this.yourTurn()
            
        }
    }
    yourTurn = () => {

    }
    start = () => {
        //tworzy pola ze statystykami swoimi i przeciwnika
        let statystyka = document.createElement("div")
        statystyka.id = "statystyka"
        statystyka.classList.add("statystyka")
        //wpisanie danych początkowych uzytkownika
        let name = document.createElement("h4")
        name.innerHTML = this.skills1.avatar
        statystyka.append(name)

        let lvl_hp = document.createElement("div")
        let lvl = document.createElement("p")
        let hp = document.createElement("p")
        lvl.innerHTML = "Lvl: " + this.skills1.lvl
        hp.innerHTML = "Hp: " + this.skills1.hp + "/100"
        lvl.id = "lvl"
        hp.id = "hp"
        lvl_hp.appendChild(lvl)
        lvl_hp.appendChild(hp)

        statystyka.append(lvl_hp)
        document.body.append(statystyka)

        //wpisanie danych przeciwnika
        let statystykaPrzeciwnika = document.createElement("div")
        statystykaPrzeciwnika.id = "statystykaPrzeciwnika"
        statystykaPrzeciwnika.classList.add("statystyka")
        let namePrzeciwnika = document.createElement("h4")
        namePrzeciwnika.innerHTML = this.skills2.avatar
        statystykaPrzeciwnika.append(namePrzeciwnika)

        let lvl_hpPrzeciwnika = document.createElement("p")
        lvl_hpPrzeciwnika.id = "przeciwnik"
        lvl_hpPrzeciwnika.innerHTML = "<pre>Lvl: " + this.skills2.lvl + "                     " + "Hp: " + this.skills2.hp + "/100</pre>"
        statystykaPrzeciwnika.append(lvl_hpPrzeciwnika)
        document.body.append(statystykaPrzeciwnika)

        this.buttony()
        //generowanie modeli i platform
        game.start()

    }
    opponentsTurn = async () => {
        let turn = await net.checkTurn()
        console.log(turn)
        document.getElementById("opponentsTurn").style.display = "block"
        if (turn.lastMove == this.you || turn.lastMove == 0) {
            setTimeout(this.opponentsTurn, 500)
        }else{
            document.getElementById("opponentsTurn").style.display = "none"
            if(turn.move == "skip"){
                alert(this.avatarPrzeciwnika + " skipped their move")
            }else if (turn.move == "hp"){
                this.skills2.hp += 10
                console.log(hp)
                document.getElementById("przeciwnik").innerHTML = "<pre>Lvl: " + this.skills2.lvl + "                     " + "Hp: " + this.skills2.hp + "/100</pre>"
            }
        }

    }
    buttony = () => {
        let bt1 = document.createElement("button")
        let bt2 = document.createElement("button")
        let bt3 = document.createElement("button")
        let bt4 = document.createElement("button")
        bt1.innerHTML = this.skills1.options[0]
        bt2.innerHTML = this.skills1.options[1]
        bt3.innerHTML = this.skills1.options[2]
        bt4.innerHTML = this.skills1.options[3]
        document.getElementById("statystyka").append(bt1, bt2, bt3, bt4)
        //onclick??
        bt1.onclick = () => {
            
        }
        bt2.onclick = () => {

        }
        bt3.onclick = () => {
            this.skills1.hp += 10
            //this.start()
            net.sendMove("hp")
            hp.innerHTML = "Hp: " + this.skills1.hp + "/100"
            this.opponentsTurn()
        }
        bt4.onclick = () => {
            alert(this.avatar + " skipped their move")
            net.sendMove("skip")
            this.opponentsTurn()
        }
    }
}