import {Container, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [user_type, setUserType] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setCnfPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errorname, setErrorName] = useState(false);
    const [erroremail, setErrorEmail] = useState(false);
    const [errorphone, setErrorPhone] = useState(false);
    const [errorusertype, setErrorUserType] = useState(false);
    const [errorpass, setErrorPass] = useState(false);
    const [errorcnfpass, setErrorCnfPass] = useState(false);
    const [errorres, setErrorRes] = useState(false);
    const redirect = useHistory();
    localStorage.getItem('token') ? redirect.push("/dashboard") : ''
    const handleName = (e) => {
        let item = e.target.value;
        if (item.length < 3 || item.length > 25) {
            setErrorName(true);
        } else {
            setErrorName(false);
        }
        setName(item);
        setSubmitted(false);
    };
    const handleUserType = (e) => {
        let item = e.target.value;
        if (item.length === 0) {
            setErrorUserType(true);
        } else {
            setErrorUserType(false);
        }
        setUserType(item);
        setSubmitted(false);
    };
    const handleEmail = (e) => {
        let item = e.target.value;
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (pattern.test(email) === false) {
            setErrorEmail(true);
        } else {
            setErrorEmail(false);
        }
        setEmail(item);
        setSubmitted(false);
    };     
    const handlePhone = (e) => {
        let item = e.target.value;
        let pattern = new  RegExp(/^[0-9\b]+$/);
        if (pattern.test(phone) === false ||  (phone.length < 3 || phone.length > 11)) {
            setErrorPhone(true);
        } else {
            setErrorPhone(false);
        }
        setPhone(item);
        setSubmitted(false);
    };
    const handlePass = (e) => {
        let item = e.target.value;
        if (item.length < 3 || item.length > 20) {
            setErrorPass(true);
        } else {
            setErrorPass(false);
        }
        setPassword(item);
        setSubmitted(false);
    };
    const handleCnfPass = (e) => {
        let item = e.target.value;
        if (item.length < 3 || item.length > 20) {
            setErrorCnfPass(true);
        } else {
            setErrorCnfPass(false);            
        }
        setCnfPassword(item);
        setSubmitted(false);
    };
    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let pattern1 = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        let pattern2 = new  RegExp(/^[0-9\b]+$/);
        if (name.length < 3 && pattern1.test(email) === false && pattern2.test(phone) === false && user_type.length === 0 && password.length < 3 && confpassword.length < 3) {
            setErrorName(true);
            setErrorEmail(true);
            setErrorPhone(true);
            setErrorUserType(true);
            setErrorPass(true);
            setErrorCnfPass(true);
            setSubmitted(false);
        } else if (name.length < 3 || name.length > 25) {
            setErrorName(true);
            setSubmitted(false);
        } else if (pattern1.test(email) === false) {
            setErrorEmail(true);
            setSubmitted(false);
        }
        else if (pattern2.test(phone) === false || (phone.length < 3 || phone.length > 11)) {
            setErrorPhone(true);
            setSubmitted(false);
        } else if (user_type.length === 0) {
            setErrorUserType(true);
            setSubmitted(false);
        } else if (password.length < 3 || password.length > 20) {
            setErrorPass(true);
            setSubmitted(false);
        } else if (confpassword.length < 3 || confpassword.length > 20) {
            setErrorCnfPass(true);
            setSubmitted(false);
        } else {
            setErrorName(false);
            setErrorEmail(false);
            setErrorPhone(false);
            setErrorUserType(false);
            setErrorPass(false);
            setErrorCnfPass(false);
            // Headers
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            // Request body 
            const body = JSON.stringify({ name, email, phone, user_type, password });

            axios.post('/api/users', body, config)
                .then(res => {
                    console.log("🚀 ~ file: Register.js ~ line 114 ~ handleSubmit ~ res", res)
                    if (res.data.msg) {
                        setErrorRes(res.data.msg)
                        console.log("🚀 ~ file: Register.js ~ line 120 ~ handleSubmit ~ res.data.msg", res.data.msg)
                    } else {
                        setSubmitted(true);
                    }
                })
                .catch(err => {
                    console.log("🚀 ~ file: Register.js ~ line 117 ~ handleSubmit ~ err", err)
                });
        }
    };
    return (
        <div className='App-header'>
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <h1 align="center">
                            <Badge bg="secondary">Sign up</Badge><br />
                        </h1>
                        {submitted ? <h6 align="left" className='text-success'>Registered Successfully</h6> : ""}
                        {errorres ? <h6 align="left" className='text-danger'>{errorres}</h6> : ""}
                        <Form method='Post'>
                            <Form.Group className="mb-3">
                                <div align="left">
                                    <Form.Label>Name</Form.Label>
                                </div>
                                <Form.Control type="text" placeholder="Enter name" onChange={handleName} />
                                <Form.Text align="left" className="text-danger">
                                    {errorname ? <div align="left" className='text-danger'>Please enter valid name</div> : ""}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <div align="left">
                                    <Form.Label>Email</Form.Label>
                                </div>
                                <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
                                {erroremail ? <div align="left" className='text-danger'>Please enter valid email</div> : ""}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <div align="left">
                                    <Form.Label>Phone</Form.Label>
                                </div>
                                <Form.Control type="number"  placeholder="Enter phone number" onChange={handlePhone} />
                                {errorphone ? <div align="left" className='text-danger'>Please enter valid phone</div> : ""}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <div align="left">
                                    <Form.Label>User Type &nbsp;&nbsp;&nbsp;</Form.Label>
                                </div>
                                <Form.Select className="text-muted" name="user_type" onChange={handleUserType}>
                                    <option value="">select one</option>
                                    <option value="1">Normal</option>
                                    <option value="2">Premium</option>
                                </Form.Select>
                                {errorusertype ? <div align="left" className='text-danger'>Please choose user type</div> : ""}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <div align="left">
                                    <Form.Label>Password</Form.Label>
                                </div>
                                <Form.Control type="password" name='pass' placeholder="Password" onChange={handlePass} />
                                {errorpass ? <div align="left" className='text-danger'>Please enter valid password</div> : ""}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <div align="left">
                                    <Form.Label>Confirm Password</Form.Label>
                                </div>
                                <Form.Control type="password" name="confpass" placeholder="Password" onChange={handleCnfPass} />
                                {errorcnfpass ? <div align="left" className='text-danger'>Please enter confirm password</div> : ""}
                            </Form.Group>
                            <div align="right">
                                <label>Have an account ?</label>&nbsp;&nbsp;<a className='anchor' href='/login' >Login</a>
                            </div>
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
export default Register;