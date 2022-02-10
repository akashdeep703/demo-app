import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge'
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [erroremail, setErrorEmail] = useState(false);
    const [errorpass, setErrorPass] = useState(false);
    const [errorres, setErrorRes] = useState(false);
    const redirect = useHistory();
    const handleEmail = (e) => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        let item = e.target.value;
        if (pattern.test(email) === false) {
            setErrorEmail(true);
        } else {
            setErrorEmail(false);
        }
        setEmail(item);
        setSubmitted(false);
    };
    const handlePass = (e) => {
        let item = e.target.value;
        if (item.length < 3) {
            setErrorPass(true);
        } else {
            setErrorPass(false);
        }
        setPassword(item);
        setSubmitted(false);
    };
    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (pattern.test(email) === false && password.length < 3) {
            setErrorPass(true);
            setErrorEmail(true);
            setSubmitted(false);
        } else if (pattern.test(email) === false && password.length > 3) {
            setErrorPass(false);
            setErrorEmail(true);
            setSubmitted(false);
        } else if (pattern.test(email) === true && password.length < 3) {
            setErrorPass(true);
            setErrorEmail(false);
            setSubmitted(false);
        } else {
            setErrorEmail(false);
            setErrorPass(false);
            // Headers
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            // Request body 
            const body = JSON.stringify({ email, password });

            axios.post('/api/auth', body, config)
                .then(res => {
                    console.log("🚀 ~ file: Login.js ~ line 67 ~ handleSubmit ~ res", res)
                    if (res.data.msg) {
                        console.log("🚀 ~ file: Login.js ~ line 69 ~ handleSubmit ~ res.data.msg", res.data.msg)
                        setErrorRes(res.data.msg)
                    } else {
                        console.log(res.data);
                        redirect.push("/dashboard");
                        setSubmitted(true);
                    }
                })
                .catch(err => {
                    console.log("🚀 ~ file: Login.js ~ line 76 ~ handleSubmit ~ err", err)
                });
            setSubmitted(true);
        }
    };
    return (
        <div className='App-header'>
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <h1>
                            <Badge bg="secondary">Login</Badge>
                        </h1>
                        {errorres ? <h6 align="left" className='text-danger'>{errorres}</h6> : ""}
                        <Form method='Post'>
                            <Form.Group className="mb-3">
                                <div align="left">
                                    <Form.Label>Email</Form.Label>
                                </div>
                                <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
                                {erroremail ? <div align="left" className='text-danger'>please enter valid email</div> : ""}

                                <Form.Text className="text-danger">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <div align="left">
                                    <Form.Label>Password</Form.Label>
                                </div>
                                <Form.Control type="password" placeholder="Password" onChange={handlePass} />
                                {errorpass ? <div align="left" className='text-danger'>please enter password</div> : ""}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <div align="left">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </div>
                                <div align="right">
                                    <label> New user ?</label>&nbsp;&nbsp;<a className='anchor' href='/register' >Sign Up</a>
                                </div>
                            </Form.Group>
                            <div align="left">
                                <Button variant="primary" type="submit" className='button' onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Col>
                    <Col></Col>

                </Row>
            </Container>
        </div>
    );
}

export default Login;