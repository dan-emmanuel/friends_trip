import React, { useState } from "react";
import { connect } from "react-redux";
import { ListGroup, ProgressBar, Collapse, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { makeLiChecked,newLi } from "../../../redux/actions/eventActions"
let ListManager = (props) => {
    const [open, setOpen] = useState(false);
    let {
        index,
        changeLiVal,
        subEvents,
        newLi
    } = props
   
    let changeCheckBoxVal = (e, index) => {
        let value = e.currentTarget.checked

        changeLiVal(
            {
                target: index,
                val: value
            })
    }
    let newListItem = (e)=>{
        e.preventDefault()
        newLi({text:e.target[0].value,id:subEvents[index].id})
        setOpen(!open)
    }
   
    const now = subEvents[index].items!==undefined
    ?subEvents[index].items.filter(e => e.done).length / subEvents[index].items.length * 100
    :0
    const progressInstance =subEvents[index].items!==undefined
    ? <ProgressBar now={now} label={`${subEvents[index].items.filter(e => e.done).length}/${subEvents[index].items.length}`} />
    :<></>

    return (
        <>
            <ListGroup variant="flush">
                {
            
                    subEvents[index] !== undefined && parseInt(subEvents[index].type) === 1 && subEvents[index].items!==undefined
                        ? subEvents[index].items.map((li, index) => {
                            return <ListGroup.Item key={index}>
                                <input type="checkbox" onChange={(e) => changeCheckBoxVal(e, li.id)} checked={li.done} className="me-2" />
                                {li.text}
                            </ListGroup.Item>
                        })
                        : null
                }
            </ListGroup>
            <div className="my-2">
                <Collapse in={open} className="my-3">
                    <Form onSubmit = {newListItem}>
                        <InputGroup className="mb-3">
                            <FormControl required
                                placeholder="new item text"
                                aria-label="new item text"
                                aria-describedby="basic-addon2"
                            />
                            <Button type="submit" variant="outline-secondary" >
                                add it
                            </Button>
                        </InputGroup>
                    </Form>
                </Collapse>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    new item
                </Button>

            </div>
            {progressInstance}

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
        changeLiVal: ({ target, val }) => dispatch(makeLiChecked({
            id: target,
            checked: val
        })),
        newLi:obj=>dispatch(newLi(obj))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(ListManager);