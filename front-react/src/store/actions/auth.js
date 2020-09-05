import * as actionType from './actionTypes'

export const login = user => {
    return {
        type: actionType.LOGIN,
        data: user
    }
}

export const logout = () => {
    return {
        type: actionType.LOGOUT,
       
    }
}