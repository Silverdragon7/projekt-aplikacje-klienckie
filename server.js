const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku
app.use(express.static('static'))
app.use(express.json());

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
//tablica userów
let users = []
//avatary
let avatar1 = null
let avatar2 = null

//sprawdza czy nick jest wolny
app.post("/checkNick", function (req, res) {
    if (users[0] != req.body.name) {
        users.push(req.body.name)
        dane = JSON.stringify({
            nick: true
        })
    } else {
        dane = JSON.stringify({
            nick: false
        })
    }
    res.type("application/json");
    res.send(dane)
})

//sprawdza ilość userów
app.post("/checkUsers", function (req, res) {
    if (users.length > 2) {
        dane = JSON.stringify({
            users: false
        })
    } else if (users.length == 2) {
        dane = JSON.stringify({
            users: true,
            avatar: avatar1
        })
    } else {
        dane = JSON.stringify({
            users: true,
            avatar: null
        })
    }
    res.type("application/json");
    res.send(dane)
})

//przypisuje avatary
app.post("/sendAvatar", function (req, res) {
    if (avatar1 == null) {
        avatar1 = req.body.avatar
        res.type("application/json");
        res.send(JSON.stringify({ avatar1: req.body.avatar }))
    } else {
        if (avatar1 != req.body.avatar) {
            avatar2 = req.body.avatar
            res.type("application/json");
            res.send(JSON.stringify({
                avatar1: avatar1,
                avatar2: req.body.avatar
            }))
        }else{
            res.type("application/json");
            res.send(JSON.stringify({
                zajete: true
            }))
        }
    }
})
//sprawdza czy jest już drugi user
app.post("/checkSecondUser", function (req, res) {
    if (avatar2 != null) {
        res.type("application/json");
        res.send(JSON.stringify({ 
            second: true,
            avatar2: avatar2 }))
    } else {
            res.type("application/json");
            res.send(JSON.stringify({
                second: false
            }))
        }
})
let lastMove = 0
let move = ""
let strata = 0
let atak = 0
app.post("/checkTurn", function (req, res) {
        //data = JSON.parse(req.body)
        res.type("application/json");
        res.send(JSON.stringify({ 
            lastMove: lastMove,
            move: move,
            strata: strata,
            atak: atak
        }))
})
app.post("/sendMove", function (req, res) {
        lastMove = req.body.user
        move = req.body.move
        strata = req.body.strata
        atak = req.body.atak
        res.type("application/json");
        res.send(JSON.stringify({}))
})