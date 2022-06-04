//tu bedzie sie laczyc z serwerem
class Net {
    constructor() {

    }
    //sprawdza czy nick jest wolny
    checkNick = async (name) => {
        const data = JSON.stringify({
            name: name
        })
        const options = {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        let response = await fetch("/checkNick", options)

        if (!response.ok)
            return response.status
        else
            return await response.json() // response.json
    }
    //sprawdza ilość userów
    checkUsers = async () => {
        const data = JSON.stringify({
        })
        const options = {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        let response = await fetch("/checkUsers", options)

        if (!response.ok)
            return response.status
        else
            return await response.json() // response.json
    }
    //wysyła avatara i sprawdza czy jest wolny
    sendAvatar = async (avatar) => {
        const data = JSON.stringify({
            avatar: avatar
        })
        const options = {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        let response = await fetch("/sendAvatar", options)

        if (!response.ok)
            return response.status
        else
            return await response.json() // response.json
    }
    checkSecondUser = async () => {
        const data = JSON.stringify({})
        const options = {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        let response = await fetch("/checkSecondUser", options)

        if (!response.ok)
            return response.status
        else
            return await response.json() // response.json
    }
    checkTurn = async () => {
        const data = JSON.stringify({})
        const options = {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        let response = await fetch("/checkTurn", options)

        if (!response.ok)
            return response.status
        else
            return await response.json() // response.json
    }
    sendMove = async (move) => {
        const data = JSON.stringify({
            move: move,
            user: ui.you
        })
        const options = {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        let response = await fetch("/sendMove", options)

        if (!response.ok)
            return response.status
        else
            return await response.json() // response.json
    }
}