import React, {useRef, useState} from "react";
import {InputGroup} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useSelector} from 'react-redux';
import {socket} from '../App.js';
const ModalCreatePost = ({setModalOff}) => {

    const user = useSelector(state => state.info.userInfo)
    const postImageRef = useRef()
    const postTitleRef = useRef()
    const [error, setError] = useState()

    function createPostFunk () {
        const start = Date.now();
        const info = {
            username: user.username,
            userId: user._id,
            userImage: user.image,
            date: start,
            title: postTitleRef.current.value,
            image: postImageRef.current.value,

        }
        console.log(info)

        if (!info.image.startsWith('http://') && !info.image.startsWith('https://')) {
            return setError("Bad url")
        }
        socket.emit("newPost", info);
        setModalOff(0)
    }


    return (
        <div  className="p-5 bg-body-tertiary position-absolute modalCreatePost text-center border-radius-20 z-3">
            <InputGroup className="w-100 ">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Tittle
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    ref={postTitleRef}
                />
            </InputGroup>
            <InputGroup className="w-100 mt-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Image url
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    ref={postImageRef}
                />
            </InputGroup>
            <Button onClick={createPostFunk} className="mt-4 px-5 py-1">SUBMIT</Button>
        </div>
    );
};

export default ModalCreatePost;