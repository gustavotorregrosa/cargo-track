export const url = path => 'http://localhost:3001/' + path

export class JWTHelper {

    constructor(getUser, updateUser){
        this.getUser = getUser
        this.updateUser = updateUser
    }

    callGetUser = () => this.getUser()

    callUpdateUser = user => this.updateUser({
        ...this.getUser(),
        ...user
    })

    generateHeaders = () => {
        alert("gerou headers")
        alert(this.callGetUser().jwt )
        this.headers = new Headers({
            'Accept': '*/*'
            
        })
        this.headers.append('jwt', this.callGetUser().jwt)
    }

    createRequest = (url, method, body) => {
        this.request = new Request('http://localhost:3001/categories123', {
            method,
            headers: this.headers,
            // body: JSON.stringify({
            //     ...body
            // })
        })

        alert("criou request")
        console.log(this.request)
    }

    unitaryFetchPromise = new Promise((success, reject) => {
        let status
        let result
        console.log("prepara fetch 2")
        fetch(this.request).then(r => {
            console.log("lanca fetch")
            status = r.status
            alert(status)
            console.log(this.request)
            console.log(r)
            return r.json()
        }).then(r => {
            console.log("tentando exibir JSON")
            console.log(r)
            result = r
            success({
                status,
                result
            })
        })
    })

    fetchOnce = async () => {
        console.log("prepara fetch")
        let data = await this.unitaryFetchPromise
        this.status = data.status
        this.result = data.result
    }

    fetchJWT = async (url, method, body) => {
        alert("ponto 2")
        this.generateHeaders()
        this.createRequest(url, method, body)
        await this.fetchOnce()
    }

    fetchJWTPromise = (url, method = 'get', body = {}) => new Promise(async (success, reject) => {
        alert("ponto 1")
        await this.fetchJWT(url, method, body)
        alert(this.result)
        success(this.result)
    })

}