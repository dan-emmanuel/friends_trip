import React, {  } from "react";
import { connect } from "react-redux";
import { FloatingLabel, Form } from "react-bootstrap";
import { updateNoteText, updateNoteName } from "../../../redux/actions/eventActions"
let NoteManager = (props) => {
    let {

        changeNoteName,
        changeNoteText,
        index,
        subEvents,
    } = props
 
    return (
        <>
            <div className="my-2">
                <Form.Group className="mb-3" >
                    <Form.Label>Note name</Form.Label>
                    <Form.Control
                        value={subEvents[index].name}
                        type="text"
                        placeholder="name@example.com"
                        onChange = {(e)=>changeNoteName(e.target.value)}
                    />
                </Form.Group>
                <FloatingLabel label="text">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        value={subEvents[index].text}
                        onChange = {(e)=>changeNoteText(e.target.value)}
                    />
                </FloatingLabel>

            </div>

        </>
    )
}

let mapStateToProps = (({ front, events }) => {
    return {
        currentEvent: events.currentEvent,
        events: events.events,
        subEvents: events.subEvents
            ? events.subEvents
            : []
    }
})
let mapDispatchToProps = (dispatch => {
    return {
        changeNoteName: (e) => dispatch(updateNoteName(e)),
        changeNoteText: (e) => dispatch(updateNoteText(e))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(NoteManager);