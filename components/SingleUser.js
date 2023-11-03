import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import MessageModal from "./MessageModal.js";
import {useSelector} from "react-redux";
const SingleUser = ({x}) => {
    const [show, setShow] = useState(0)
    const myInfo = useSelector (state => state.info.userInfo)


    return (
        <div>
            { myInfo.username !== x.username &&
                <div className="d-flex align-items-center bg-body-secondary justify-content-around p-3 border border-black m-3 border-radius-20 user-field position-relative">
                    <div className="profile-image "> <img src={x.image} alt=""/></div>
                    <div>
                        <div><b>{x.username}</b></div>
                        <Button onClick={()=> setShow(1)}>Write Message</Button>
                    </div>

                    {show===1 && <MessageModal x={x} setShow={setShow}></MessageModal>}


                </div>
            }
        </div>



    );
};

export default SingleUser;