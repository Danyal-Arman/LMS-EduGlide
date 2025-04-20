import {createSlice} from '@reduxjs/toolkit'

const initialState= {
    user:null,
    isAuthenticated:false,
}
const authSlice = createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        userLoggedIn : (state, action)=>{   

        //userLoggedIn is an dispatched action which then calls reducer function (from (state, action)=>{} are reducer function )   
            state.user = action.payload.user;    
            state.isAuthenticated = true;
        },
        userLoggedOut : (state, action)=>{
            state.user=null;
            state.isAuthenticated=false;
        }         
    },  
})
export const {userLoggedIn, userLoggedOut} = authSlice.actions; 

export default authSlice.reducer;



// action.payload.user = {name:"Danyal"}  // isme user ke andar jo h wo sb aa jaayega
// userLoggedin({name:"Danyal"})  
//userLoggedInn ke andar jo pass krunga wo action.payload me aa jaaye ga