import * as actionType from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    user: {}
}

const login = (state, action) => {
    return updateObject(state, {
        user: { ...action.data }
    })
}


const logout = state => {
    return updateObject(state, {
        user: {}
    })
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOGIN:
            return login(state, action)

        case actionType.LOGOUT:
            return logout(state)
        
        default:
            return state
    }
}

export default reducer