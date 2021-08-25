import React from "react";
import { connect } from "react-redux";
import { useLocation } from 'react-router-dom'
import Header from "./Header";


let Shell = (props) => {
    const location = useLocation();
    return (
        <>
            {["/signup", "/login"].some((item) => item === location.pathname)
                ? <>{props.children}</>
                : <>
                    <Header />
                    {props.children}
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
