import React, { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, useNavigate} from "react-router-dom";
import IndexPage from "./pages/indexPage.js";
import Page from "./pages/page.js";
import ProfilePages from "./pages/profilePages.js";
import MessagesPage from "./pages/messagesPage.js";
import PostsPage from "./pages/postPage.js";
import UsersPage from "./pages/usersPage.js";
import SinglePostPage from "./pages/singlePostPage.js";
import { io } from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {setAllPosts, setAllUsers, setShowPost, setSingleChat, setUserInFo} from "./features/info.js";

export const socket = io("http://localhost:3001", {
    autoConnect: true
});




function App() {
    const [count, setCount] = useState(0)
    const dispatch = useDispatch()
    const nav = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("autoLogin")==="true") {
            const token = localStorage.getItem("token")
            socket.emit ("autoLogin", token)
            nav ("/profile")
        }



    }, []);

    useEffect(()=> {
        fetch('http://localhost:8000/allPosts')
            .then((res)=>res.json())
            .then(data=>{
                dispatch(setAllPosts(data.data))
            })
    },[])

    useEffect(()=> {
        fetch('http://localhost:8000/allUsers')
            .then((res)=>res.json())
            .then(data=>{
                dispatch(setAllUsers(data.data))
            })
    },[])

    useEffect(()=> {
        socket.on('connect', () => {
        });
    },[])

    useEffect(()=> {
        socket.on('addAllPost', (allPost)=> {
            dispatch(setAllPosts(allPost))
            console.log(allPost)
        })
    },[])

    useEffect(()=> {
        socket.on('addOnePost', (post)=> {
            dispatch(setShowPost(post))
        })
    },[])

    useEffect(() => {
        socket.on("addAllUser", (info)=> {
            dispatch(setAllUsers(info))
        })
    }, []);

    useEffect(() => {
        socket.on('newMessageInRoom', (message) => {
        });
    }, []);

    useEffect(() => {
        socket.on('newMsg', (info)=> {
            dispatch(setSingleChat(info))
        })
    }, []);
    useEffect(()=> {
        socket.on ('autoLoginInfo', data => {
            console.log(data)
            dispatch(setUserInFo(data))
        })
    },[])



    return (
        <div className="container vw-100 bg-primary-subtle m-auto p-0 app-container">
            <Routes>
                <Route path="/" element={<IndexPage/>} ></Route>
                <Route path="/page" element={<Page></Page>}></Route>
                <Route path="/profile" element={<ProfilePages></ProfilePages>}></Route>
                <Route path="/messages" element={<MessagesPage></MessagesPage>}></Route>
                <Route path="/posts" element={<PostsPage></PostsPage>}></Route>
                <Route path="/users" element={<UsersPage></UsersPage>}></Route>
                <Route path="/singlePost" element={<SinglePostPage></SinglePostPage>}></Route>
            </Routes>
        </div>
    )
}

export default App