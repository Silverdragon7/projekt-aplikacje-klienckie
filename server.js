const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku
app.use(express.static('static'))
app.use(express.json());

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

let users = []

app.post("/checkNick", function (req, res) {
    console.log(req.body)
    if (users[0] != req.body.name) {
        users.push(req.body.name)
        dane = JSON.stringify({
            nick: true
        })
    }else{
        dane = JSON.stringify({
            nick: false
        })
    }
    res.type("application/json");
    res.send(dane)
})