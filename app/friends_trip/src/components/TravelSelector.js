import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container, Card, Button, Form, Collapse, Col, Row } from "react-bootstrap";
import { setCurrentTrip,changeTripInfo } from '../redux/actions/eventActions'
import { FaPen } from "react-icons/fa"

let TravelSelector = (props) => {
    const { trips, setCurrentTrip, currentTrip,changeTripInfo,currentUser } = props
    const [open, setOpen] = useState(false);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 700 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const tripname = useRef()
    const tripdesc = useRef()
    useEffect(() => {
        // title
        // description
        // emailRef.current.value
        // passwordRef.current.value
        let dataTrip = trips.find(e=> e.id===currentTrip)
        if (trips.length>0&&currentTrip !== undefined&&dataTrip!==undefined) {
            tripname.current.value = dataTrip.name
            tripdesc.current.value = dataTrip.desc
        } else {
            tripname.current.value = ""
            tripdesc.current.value = ""
        }
    }, [currentTrip, trips])
    let handletripsChange = (e)=>{
        e.preventDefault();
        changeTripInfo({
            name:tripname.current.value,
            desc:tripdesc.current.value,
            currentTrip:currentTrip,
            currentUser
        })
        setOpen(!open)
    }
    let setTrip = (index)=>{
        setCurrentTrip(index)
    }
    return (
        <>
            <h4 className="me-3"> Your travels</h4>
            <div className="d-flex">
                <div className="col-10">
                    <Carousel className="mt-1" responsive={responsive}>
                        {trips.map((trip, index) => {
                            return <Card
                                bg={currentTrip===trip.id?"info":"light"}
                                text={currentTrip===trip.id ? 'white' : 'dark'}
                                style={{ width: '18rem',cursor:"pointer" }}
                                className="mb-2"
                                onClick={() => {setTrip(trip.id) }}
                                key={index}

                            >
                                <Card.Body>
                                    <Card.Title>{trip.name} <Button variant="link"
                                        onClick={() => { 
                                            setOpen(!open); 
                                        }}
                                    ><FaPen /></Button> </Card.Title>
                                    <Card.Text>
                                        {trip.desc.length > 35 ? ` ${trip.desc.substring(0, 32)}...` : `${trip.desc}`}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        })}



                    </Carousel>

                </div>
                <Button
                    onClick={() => { setOpen(!open); setCurrentTrip(undefined) }}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    add a new trip
                </Button>
            </div>
            <Container>
                <div className="d-flex justify-content-center">
                    <div className="col-5">
                        <Collapse in={open}>
                            <Form onSubmit = {handletripsChange}>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label type="text" column sm="2">
                                        name
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control required ref={tripname} type="text" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label column sm="2">
                                        description
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control required ref={tripdesc} as="textarea" rows={2} />

                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">

                                    <Button className="col-10" onClick={(e) => undefined} type="submit">{currentTrip !== undefined?"update trip infos":"create new trip"}</Button>

                                </Form.Group>
                            </Form>
                        </Collapse>
                    </div>
                </div>
            </Container>
        </>
    )
}

let mapStateToProps = (({ events,auth }) => {
    return {
        trips: events.trips,
        currentTrip: events.currentTrip,
        currentUser: auth.currentUser,
    };
})
let mapDispatchToProps = (dispatch => {
    return {
        setCurrentTrip: (id) => {     console.log(id);dispatch(setCurrentTrip(id)) },
        changeTripInfo: (tripInfo) => { dispatch(changeTripInfo(tripInfo)) },
        
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(TravelSelector);