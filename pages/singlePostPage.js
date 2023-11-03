import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import { X } from 'react-bootstrap-icons';
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ChatDots, HeartFill } from 'react-bootstrap-icons';
import {socket} from "../App.js";
import SingleComment from "../components/SingleComment.js";
import MessageModal from "../components/MessageModal.js";
import MessageModal2 from "../components/MessageModal2.js";
const SinglePostPage = () => {

    const userInfo = useSelector(state => (state.info.userInfo))
    const showPost = useSelector(state => (state.info.showPost))
    const [show, setShow] = useState(0)
    const nav = useNavigate()
    const commentRef = useRef()

    function commentFunk () {
        const info = {
            postId: showPost._id,
            comment: commentRef.current.value,
            username: userInfo.username
        }
        socket.emit("newComment", info);

    }
    function likeFunk () {
        console.log("mano")
        const info = {
            postId: showPost._id,
            username: userInfo.username
        }
        socket.emit("newLike", info);
    }

    function writeMessageFunk () {
        setShow(1)
        console.log(showPost)
    }


    return (

        <div className='position-relative d-flex justify-content-center'>
            <div className="px-lg-5 p-3 single-post" >
                {show===1 && <MessageModal2 x={showPost} setShow={setShow}></MessageModal2>}
                <div className="d-flex justify-content-end">
                    <X className="cursor-pointer x-hover x-border " onClick={()=>nav('/posts')} color="red" size={40}></X>
                </div>
                <div className="">
                    <div className="pb-3">
                        <div className="d-flex justify-content-end">
                            <div className="profile-image">
                                <img src={showPost.userImage ? showPost.userImage : ""} alt=""/>
                            </div>
                            <div className="d-flex flex-column justify-content-center  px-3 ">

                                <b>{showPost.username}</b>
                                {userInfo.username !== showPost.username && <Button onClick={writeMessageFunk} >Write Message</Button> }


                            </div>
                        </div>
                    </div>
                    <div className="">
                        <h3>{showPost.title}</h3>
                        <div>
                            <img className="" src={showPost.image} alt=""/>
                        </div>
                        <div className="d-flex justify-content-end gap-2 align-items-center m-1">
                            <Button onClick={likeFunk}>Like</Button> <span>{showPost.likes.length}</span>

                        </div>


                    </div>
                </div>
                <div className="mt-5">
                    <h4 className="">Comments</h4>
                    <div className="">
                        <div className="">
                            {showPost.comments && showPost.comments.map ((x,i)=>
                                <SingleComment key={i} x={x}></SingleComment>
                            )}
                        </div>
                    </div>
                    <div className="h-25 ">
                        <InputGroup className="mb-3">
                            <InputGroup.Text className="d-none d-lg-block" id="inputGroup-sizing-default">
                                Message
                            </InputGroup.Text>
                            <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                ref={commentRef}
                            />
                            <Button onClick={commentFunk}>Send</Button>
                        </InputGroup>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default SinglePostPage;