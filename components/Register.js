import React, {useRef, useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const Register = ({loginPage}) => {
    const usernameRef = useRef()
    const passRef = useRef()
    const pass2Ref = useRef()
    const [error, setError] = useState()

    function registerFunk () {

        const user = {
            username: usernameRef.current.value,
            password: passRef.current.value,
            password2: pass2Ref.current.value
        };
        let hasUpperCaseLetter = false;
        if (user.username.length > 20) return setError("Username too long.");
        if (user.username.length < 4) return setError("Username too short.");
        if (user.password.length > 20) return setError("Password too long.");
        if (user.password.length < 4) return setError("Password too short.");
        if (user.password !== user.password2) return setError("Passwords don't match.");
        hasUpperCaseLetter = /[A-Z]/.test(user.password);
        if (!hasUpperCaseLetter) return setError("Password needs an uppercase letter.");

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        };
        fetch('http://localhost:8000/register', options)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.error)
                if (data.error) return setError(data.message)
                loginPage(0)
            });
    }

    return (
        <div className="text-size-15em d-flex justify-content-center align-items-center vh-100">
            <Form className="p-5 bg-info border border-3 border-black border-radius-20">
                <Form.Group  className="mb-3" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control  autoComplete="off" type="name" placeholder="Username" ref={usernameRef} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control  autoComplete="off" type="password" placeholder="Password" ref={passRef} />
                </Form.Group>
                <Form.Group className="mb-5"  >
                    <Form.Label>Password 2</Form.Label>
                    <Form.Control type="password" ref={pass2Ref} autoComplete="off" placeholder="Password 2" />
                </Form.Group>
                {error &&  error}
                <Button className="px-5" variant="primary"  onClick={registerFunk} >
                    Submit
                </Button>
            </Form>
        </div>
    );
};



export default Register;