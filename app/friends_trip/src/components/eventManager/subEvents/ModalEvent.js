import React from "react";
import { connect } from "react-redux";
import { Modal, ListGroup, Form, Tab, Row, Col, Button, FormControl } from "react-bootstrap";
import { openCloseEventModal } from '../../../redux/actions/frontActions'
import { setCurrentSubEventId, newSubEvent, checkMateOnEvent, changeEventName } from '../../../redux/actions/eventActions'


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
        currentUser,
        checkMate,
        changeEventName,
        subEventsTypes,
        tripUser
    } = props
    
    let subeventType = (subEvent, index) => {
        let currentsubEvent = subEventsTypes.find(e => parseInt(e.id) === parseInt(subEvent.type))
        switch (currentsubEvent.name) {
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
        newSubEvent({ name: e.target[0].value, type: e.target[1].value, eventId: currentEvent })
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
                                : ""}
                            onBlur={(e) =>
                                changeEventName(
                                    {
                                        eventId: events.find(e => e.id === currentEvent).id,
                                        name: e.target.value
                                    }
                                )}>

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
                                            return <ListGroup.Item onClick={() => setCurrentSubEventId(subEvent.id)} key={index} action href={`#subEvent${index}`}>
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
                                                {subEventsTypes.map((e, i) => {
                                                    return <option key={i} value={e.id}>{e.name}</option>
                                                })}
                                            </Form.Select>

                                            <Button type="submit" className="col-12 mt-1"> Add that subEvent</Button>
                                        </Form>

                                    </ListGroup.Item>
                                    <ListGroup.Item >
                                        {

                                            tripUser.map((user, index) => {
                                                let thatevent = events.find(e=>e.id===currentEvent)
                                                if(thatevent){
                                                    console.log(user)
                                                    let mates = thatevent.mates
                                                    let thatMate = mates.find(e=>e.id===user.id)
                                                    let ismate = thatMate&&thatMate.mates
                                                    return <div key={index} className="d-flex align-items-baseline">

                                                    <span className="me-1">
                                                        <BiUserCircle />
                                                    </span>
                                                    <span className="me-1"> {user.username}</span>
                                                    <Form.Check className="col-auto "
                                                        type="switch"
                                                        id="custom-switch"
                                                        checked={ismate}
                                                        disabled={user.id !== currentUser.id}
                                                        onChange={(e) => { checkMate({ mateid: currentUser.id, value: e.target.checked }) }}
                                                    />

                                                </div>
                                                }else{
                                                    return null
                                                }

                                                // let mateChecked = mates
                                                
                                            })
                                        }
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
       
        currentUser: auth.currentUser,
        subEventsTypes: events.subEventsTypes,
        tripUser: events.users
    };
})
let mapDispatchToProps = (dispatch => {
    return {
        setLgShow: () => dispatch(openCloseEventModal(false)),
        setCurrentSubEventId: (index) => dispatch(setCurrentSubEventId(index)),
        newSubEvent: (e) => dispatch(newSubEvent(e)),
        checkMate: ({ mateid, value }) => dispatch(checkMateOnEvent({ mateid, value })),
        changeEventName: (event) => dispatch(changeEventName(event))

    }

})
export default connect(mapStateToProps, mapDispatchToProps)(ModalEvent);

