import React, { } from "react";
import { Droppable } from "react-beautiful-dnd"
import {Button} from "react-bootstrap";
import { connect } from "react-redux";
import {newEvent} from '../../redux/actions/eventActions'
let DropableDiv = (props) => {
    let {newEvt,events} = props
    let createNewEvt = (e)=>{
        console.log(events.currentTrip)
        newEvt(events.currentTrip)
    }
    return (

        <Droppable droppableId={props.droppableId}>
            {provider => (

                <div className={`card bg-${props.color} col-3 text-white`}
                    {...provider.droppableProps}
                    ref={provider.innerRef}>
                    <div className="card-header d-flex justify-content-between">
                        <span>{props.title}</span>  {props.addButton&&<Button onClick={createNewEvt} variant="outline-light">+    </Button>}
                    </div>
                    <div className="card-body">
                        {props.children}
                    </div>
                    <div>

                    </div>
                    {provider.placeholder}
                </div>
            )
            }
        </Droppable>

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
        newEvt:(e)=>dispatch(newEvent(e))
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(DropableDiv);
