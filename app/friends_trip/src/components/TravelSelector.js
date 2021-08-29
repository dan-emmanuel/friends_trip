import React, { useState } from "react";
import { connect } from "react-redux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container, Card, Button, Form, Collapse , Col, Row } from "react-bootstrap";

let TravelSelector = (props) => {
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
    return (
    <>
    <h4 clssName="me-3"> Your travels</h4>
          <div className="d-flex">
              <div className="col-10">
                  <Carousel className="mt-1" responsive={responsive}>
                      <Card
                          bg={"info"}
                          text={"info" === 'light' ? 'dark' : 'white'}
                          style={{ width: '18rem' }}
                          className="mb-2"
                      >
                          <Card.Body>
                              <Card.Title>{"info"} Card Title </Card.Title>
                              <Card.Text>
                                  Some quick example text to build on the card title and make up the bulk
                                  of the card's content.
                              </Card.Text>
                          </Card.Body>
                      </Card>
                      <Card
                          bg={"info"}
                          text={"info" === 'light' ? 'dark' : 'white'}
                          style={{ width: '18rem' }}
                          className="mb-2"
                      >
                          <Card.Body>
                              <Card.Title>{"info"} Card Title </Card.Title>
                              <Card.Text>
                                  Some quick example text to build on the card title and make up the bulk
                                  of the card's content.
                              </Card.Text>
                          </Card.Body>
                      </Card>
                      <Card
                          bg={"info"}
                          text={"info" === 'light' ? 'dark' : 'white'}
                          style={{ width: '18rem' }}
                          className="mb-2"
                      >
                          <Card.Body>
                              <Card.Title>{"info"} Card Title </Card.Title>
                              <Card.Text>
                                  Some quick example text to build on the card title and make up the bulk
                                  of the card's content.
                              </Card.Text>
                          </Card.Body>
                      </Card>
                      <Card
                          bg={"info"}
                          text={"info" === 'light' ? 'dark' : 'white'}
                          style={{ width: '18rem' }}
                          className="mb-2"
                      >
                          <Card.Body>
                              <Card.Title>{"info"} Card Title </Card.Title>
                              <Card.Text>
                                  Some quick example text to build on the card title and make up the bulk
                                  of the card's content.
                              </Card.Text>
                          </Card.Body>
                      </Card>

                  </Carousel>

              </div>
              <Button
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
              >
                  add a new trip
              </Button>



          </div>
          <Container>
              <div className="d-flex justify-content-center">
                  <div className="col-5">
                      <Collapse  in={open}>
                          <Form >
                              <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                  <Form.Label column sm="2">
                                      Email
                                  </Form.Label>
                                  <Col sm="8">
                                      <Form.Control plaintext readOnly defaultValue="email@example.com" />
                                  </Col>
                              </Form.Group>

                              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                  <Form.Label column sm="2">
                                      Password
                                  </Form.Label>
                                  <Col sm="8">
                                      <Form.Control type="password" placeholder="Password" />
                                  </Col>
                              </Form.Group>

                              <Form.Group as={Row} className="mb-3">

                                  <Button className="col-10" Button type="submit">Sign in</Button>

                              </Form.Group>
                          </Form>
                      </Collapse>
                  </div>

              </div>
          </Container>
    </>
    )
}

let mapStateToProps = ((state) => {
    return {
    };
})
let mapDispatchToProps = (dispatch => {
    return {

    };
})
export default connect(mapStateToProps, mapDispatchToProps)(TravelSelector);