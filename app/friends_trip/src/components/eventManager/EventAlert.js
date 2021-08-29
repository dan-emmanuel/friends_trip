import React, { } from "react";
import { connect } from "react-redux";
import {Alert } from "react-bootstrap";
let EventAlert = (props) => {

    return (
        <>
            <Alert variant="secondary">
                new event
            </Alert>
        </>
    )
}

let mapStateToProps = (({ front }) => {
    return {
    };
})
let mapDispatchToProps = (dispatch => {
    return {
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(EventAlert);