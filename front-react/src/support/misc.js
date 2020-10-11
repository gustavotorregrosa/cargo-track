import categories from "../components/loggedScreen/categories/categories"

export const url = path => 'http://localhost:3001/' + path

export class JWTHelper {

    constructor(getUser, updateUser){
        this.getUser = getUser
        this.updateUser = updateUser
    }

    callGetUser = () => this.getUser()

    callUpdateUser = user => {
        this.updateUser({
            ...this.getUser(),
            ...user
        })
    }



    createRequest = (url, method, body) => {
        if(body){
            return new Request(url, {
                method,
                headers: {
                    'jwt': this.callGetUser().jwt,
                    "Content-Type": "application/json"

    
                },
                body: JSON.stringify(body)
            })
        }

        return new Request(url, {
            method,
            headers: {
                'jwt': this.callGetUser().jwt,
                 "Content-Type": "application/json"

            }
        })
       

    }

    unitaryFetchPromise = async () => new Promise((success, reject) => {
        let status
        let result
        fetch(this.request).then(r => {

            status = r.status
            return r.json()
        }).then(r => {

            result = r
            success({
                status,
                result
            })
        })
    })

    fetchOnce = async request => {
        let results = await fetch(request)
        let status = results.status
        results = await results.json()
        return {
            status,
            data: results
        }
    }

    fetchJWT = request => new Promise(async (success, reject) => {
       
        let results = await this.fetchOnce(request)
        let status = results.status
        if(status == 200){
            success(results.data)
        }else if (status == 300){
            let newUser = await this.tryRenewJWT()
            if(newUser){
               this.callUpdateUser(newUser)
                setTimeout(async () => {
                    let newRequest = new Request(request.url, {
                        method: request.method,
                        headers: {
                            jwt: this.callGetUser().jwt
                        }
                    })
                    results = await this.fetchOnce(newRequest)
                    status = results.status
                    if(status == 200){
                         success(results.data)
                     }else {       
                        const e = new CustomEvent('openLogin')
                        document.dispatchEvent(e)
                        reject("Redirect to login")

                     }
                }, 100)
              
            }
        }else {
            const e = new CustomEvent('openLogin')
            document.dispatchEvent(e)
            reject("Redirect to login")
        }

    
    })



    tryRenewJWT = async () => {
        let newUser = await fetch(url("auth/renew"), {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email:  this.callGetUser().email,
                refreshToken:  this.callGetUser().refreshToken
            }),
        })
        
        return newUser.json()

    }


    fetchJWTPromise = (url, method = 'get', body = null) => new Promise((success, reject) => {
            let request = this.createRequest(url, method, body)
            this.fetchJWT(request).then(results => success(results)).catch((e) => {
                console.log(e)
            })

    })

}