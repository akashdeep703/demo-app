import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge'
import React, { useState } from "react";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [erroremail, setErrorEmail] = useState(false);
    const [errorpass, setErrorPass] = useState(false);

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
            alert("all good");
            console.log('okay');
            setSubmitted(true);           
            setErrorEmail(false);
            setErrorPass(false);
        }

    };
    return (
        <Container>
            <Row>
                <Col></Col>
                <Col>
                    <h1>
                        <Badge bg="secondary">Login</Badge>
                    </h1>
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

    );
}

export default Login;