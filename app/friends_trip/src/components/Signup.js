import React, { useRef } from "react";
import { connect } from "react-redux";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { signUpAction, signUpError } from "../redux/actions/authActions"
import { Link } from "react-router-dom"
let Signup = (props) => {
    // reference is set up to store a value that i want to 
    // use all along the life cycle component without storing it in the propps/states
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const userName = useRef()

    let {
        signUpAction,
        signUpError,
        signupErrorMessage,
        currentUser,
        signUpSucceed
    } = props
    let signupevent = (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return signUpError("Password do not match")
        }
        signUpAction({
            mail: emailRef.current.value,
            password: passwordRef.current.value,
            userName: userName.current.value
        })
    }
    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }} >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    {signUpSucceed
                        ?<Card>
                                <Card.Body>
                                    <Card.Title>Sign in succeed</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Hi {currentUser.name} </Card.Subtitle>
                                    <Card.Text>
                                        Your're account as been created
                                    </Card.Text>
                                    <Link to="/login">Please login</Link>
                                </Card.Body>
                            </Card>
                        : <>
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
                                        <Form.Group className="mb-3" id="password-confirm">
                                            <Form.Label>User name</Form.Label>
                                            <Form.Control type="text" ref={userName} required />
                                        </Form.Group>
                                        <Button className="w-100" type="submit" >Sign Up</Button>
                                    </Form>

                                </Card.Body>
                            </Card>
                            <div className="w-100 text-center mt-2">
                                <span className="me-1">Already have an account?</span><Link to="/login">Log In</Link>

                            </div>
                        </>
                    }
                </div>
            </Container>
        </>
    );

};
let mapStateToProps = (({ auth }) => {
    return {
        signupErrorMessage: auth.signupErrorMessage,
        currentUser: auth.currentUser,
        signUpSucceed: auth.signUpSucceed
    };
})
let mapDispatchToProps = (dispatch => {
    return {
        signUpAction: (newUser) => dispatch(signUpAction(newUser)),
        signUpError: (error) => dispatch(signUpError(error)),

    };
})
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
