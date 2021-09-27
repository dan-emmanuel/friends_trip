import React, { } from "react";
import { connect } from "react-redux";
import { Modal, ListGroup, Form, Tab, Row, Col, Button, FormControl } from "react-bootstrap";
import { openCloseEventModal } from '../../../redux/actions/frontActions'
import { setCurrentSubEventId, newSubEvent, checkMateOnEvent } from '../../../redux/actions/eventActions'


import ListeManager from "./ListeManager"
import NoteManager from "./NoteManager"
import { BiUserCircle } from "react-icons/bi"

let ModalEvent = (props) => {
    let {
        events,
        lgShow,
        setLgShow,
        currentEvent,
        subEvents,
        setCurrentSubEventId,
        newSubEvent,
        mates,
        currentUser,
        checkMate

    } = props

    let subeventType = (subEvent, index) => {
        switch (subEvent.type) {
            case "list":
                return <ListeManager index={index} />
            case "note":
                return <NoteManager index={index} />
            default:
                break;
        }

    }
    let submitSubEvent = (e) => {
        e.preventDefault()
        newSubEvent({ name: e.target[0].value, type: e.target[1].value })
    }
    return (
        <>
            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"

            >
                <Modal.Header closeButton >
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <input defaultValue={
                            events.find(e => e.id === currentEvent)
                                ? events.find(e => e.id === currentEvent).name
                                : ""}>
                        </input>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="" style={{ minHeight: "80vh" }}>
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                        <Row>
                            <Col sm={4}>
                                <ListGroup>
                                    {
                                        subEvents.map((subEvent, index) => {
                                            return <ListGroup.Item onClick={() => setCurrentSubEventId(index)} key={index} action href={`#subEvent${index}`}>
                                                {subEvent.name}
                                            </ListGroup.Item>

                                        })
                                    }
                                    <ListGroup.Item>
                                        <Form onSubmit={submitSubEvent}>
                                            <FormControl required
                                                placeholder="new sub event"
                                                aria-label="new sub event"
                                                aria-describedby="basic-addon2"
                                            />

                                            <Form.Select required className="mt-1" aria-label="Default select example">
                                                <option value="list">list</option>
                                                <option value="text">text</option>
                                            </Form.Select>

                                            <Button type="submit" className="col-12 mt-1"> Add that subEvent</Button>
                                        </Form>

                                    </ListGroup.Item>
                                    <ListGroup.Item >
                                        {
                                            mates.map((user, index) => {
                                                return <div key={index} className="d-flex align-items-baseline">

                                                    <span className="me-1">
                                                        <BiUserCircle />
                                                    </span>
                                                    <span className="me-1"> {user.name}</span>
                                                    <Form.Check className="col-auto "
                                                        type="switch"
                                                        id="custom-switch"
                                                        checked={user.mate}
                                                        disabled={user.name !== currentUser.name}
                                                        onChange={(e) => { checkMate({ mateid: currentUser.id, value: e.target.checked }) }}
                                                    />

                                                </div>
                                            })}
                                    </ListGroup.Item>

                                </ListGroup>
                            </Col>
                            <Col sm={8}>
                                <Tab.Content>
                                    {
                                        subEvents.map((subEvent, index) => {

                                            return <Tab.Pane key={index} eventKey={`#subEvent${index}`}>
                                                {subeventType(subEvent, index)}
                                            </Tab.Pane>
                                        })
                                    }
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>

                </Modal.Body>
            </Modal>
        </>
    )
}

let mapStateToProps = (({ front, events, auth }) => {

    return {
        events: events.events,
        currentEvent: events.currentEvent,
        tags: events.tags,
        lgShow: front.openEventModal,
        subEvents: events.subEvents
            ? events.subEvents
            : [],
        mates: events.events[events.currentEvent]
            ? events.events[events.currentEvent].mates
            : [],
        currentUser: auth.currentUser,
    };
})
let mapDispatchToProps = (dispatch => {
    return {
        setLgShow: () => dispatch(openCloseEventModal(false)),
        setCurrentSubEventId: (index) => dispatch(setCurrentSubEventId(index)),
        newSubEvent: ({ type, name }) => dispatch(newSubEvent({ type, name })),
        checkMate: ({ mateid, value }) => dispatch(checkMateOnEvent({ mateid, value }))
    }

})
export default connect(mapStateToProps, mapDispatchToProps)(ModalEvent);

