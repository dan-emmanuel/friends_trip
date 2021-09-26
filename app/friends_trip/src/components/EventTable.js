import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { } from '../redux/actions/frontActions'
import DropableDiv from './eventManager/DropableDiv'
import Event from './eventManager/Event'
import { changeEventTag, getAllTag } from '../redux/actions/eventActions'
import { DragDropContext } from "react-beautiful-dnd"
import { openCloseEventModal } from '../redux/actions/frontActions'
import ModlalEvent from './eventManager/subEvents/ModalEvent'
let EventTable = (props) => {
    let {
        events,
        tags,
        changeEventTag,
        getAllTag
    } = props
    let ondragend = result => {
        const { destination, source, draggableId } = result
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        changeEventTag({
            event: draggableId,
            source: { id: source.droppableId, positionRemove: source.index },
            destination: { id: destination.droppableId, positionInsert: destination.index }
        })

    }
    let colors = ["primary", "secondary", "success"]

    useEffect(() => {
        if (Object.values(tags) && Object.values(tags)[0]) {
            Object.values(tags)[0].tasksId.map((taskId, id) => {
                return <Event draggableId={taskId} key={id} />
            })
        } else {
            getAllTag()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    return (
        <>

            <Container className="mt-4 mb-4">
                <div className="d-flex justify-content-between">
                    <DragDropContext onDragEnd={ondragend}>
                        {Object.keys(tags).map((e, i) => {
                            return (
                                <DropableDiv key={i} color={colors[i]} addButton={i === 0} title={tags[e].name} droppableId={e} >
                                    {
                                        tags[e].tasksId.map((taskId, index) => {
                                            let currentEvent = events.find(e => e.id === taskId)
                                            return <Event
                                                draggableId={`${taskId}`}
                                                key={taskId}
                                                index={index}
                                                text={currentEvent.name}
                                                eventId={taskId}
                                            />
                                        })}
                                </DropableDiv>)
                        })}
                    </DragDropContext>
                </div >
            </Container >
            <ModlalEvent />
        </>
    )
}

let mapStateToProps = (({ front, events, }) => {
    return {
        events: events.events,
        currentEvent: events.currentEvent,
        currentSubEvent: events.currentSubEvent,
        tags: events.tags,
        lgShow: front.openEventModal,
        subEvents: events.events[events.currentEvent]
            ? events.events[events.currentEvent].subEvents
            : undefined
    };
})
let mapDispatchToProps = (dispatch => {
    return {
        changeEventTag: (info) => dispatch(changeEventTag(info)),
        setLgShow: () => dispatch(openCloseEventModal(false)),
        getAllTag: () => dispatch(getAllTag())
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(EventTable);