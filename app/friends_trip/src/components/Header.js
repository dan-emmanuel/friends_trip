import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navbar, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { signOutAction } from "../redux/actions/authActions"
import {getAllTrips,removeAll} from "../redux/actions/eventActions"
import { IoLogOut } from "react-icons/io5";

let Header = (props) => {
    
    let { currentUser, signOutAction,getAllTrips } = props
    let history = useHistory();
    useEffect(() => {
        getAllTrips(currentUser.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    let signOut = async()=>{
        await signOutAction()
        removeAll()
    }
  
    return (
        <>
            {
                currentUser.name !== undefined && 
                <Navbar className="justify-content-between" bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#">My Friends Trip</Navbar.Brand>
                        <div className="d-flex align-items-center">
                            <div className="me-2">hello {currentUser.name}</div>
                            <Button variant="outline-danger" onClick={()=>signOut()} className="border-0">
                                <IoLogOut />
                            </Button>
                        </div>
                    </Container>
                </Navbar>
            }
            {currentUser.name === undefined && history.push("/login")}
        </>
    );
};
let mapStateToProps = (({ auth,events }) => {
    return {
        currentUser: auth.currentUser,
        events:events
    };
})
let mapDispatchToProps = (dispatch => {
    return {
        signOutAction: () => { dispatch(signOutAction()) },
        getAllTrips:(e)=>dispatch(getAllTrips(e)),
        removeAll:(e)=>dispatch(removeAll())
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);
