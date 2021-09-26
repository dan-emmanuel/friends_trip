import React, { } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd"
import {openCloseEventModal} from "../../redux/actions/frontActions"
import {setCurrentEventId} from "../../redux/actions/eventActions"


let Event = (props) => {
    let {setLgShow} = props
    return (
        <>
            <Draggable draggableId={props.draggableId} index={props.index}>
                {provider => (
                    <div className="alert alert-secondary"  onClick={()=>setLgShow(props.eventId)} {...provider.draggableProps}
                        {...provider.dragHandleProps}
                        ref={provider.innerRef}>
                        {props.text}
                    </div>
                )}
            </Draggable>
        </>
    )
}


let mapStateToProps = (({ front, events }) => {
    return {
        events: events,
        tags: events.tags
    };
})
let mapDispatchToProps = (dispatch => {
    return {
        setLgShow:(e)=>{
            console.log(e)
            dispatch(openCloseEventModal(true))
            dispatch(setCurrentEventId(e))
        }
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(Event);
