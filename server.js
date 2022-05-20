const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku
app.use(express.static('static'))
app.use(express.json());

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.post("/checkSecondUser",function (req, res) {
    dane = JSON.stringify({
        secondUser: false
    })
    res.type("application/json");
    res.send(dane)
})