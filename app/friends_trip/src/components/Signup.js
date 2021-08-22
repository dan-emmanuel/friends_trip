import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { signUpAction, signUpError } from "../redux/actions/authActions"

let Signup = (props) => {
    // reference is set up to store a value that i want to 
    // use all along the life cycle component without storing it in the propps/states
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    let { signUpAction, signUpError, signupErrorMessage } = props
    let signupevent = (e) => {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return signUpError("Password do not match")
        }
        signUpAction({ mail: emailRef.current.value, password: passwordRef.current.value })
    }
    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }} >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            {signupErrorMessage && <Alert variant="danger">{signupErrorMessage}</Alert>}
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <Form onSubmit={signupevent}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required />
                                </Form.Group>
                                <Button className="w-100" type="submit" >Sign Up</Button>
                            </Form>

                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? Log In
                    </div>
                </div>

            </Container>

        </>
    );

};
let mapStateToProps = (state => {
    return {
        signupErrorMessage: state.auth.signupErrorMessage,
    };
})
let mapDispatchToProps = (dispatch => {
    return {
        signUpAction: (newUser) => dispatch(signUpAction(newUser)),
        signUpError: (error) => dispatch(signUpError(error)),

    };
})
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
