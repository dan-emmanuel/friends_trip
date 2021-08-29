import React, { } from "react";
import { connect } from "react-redux";
import { Container, } from "react-bootstrap";
import { } from '../redux/actions/frontActions'
import DraggableDiv from './eventManager/DraggableDiv'
import EventAlert from './eventManager/EventAlert'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
let EventTable = (props) => {

    return (
        <>
            <Container className="mt-4 mb-4">
                <div className="d-flex justify-content-between">
                    <DragDropContext>
                        <Droppable droppableId="characters">
                            {(provided) => {
                                <DraggableDiv color="primary" ref={provided.innerRef}
                                {...provided.droppableProps}  >
                                    <EventAlert />
                                    <EventAlert />
                                    <EventAlert />
                                </DraggableDiv>
                            }}
                        </Droppable>
                        <DraggableDiv color="secondary">
                            <EventAlert />

                        </DraggableDiv>
                        <DraggableDiv color="success">
                            <EventAlert />
                            <EventAlert />
                        </DraggableDiv>
                    </DragDropContext>
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