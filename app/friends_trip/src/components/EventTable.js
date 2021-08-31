import React, { } from "react";
import { connect } from "react-redux";
import { Container, } from "react-bootstrap";
import { } from '../redux/actions/frontActions'
import DraggableDiv from './eventManager/DraggableDiv'
import Event from './eventManager/Event'
import { changeEventTag } from '../redux/actions/eventActions'
import { DragDropContext } from "react-beautiful-dnd"
let EventTable = (props) => {
    let { events, tags, changeEventTag } = props
    console.log(events, tags)
    let ondragend = result => {
        const { destination, source, draggableId } = result
        console.log(123456)
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        changeEventTag({
            event: draggableId,
            source: { id: source.droppableId, positionRemove: source.index },
            destination: { id: destination.droppableId, positionInsert: destination.index }
        })

    }
    let colors = ["primary", "secondary", "success"]
    console.log(Object.values(tags)[0].tasksId)
    Object.values(tags)[0].tasksId.map(taskId => {
        return <Event draggableId={taskId} />
    }
    )


    return (
        <>

            <Container className="mt-4 mb-4">
                <div className="d-flex justify-content-between">
                    <DragDropContext onDragEnd={ondragend}>
                        {Object.keys(tags).map((e, i) => {
                            return (
                                <DraggableDiv key={i} color={colors[i]} droppableId={e} >
                                    {
                                        tags[e].tasksId.map((taskId, i) => <Event
                                            draggableId={taskId}
                                            key={i}
                                            index={i} 
                                            text={taskId}
                                            />)}
                                </DraggableDiv>)
                                
                        })}

                    </DragDropContext>
                </div >
            </Container >

        </>
    )
}

let mapStateToProps = (({ front, events }) => {
    console.log(events)
    return {
        events: events.events,
        tags: events.tags
    };
})
let mapDispatchToProps = (dispatch => {
    return {
        changeEventTag: (info) => dispatch(changeEventTag(info)),

    };
})
export default connect(mapStateToProps, mapDispatchToProps)(EventTable);