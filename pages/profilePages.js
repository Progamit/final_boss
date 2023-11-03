import React, {useEffect, useRef, useState} from 'react';
import Toolbar from "../components/Toolbar.js";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {setUser, setUserInFo,setAllUsers} from "../features/info.js";
import login from "../components/Login.js"
const ProfilePages = () => {
    const [change, setChange] = useState(0)
    const dispatch = useDispatch()
    const userInfo = useSelector(state=> state.info.userInfo)
    const changeImageUrlRef = useRef()
    const oldPasswordRef = useRef()
    const newPasswordRef = useRef()
    const newPassword2Ref = useRef()
    const [error, setError] = useState()
    const [imageProfile, setImageProfile] = useState()

    useEffect(()=> {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: localStorage.getItem('token')
            },
        };
        fetch('http://localhost:8000/profile', options)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) return console.log(data.message)
                dispatch(setUserInFo(data.data))
            });
    },[])


    function changePasswordField () {
        if (change===0) {
            setError("")
            setChange(1)
        }
        if (change===1) {
            setError("")
            setChange(0)
        }

    }

    function changeImageFunk () {
        const data = {
            img: changeImageUrlRef.current.value
        }
        if (!data) return         console.log(data)


        const options = {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                Authorization: localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        }
        fetch("http://localhost:8000/changeImage", options)
            .then((res)=> res.json())
            .then ((data)=> {
                if (data.error) return setError(data.message)
                changeImageUrlRef.current.value=""
                console.log(data.data)
                dispatch(setUserInFo(data.data[0]))
                dispatch(setAllUsers(data.data[1]))



            })
    }

    function changePasswordFunk () {
        const data = {
            oldPassword: oldPasswordRef.current.value,
            password: newPasswordRef.current.value,
            password2: newPassword2Ref.current.value,
        }
        if (data.oldPassword.length>20) return






        const options = {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                Authorization: localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        }
        fetch("http://localhost:8000/changePassword", options)
            .then((res)=> res.json())
            .then ((data)=> {
                if (data.error) return setError(data.message)
                oldPasswordRef.current.value=""
                newPasswordRef.current.value=""
                newPassword2Ref.current.value=""
                setChange(0)
            })

    }

    return (
        <div className="p-0 m-0">
            <Toolbar></Toolbar>
            <div className="d-md-flex p-md-3 p-lg-5 d-flex flex-column flex-md-row">
                <div className="flex-grow-1 w-100 order-2 order-md-1">
                    <div className="w-100 image-in-profile d-flex justify-content-center">
                        <img className="" src={userInfo.image ? userInfo.image :  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}  alt=""/>
                    </div>
                    <div className="w-100 p-3 pb-0">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                Change image
                            </InputGroup.Text>
                            <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                ref={changeImageUrlRef}
                            />
                            <Button onClick={changeImageFunk}>Submit</Button>
                        </InputGroup>
                    </div>
                </div>
                <div className="flex-grow-1 w-100 order-1 order-md-2">
                    <div className="w-100 p-1">
                        <h2 className="m-3">{userInfo.username && userInfo.username} </h2>
                        <div>
                            <Button
                                onClick={changePasswordField}
                                className="m-3 mt-1 p-3 py-1"
                                variant={change===1 ? "success" : "primary"}

                            >Change password</Button>
                        </div>
                        {change===0 ? "" :    <div>
                            <InputGroup className="w-75 m-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Old Password
                                </InputGroup.Text>
                                <Form.Control
                                    ref={oldPasswordRef}
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />

                            </InputGroup>
                            <InputGroup className="w-75 m-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    New Password
                                </InputGroup.Text>
                                <Form.Control
                                    ref={newPasswordRef}
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                            <InputGroup className="w-75 m-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    New Password
                                </InputGroup.Text>
                                <Form.Control
                                    ref={newPassword2Ref}
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                            <p className="m-3 w-75 text-bg-danger">   {error && error}</p>

                            <Button onClick={changePasswordFunk} className="m-3 px-5 py-1">SUBMIT</Button>
                        </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProfilePages;