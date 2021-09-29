import React, { useRef } from "react";
import { connect } from "react-redux";
import { FloatingLabel, Form } from "react-bootstrap";
import { changeNote } from "../../../redux/actions/eventActions"
let NoteManager = (props) => {
    let {
        changeNote,
        index,
        subEvents,
    } = props
    const noteName = useRef()
    const noteText = useRef()

    let changeNotEvnt = () => {
        changeNote({
            noteId : subEvents[index].id,
            name:noteName.current.value,
            text:noteText.current.value
        })
    }

    return (
        <>
            <div className="my-2">
                <Form.Group className="mb-3" >
                    <Form.Label>Note name</Form.Label>
                    <Form.Control
                        defaultValue={subEvents[index].name}
                        type="text"
                        placeholder="name@example.com"
                        onChange={() => { }}
                        onBlur={(e) => changeNotEvnt()}
                        ref={noteName}

                    />
                </Form.Group>
                <FloatingLabel label="text">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        defaultValue={subEvents[index].text}
                        onChange={() => { }}
                        onBlur={(e) => changeNotEvnt()}
                        ref={noteText}

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
        changeNote: (e) => dispatch(changeNote(e)),
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(NoteManager);