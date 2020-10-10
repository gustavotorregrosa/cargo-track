import categories from "../components/loggedScreen/categories/categories"

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



    createRequest = (url, method, body) => {
        return new Request(url, {
            method,
            headers: {
                'jwt': this.callGetUser().jwt

            }
        })

    }

    unitaryFetchPromise = async () => new Promise((success, reject) => {
        let status
        let result
        fetch(this.request).then(r => {
            alert("foi a request...")
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
        }else if (status == 403){
            alert("renew JWT")
        }

    
    })

    fetchJWTPromise = (url, method = 'get', body = {}) => new Promise((success, reject) => {
        setTimeout(() => {
            let request = this.createRequest(url, method, body)
            this.fetchJWT(request).then(categories => success(categories))

        }, 3000)
    })

    // fetchJWTPromise = (url, method = 'get', body = {}) => new Promise(async (success, reject) => {

    //     await this.fetchJWT(url, method, body)
    //     success(this.result)
    // })
    

}