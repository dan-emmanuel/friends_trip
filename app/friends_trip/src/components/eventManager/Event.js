import React, { } from "react";
import { } from "react-bootstrap";
import { connect, Provider } from "react-redux";
import { Draggable } from "react-beautiful-dnd"

let Event = (props) => {
    let { events, tags } = props.events

    return (
        <>
            <Draggable draggableId={props.draggableId} index={props.index}>
                {provider => (


                    <div className="alert alert-secondary"   {...provider.draggableProps}
                        {...provider.dragHandleProps}
                        ref={provider.innerRef}>
                        {props.text}
                    </div>

                )
                }

            </Draggable>
        </>
    )
}


let mapStateToProps = (({ front, events }) => {
    console.log(events)
    return {
        events: events,
        tags: events.tags
    };
})
let mapDispatchToProps = (dispatch => {
    return {
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(Event);
