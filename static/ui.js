class Ui {
    constructor() {
        this.setName()
    }
    //uzytkownik podaje nick, serwer sprawdza czy juz istnieje 
    setName = async() => {
        this.name = prompt("Podaj nick:")
        let dane = await net.checkNick(this.name)
        //jesli wolny, przechodzi do wyboru postaci
        if(dane.nick == true){
            this.choose()
        //jesli nie, od nowa
        }else{
            alert("Nick jest zajęty")
            this.setName()
        }
        
    } 
    //wybor postaci
    choose = async () => {
        //tu będą nazwy
        let lista = ["opcja1", "opcja2", "opcja3", "opcja4", "opcja5"]
        //tworzymy selecta
        let div = document.getElementById("choose")
        let select = document.createElement("select")
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
        button.onclick = () => {
            console.log("klik")
        }
        div.append(button)
    }
}