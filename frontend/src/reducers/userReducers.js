import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_RESET, USER_UPDATE_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_REMOVE_REQUEST, USER_REMOVE_SUCCESS, USER_REMOVE_FAIL, USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL, USER_FETCH_REQUEST, USER_FETCH_SUCCESS, USER_FETCH_FAIL } from '../actions/types';

// User login in Public
export const userLoginReducer = (state={ }, action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST :
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return { }
         
            default:
              return state;
    }
}

// User register Public
export const userRegisterReducer = (state={ }, action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST :
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
            default:
              return state;
    }
}

// For current logged in user to view their profile..Private
export const userDetailsReducer = (state={ user: {} }, action)=>{
    switch(action.type){
        case USER_DETAILS_REQUEST :
            return {...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { user:{} }
            default:
              return state;
    }
}

// For current logged in user to UPDATE their profile..Private
export const updateDetailsReducer = (state= {}, action)=>{
    switch(action.type){
        case USER_UPDATE_REQUEST :
            return {...state, loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_RESET:
            return {}    

            default:
              return state;
    }
}

//For admin UserListScreen. to view all users, Private & Admin
export const getUsersReducer = (state={ users: [] }, action)=>{
    switch(action.type){
        case USER_LIST_REQUEST :
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
    
            default:
              return state;
    }
}


//For admin UserListScreen. to delete user account, Private & Admin
export const removeUserReducer = (state={ user: {} }, action)=>{
    switch(action.type){
        case USER_REMOVE_REQUEST :
            return {...state, loading: true }
        case USER_REMOVE_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_REMOVE_FAIL:
            return { loading: false, error: action.payload }
    
            default:
              return state;
    }
}


// admin UserEditScreen fetches the specified user to edit Private/Admin
export const userFetchReducer = (state={ user: {} }, action)=>{
    switch(action.type){
        case USER_FETCH_REQUEST :
            return {...state, loading: true }
        case USER_FETCH_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_FETCH_FAIL:
            return { loading: false, error: action.payload }
        
            default:
              return state;
    }
}


// admin UserEditScreen to make PUT req & edit user profile Private/Admin
export const editUserReducer = (state= { success: false }, action)=>{
    switch(action.type){
        case USER_EDIT_REQUEST :
            return {...state, loading: true }
        case USER_EDIT_SUCCESS:
            return { loading: false, success: true }
        case USER_EDIT_FAIL:
            return { loading: false, error: action.payload }
            
            default:
              return state;
    }
}