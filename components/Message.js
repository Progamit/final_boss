import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import SingleMessage from "./SingleMessage.js";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {socket} from "../App.js";
import login from "./Login.js";

const Messages = () => {
    const singleChat = useSelector(state=>state.info.singleChat)
    const userInfo = useSelector( state => state.info.userInfo)
    const messageRef = useRef()

    useEffect(()=> {
        socket.emit('joinChat', singleChat.roomId);
        console.log("sss")
    },[singleChat])



    function messageFunk () {

        if (!userInfo.username) return console.log ("taip")
        const info = {
            roomId: singleChat.roomId,
            msgFrom: userInfo.username,
            message: messageRef.current.value
        }
        socket.emit('sendMessage', info);

        messageRef.current.value = ""


    }

    function handleFormSubmit(e) {
        e.preventDefault();
        messageFunk();
    }

    return (
        <div className="px-2 d-flex flex-column justify-content-between chat-window">
            <div>{singleChat.messages && singleChat.messages.map((x,i)=>
                <SingleMessage key={i} x={x}></SingleMessage>
            )}</div>

            {singleChat.roomId &&
                <div>
                    <Form onSubmit={handleFormSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text className="d-none d-lg-block" id="inputGroup-sizing-default">
                                Message
                            </InputGroup.Text>
                            <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                ref={messageRef}
                            />
                            <Button type="submit">Send</Button>
                        </InputGroup>
                    </Form>
                </div>
            }


        </div>
    );
};

export default Messages;