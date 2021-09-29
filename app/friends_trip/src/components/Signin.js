import React, {  useRef } from "react";
import { connect } from "react-redux";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { signInAction } from "../redux/actions/authActions"
import { Link,Redirect } from "react-router-dom"

let Signin = (props) => {
    // reference is set up to store a value that i want to 
    // use all along the life cycle component without storing it in the propps/states
    const emailRef = useRef()
    const passwordRef = useRef()

    let {
        signInErrorMessage,
        signInAction,
        signInSucceed
    } = props
    let signinevent = (e) => {
        e.preventDefault()
        signInAction({
            mail: emailRef.current.value,
            password: passwordRef.current.value,
        })
    }
    return (
        <>
        {signInSucceed
        ?<Redirect push to="/event/event" />
        :<>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }} >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                   
                        <Card>
                            <Card.Body>
                                {signInErrorMessage && <Alert variant="danger">{signInErrorMessage}</Alert>}
                                <h2 className="text-center mb-4">Sign Up</h2>
                                <Form onSubmit={signinevent}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" ref={emailRef} required />
                                    </Form.Group>
                                    <Form.Group id="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" ref={passwordRef} required />
                                    </Form.Group>

                                    <Button className="w-100" type="submit" >Sign In</Button>
                                </Form>

                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            <span className="me-1">no account yet ?</span><Link to="/signup">Sign Up</Link>

                        </div>
                </div>
            </Container>
        </>
        }
        </>

    );
};
let mapStateToProps = (({ auth }) => {
    
    return {
        signInErrorMessage: auth.signInErrorMessage,
        currentUser: auth.currentUser,
        signInSucceed: auth.signInSucceed
    };
})
let mapDispatchToProps = (dispatch => {
    return {
        signInAction: (credentials) => dispatch(signInAction(credentials)),
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
