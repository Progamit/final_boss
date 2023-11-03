import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import {useNavigate} from 'react-router-dom';
import {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setUser} from '../features/info';
import {socket} from '../App';

function Login({loginPage}) {


    const nav = useNavigate()
    const usernameRef = useRef()
    const passRef = useRef()
    const [error, setError] = useState()
    const dispatch = useDispatch()
    const [autoLogin, setAutoLogin] = useState(false);

    function handleCheckboxChange(e) {
        const isChecked = e.target.checked;
        setAutoLogin(isChecked);
        localStorage.setItem('autoLogin', isChecked);
    }

    function login () {
        const user = {
            username : usernameRef.current.value,
            password : passRef.current.value,
        }
        let hasUpperCaseLetter = false;
        if (user.username.length > 20) return setError("Login error");
        if (user.username.length < 4) return setError("Login error");
        if (user.password.length > 20) return setError("Login error");
        if (user.password.length < 4) return setError("Login error");
        hasUpperCaseLetter = /[A-Z]/.test(user.password);
        if (!hasUpperCaseLetter) return setError("Login error");
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        };
        fetch('http://localhost:8000/login', options)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) return setError(data.message)
                localStorage.setItem("token", (data.data[0]));
                dispatch(setUser(data.data[1]))
                socket.emit("usersUpdate", data.data[1]);
                nav("/profile")
            });
    }
    return (
        <div className="text-size-15em d-flex justify-content-center align-items-center vh-100 ">
            <Form className="p-5 bg-info border border-3 border-black border-radius-20">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control autoComplete="off" type="name" placeholder="Username" ref={usernameRef}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control autoComplete="off" type="password" placeholder="Password" ref={passRef} />
                </Form.Group>
                <Form.Group className="m-3 d-flex" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox"
                                checked={autoLogin}
                                onChange={handleCheckboxChange} />
                    <span className="m-2">Auto Login</span>
                </Form.Group>
                <Nav.Link eventKey="2" className="mb-4" title="Item">
                    <span>Don't have an account? </span>
                    <span onClick={()=>loginPage(1)} className="text-primary fw-bold fs-3">  Sign up</span>
                </Nav.Link>
                {error &&  error}
                <Button className="px-5" variant="primary"  onClick={login}>
                    Submit
                </Button>
            </Form>
        </div>

    );
}

export default Login;