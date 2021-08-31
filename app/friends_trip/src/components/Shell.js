import React from "react";
import { connect } from "react-redux";
import { useLocation } from 'react-router-dom'
import { Container,Button } from "react-bootstrap";
import { BiHome } from "react-icons/bi";
import {FaRegUser} from "react-icons/fa"
import './home.css'
import Header from "./Header";


let Shell = (props) => {
    const location = useLocation();

    return (
        <>
            {["/signup", "/login"].some((item) => item === location.pathname)
                ? <>{props.children}</>
                : <>
                    <Header [/> 
                    <Container fluid>
                        <div className="d-flex">
                            <div style={
                                {
                                    height :"100vh"
                                }
                            } 
                            className="col-1 d-flex flex-column justify-content-around">
                                <Button variant="outline-primary"  active className="rounded_button">
                                    <BiHome />
                                </Button>
                                <Button variant="outline-primary" className=" d-flex justify-content-center align-items-center rounded_button" >
                                    <FaRegUser />
                                </Button>
                            </div>
                            <div className="col-11" id="workspace" style={{
                                height:"100vh",
                                overflow:"scroll",
                                scrollbarWidth:"none"
                            }}>
                                {props.children}

                            </div>
                        </div>

                    </Container>
                </>
            }
        </>
    );

};

// let mapStateToProps = (({ auth }) => {

// })

// let mapDispatchToProps = (dispatch => {

// })

export default connect(null, null)(Shell);
