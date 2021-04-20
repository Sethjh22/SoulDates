const initialState = {
    username: ''
}
const UPDATE_USER = 'UPDATE_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function updateUser(userObj){
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}
export function logout(){
    return{
        type: LOGOUT_USER
    }
}

export default function authReducer(state = initialState, action) {
    switch(action.type){
        case UPDATE_USER:
            return {
                ...state,
                username: action.payload.username,
                
            }
        case LOGOUT_USER:
            return initialState
        default: 
            return state
        
    }
}