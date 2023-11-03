import React, {useState} from 'react';
import { ChatDots, HeartFill } from 'react-bootstrap-icons';
import {useDispatch, useSelector} from "react-redux";
import {setShowPost} from "../features/info.js";
import {useNavigate} from "react-router-dom";

const Posts = ({x}) => {
    const [show, setShow] = useState(0)
    const dispatch = useDispatch ()
    const postShowInfo = useSelector (state => (state.info.showPost))
    const nav = useNavigate()

    function showFunk () {
        console.log(x)
        dispatch(setShowPost(x))
        nav("/singlePost")
    }



    return (
        <div onClick={showFunk} className="border border-black border-radius-20 p-2 bg-info w-300px d-flex flex-column justify-content-between m-3 p-1 ">
            <div>
                <h3>{x.username}</h3>
                <b>{x.title}</b>
            </div>

            <img className="w-100 px-5" src={x.image} alt=""/>
            <div className="p-1 px-5 d-flex justify-content-end fs-5 gap-1 align-items-center"><HeartFill/>{x.likes.length}
                <ChatDots></ChatDots> {x.comments.length}</div>
        </div>
    );
};

export default Posts;