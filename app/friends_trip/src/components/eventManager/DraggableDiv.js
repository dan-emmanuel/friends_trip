import React, { } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
let DraggableDiv = (props) => {

    return (
            <Card className="col-3"
                bg={props.color}
                text="white">
                <Card.Header
                    as="h5">Featured
                </Card.Header>
                <Card.Body>
                    {props.children}
                </Card.Body>
            </Card>

    )
}

let mapStateToProps = (({ front }) => {
    return {
    };
})
let mapDispatchToProps = (dispatch => {
    return {
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(DraggableDiv);