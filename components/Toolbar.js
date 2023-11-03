import React from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setToolbar} from "../features/info.js";
import { Person, ChatSquareText, Postcard, People} from 'react-bootstrap-icons';
const Toolbar = () => {

    const toolbarInfo = useSelector (state => state.info.toolbar)
    const dispatch = useDispatch()

    const nav = useNavigate()

    function profileNav () {
        dispatch(setToolbar(1))
        nav('/profile')
    }
    function  messagesNav () {
        dispatch(setToolbar(2))
        nav('/messages')

    }
    function  postsNav () {
        dispatch(setToolbar(3))
        nav ('/posts')
    }
    function  usersNav () {
        dispatch(setToolbar(4))
        nav('/users')
    }
    function  logOutNav () {
        localStorage.setItem("autoLogin", "false")
        dispatch(setToolbar(1))
        nav('/')
    }

    return (
        <div className="p-3 d-flex bg-info border-bottom border-3 border-black">
            <div className="d-flex justify-content-around align-items-start flex-grow-1 d-none d-md-flex">
                <Button variant={toolbarInfo===1 ? "success" : "primary"} onClick={profileNav} className="px-lg-5">Profile</Button>
                <Button variant={toolbarInfo===2 ? "success" : "primary"} onClick={messagesNav} className="px-lg-5">Messages</Button>
                <Button variant={toolbarInfo===3 ? "success" : "primary"} onClick={postsNav} className="px-lg-5">Posts</Button>
                <Button variant={toolbarInfo===4 ? "success" : "primary"} onClick={usersNav} className="px-lg-5">Users</Button>
            </div>
            <div className="d-flex justify-content-around align-items-start flex-grow-1 d-md-none">
                <Button variant={toolbarInfo===1 ? "success" : "primary"} onClick={profileNav} className="px-lg-5"><Person></Person></Button>
                <Button variant={toolbarInfo===2 ? "success" : "primary"} onClick={messagesNav} className="px-lg-5"><ChatSquareText></ChatSquareText></Button>
                <Button variant={toolbarInfo===3 ? "success" : "primary"} onClick={postsNav} className="px-lg-5"><Postcard></Postcard></Button>
                <Button variant={toolbarInfo===4 ? "success" : "primary"} onClick={usersNav} className="px-lg-5"><People></People></Button>
            </div>

            <div className="flex-grow-1 d-flex align-items-start justify-content-end">
                <Button onClick={logOutNav} variant="danger" className="px-lg-5 ">LogOut</Button>
            </div>
        </div>
    );
};

export default Toolbar;