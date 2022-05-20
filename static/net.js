//tu bedzie sie laczyc z serwerem
class Net {
    constructor() {

    }
    //sprawdza czy nick jest wolny
    checkNick = async (name) => {
        const data = JSON.stringify({
            name: name
        })
        console.log(data)
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
        console.log(data)
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
        console.log(data)
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
}