import {createSlice} from "@reduxjs/toolkit";

export const infoSlice = createSlice( {
    name:"info",
    initialState: {
        toolbar : 1,
        user: "",
        userInfo: [],
        showPost: false,
        allPosts: [],
        allUsers: [],
        allMyMessages: [],
        singleChat: []
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setToolbar: (state,action) => {
            state.toolbar = action.payload
        },
        setShowPost: (state,action) => {
            state.showPost = action.payload
        },
        setUserInFo: (state, action) => {
            state.userInfo = action.payload
        },
        setAllPosts: (state, action) => {
            state.allPosts = action.payload
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload
        },
        setAllMyMessages: (state, action) => {
            state.allMyMessages = action.payload
        },
        setSingleChat: (state,action) => {
            state.singleChat = action.payload
        }

    }
})
export const {setUser,
    setToolbar,
    setShowPost,
    setUserInFo,
    setAllPosts,
    setAllUsers,
    setAllMyMessages,
    setSingleChat

} = infoSlice.actions

export default infoSlice.reducer