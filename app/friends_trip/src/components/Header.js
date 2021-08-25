import React, {  useEffect } from "react";
import { connect } from "react-redux";
import { Navbar, Button, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

let Header = (props) => {
    let {currentUser} = props
    let redirect = true
    let history = useHistory();

    useEffect(()=>{
        if(currentUser.name===undefined)history.push("/login");
        

    },[currentUser])
    return (
        <>

           <Navbar className="justify-content-between" bg="light" expand="lg">
                <Container>

                    <Navbar.Brand href="#">My Friends Trip</Navbar.Brand>
                    <div className="d-flex">
                        <div className="me-2">bonjour {currentUser.name}</div>
                        {/! je suis laaaaaa/}
                        <Button variant="outline-success"><span class="glyphicon glyphicon-log-out"></span> Log out</Button>
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
export default connect(mapStateToProps, null)(Header);
