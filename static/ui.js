//tu interfejs uzytkownika (czymkolwiek będzie)
class Ui {
    constructor() {
        this.choose()
    }
    //wybor postaci
    choose = async () => {
        let dane = await net.checkSecondUser()
        console.log(dane)
        let lista = ["opcja1", "opcja2", "opcja3", "opcja4", "opcja5"]
        let div = document.getElementById("choose")
        let select = document.createElement("select")
        div.innerHTML = "Choose your fighter: <br>"
        for (let a of lista) {
            console.log(a)
            let opt = document.createElement("option")
            opt.value = a
            opt.innerHTML = a
            select.append(opt)
        }
        div.append(select)

    }
}