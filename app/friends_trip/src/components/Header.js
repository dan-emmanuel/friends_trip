import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navbar, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { checkConnected } from "../redux/actions/authActions"
import { IoLogOut } from "react-icons/io5";

let Header = (props) => {
    let { currentUser,checkConnected } = props
    let history = useHistory();

    useEffect(() => {
        if (currentUser.name === undefined){
          checkConnected()
            if (currentUser.name === undefined){
                 history.push("/login")
            };
        }
    },[])
 
    return (
        <>

            <Navbar className="justify-content-between" bg="light" expand="lg">
                <Container>

                    <Navbar.Brand href="#">My Friends Trip</Navbar.Brand>
                    <div className="d-flex align-items-center">
                        <div className="me-2">bonjour {currentUser.name}</div>
                        <Button variant="outline-danger" className="border-0">
                            <IoLogOut/>
                        </Button>
                    </div>

                </Container>

            </Navbar>

        </>
    );

};
let mapStateToProps = (({ auth }) => {
    return {
        currentUser: auth.currentUser,
    };
})
let mapDispatchToProps = (dispatch => {
    return {
        checkConnected: () => dispatch(checkConnected()),
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);
