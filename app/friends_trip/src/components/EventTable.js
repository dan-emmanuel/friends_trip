import React, { } from "react";
import { connect } from "react-redux";
import { Container, } from "react-bootstrap";
import { } from '../redux/actions/frontActions'
import DraggableDiv from './eventManager/DraggableDiv'
import Event from './eventManager/Event'
import { DragDropContext } from "react-beautiful-dnd"
let EventTable = (props) => {
    let { events, tags } = props
    console.log(events, tags)
    let ondragend = result => {
        const { destination, source, draggableId } = result
        console.log(destination)
        console.log(source)
        console.log(draggableId)

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // const collumn = datas.columns[source.droppableId]

    }

    console.log(Object.values(tags)[0].tasksId)
    Object.values(tags)[0].tasksId.map(taskId => {
        console.log(taskId)
        return <Event draggableId={taskId} />
    }
    )

    let id=0

    return (
        <>
            <Container className="mt-4 mb-4">
                <div className="d-flex justify-content-between">
                    <DragDropContext onDragEnd={ondragend}>
                        <DraggableDiv color="primary" droppableId="ideas" >
                            {Object.values(tags)[0].tasksId.map((taskId, i) => {
                                return <Event draggableId={taskId} key={i} index={id++} />
                            })}

                        </DraggableDiv>

                        <DraggableDiv color="secondary" droppableId="onDoing">
                            {Object.values(tags)[1].tasksId.map((taskId, i) => {
                                return <Event draggableId={taskId} key={i} index={id++} />
                            })}
                        </DraggableDiv>

                        <DraggableDiv color="success" droppableId="done">
                            {Object.values(tags)[2].tasksId.map((taskId, i) => {
                                return <Event draggableId={taskId} key={i} index={id++} />
                            })}
                        </DraggableDiv>
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
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(EventTable);