class Ui {
    constructor() {
        this.setName()
        this.lista = ["opcja1", "opcja2", "opcja3", "opcja4", "opcja5"]
        this.skills = [
            {avatar: "opcja1", lvl:"1", hp:"100", options: []},
            {avatar: "opcja2", lvl:"1", hp:"100", options: []},
            {avatar: "opcja3", lvl:"1", hp:"100", options: []},
            {avatar: "opcja4", lvl:"1", hp:"100", options: []},
            {avatar: "opcja5", lvl:"1", hp:"100", options: []}
        ]
    }
    //uzytkownik podaje nick, serwer sprawdza czy juz istnieje 
    setName = async() => {
        this.name = prompt("Podaj nick:")
        let dane = await net.checkNick(this.name)
        //jesli wolny, przechodzi do wyboru postaci
        if(dane.nick == true){
            let data = await net.checkUsers()
            if (data.users == true){
                this.choose(data.avatar)
            //jeśli jest za dużo użytkowników to krzyczy
            }else{
                alert("Już jest dwóch użytkowników")
            }     
        //jesli nie, od nowa
        }else{
            alert("Nick jest zajęty")
            this.setName()
        }
        
    } 
    //wybor postaci
    choose = async (avatar) => {
        //tu będą nazwy
        let lista = []
        //jeśli drugi użytkownik nic nie wybrał to cała lista, jesli wybral to bez tego wybranego
        if (avatar == null){
            lista = this.lista
        }else{
            for (let el of this.lista){
                if (el != avatar){
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
            for (let a of this.skills){
                if (a.avatar == this.avatar){
                    this.skills1 = a
                }
            }
            let dane = await net.sendAvatar(this.avatar)
            if (dane.zajete){
                alert("Ten avatar jest już zajęty")
            }else if(dane.avatar2){
                this.avatarPrzeciwnika = dane.avatar2
                div.style.display = "none"
                game.start()
                //start gry
                this.start()
            }else{
                div.style.display = "none"
                game.start()
                this.wait(0)            
            }
            
        }
        div.append(button)
    }
    //tu bedzie funkcja z timeoutem czekająca na tego drugiego
    wait = async(x) =>{
        let data = await net.checkSecondUser()
        if (x == 0){
            document.getElementById("status").innerHTML = "Waiting for other player"
        }
        if (x == 1){
            document.getElementById("status").innerHTML = "Waiting for other player."
        }
        if (x == 2){
            document.getElementById("status").innerHTML = "Waiting for other player.."
        }
        if (x == 3){
            document.getElementById("status").innerHTML = "Waiting for other player..."
            x = -1
        }
        if (data.second == false){
            setTimeout(this.wait, 300, x+1)
        }else{
            document.getElementById("status").innerHTML = ""
            this.start()
        }       
    }
    start = () => {
        let statystyka  = document.createElement("div")
        statystyka.id = "statystyka"
        statystyka.classList.add("statystyka")
        let name = document.createElement("h4")
        name.innerHTML = this.skills1.avatar
        statystyka.append(name)
        document.body.append(statystyka)
        let statystykaPrzeciwnika  = document.createElement("div")
        statystykaPrzeciwnika.id = "statystykaPrzeciwnika"
        statystykaPrzeciwnika.classList.add("statystyka")
        document.body.append(statystykaPrzeciwnika)
    }
}