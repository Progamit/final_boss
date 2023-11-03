import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSingleChat} from "../features/info.js";

const SingleChat = ({x, setShow}) => {
    const myInfo = useSelector(state => state.info.userInfo)
    const dispatch = useDispatch()

    function openChat () {
        setShow(0)


        dispatch(setSingleChat(x))
        console.log(x.roomId)
    }


    return (
        <div onClick={openChat} className="cursor-pointer">
            <h5>
                {x.usernameOne === myInfo.username ? x.usernameTwo : x.usernameOne}
            </h5>

        </div>
    );
};

export default SingleChat;