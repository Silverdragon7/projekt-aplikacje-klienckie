//tu bedzie sie laczyc z serwerem
class Net {
    constructor() {

    }
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
}