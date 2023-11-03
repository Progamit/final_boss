import React from 'react';
import {useSelector} from "react-redux";
const SingleMessage = ({x}) => {
    const userInfo = useSelector(state=> state.info.userInfo)

    return (
        <div className="w-100 m">
            {userInfo.username === x.msgFrom ?

                <div className=" p-2 px-3 bg-body-secondary border-radius-20 border border-black ms-5 m-2 p-2">
                    <div className=" "><b>{x.msgFrom}</b></div>
                    <div ><span> {x.message}</span></div>
                </div>

                :
                <div className="bg-info-subtle border border-radius-20 border-black m-2 p-2 px-3 me-5" >
                    <div><b>{x.msgFrom}</b></div>
                    <div><span> {x.message}</span></div>
                </div>


            }


        </div>
    );
};

export default SingleMessage;