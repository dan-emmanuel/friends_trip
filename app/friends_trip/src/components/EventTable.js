import React, { } from "react";
import { connect } from "react-redux";
import { Container, } from "react-bootstrap";
import { } from '../redux/actions/frontActions'
import DraggableDiv from './eventManager/DraggableDiv'
import EventAlert from './eventManager/EventAlert'
let EventTable = (props) => {

    return (
        <>
            <Container className="mt-4 mb-4">
                <div className="d-flex justify-content-between">

                    <DraggableDiv color="primary" >
                        <EventAlert />
                        <EventAlert />
                        <EventAlert />
                    </DraggableDiv>

                    <DraggableDiv color="secondary">
                        <EventAlert />

                    </DraggableDiv>
                    <DraggableDiv color="success">
                        <EventAlert />
                        <EventAlert />
                    </DraggableDiv>
                </div >
        </Container >

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
export default connect(mapStateToProps, mapDispatchToProps)(EventTable);