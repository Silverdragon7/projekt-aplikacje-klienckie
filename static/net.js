//tu bedzie sie laczyc z serwerem
class Net {
    constructor() {

    }
    checkSecondUser = async () => {
        const data = JSON.stringify({
            a: 1,
            b: 2
        })

        const options = {
            method: "POST",
            body: data,
        };

        let response = await fetch("/checkSecondUser", options)

        if (!response.ok)
            return response.status
        else
            return await response.json() // response.json
    }
}