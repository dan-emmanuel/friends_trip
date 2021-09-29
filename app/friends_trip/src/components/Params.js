import React, { useRef } from "react";
import { connect } from "react-redux";
import { ListGroup, InputGroup, Button } from "react-bootstrap";
import { getusers, cachUserEmpty,addNewUserToTheTrip } from "../redux/actions/eventActions"

let Params = (props) => {
    let { users, getusers, cachUserEmpty, cachUsers,currentTripId,addNewUserToTheTrip } = props
    const userToInvite = useRef()

    let getusersAction = (e) => {
        if (e.key !== "Unidentified") {
            if (userToInvite.current.value.length >= 3) {
                let noNeededUsersId = users.map((e, i) => e.id)
                getusers({ noNeededUsersId, lookedFor: userToInvite.current.value })
                if(!cachUsers.map(e=>e.username).includes(userToInvite.current.value)){
                    e.target.classList.add('is-invalid');
                }else{
                    e.target.classList.remove('is-invalid')
                }
            } else {
                cachUserEmpty()
                e.target.classList.remove('is-invalid')

            }
        }else{
            e.target.classList.remove('is-invalid')
        }
    }
   
    let addUseraction = (e)=>{
        if(cachUsers.map(e=>e.username).includes(userToInvite.current.value)){
           
            addNewUserToTheTrip({
                userId:cachUsers.find(e=>{return e.username===userToInvite.current.value}).id,
                tripId:currentTripId,
                username:userToInvite.current.value
            })  
            userToInvite.current.classList.remove('is-invalid')
            userToInvite.current.value = ""

        }else{
           
            userToInvite.current.classList.add('is-invalid')

        }
    }
    return <div className="d-flex justify-content-center">
        
        <div className="col-8 ">
            <div >
                <InputGroup className="mb-3">
                    <input
                        type="text"
                        onKeyUp={getusersAction}
                        className="form-control"
                        placeholder="Type to search..."
                        ref={userToInvite}
                        list="potentialUsers"
                    />
                    <Button variant="outline-secondary" onClick={addUseraction}>
                        add that user to the trip
                    </Button>
                </InputGroup>
                <datalist id="potentialUsers">
                    {
                        cachUsers.map((e, i) => {
                            return <option key={i} value={e.username} />;
                        })
                    }

                </datalist>
            </div>



            <ListGroup className="mt-3">
                {
                    users.map((e, i) => {

                        return <ListGroup.Item key={i}>{e.username}</ListGroup.Item>
                    })
                }
            </ListGroup>

        </div>
    </div>
}
let mapStateToProps = (({ auth, front, events }) => {
    return {
        currentSubMenu: front.currentSubMenu,
        users: events.users,
        cachUsers: events.cachUsers,
        currentTripId : events.currentTrip
    };
})
let mapDispatchToProps = (dispatch => {
    return {
        getusers: e => { dispatch(getusers(e)) },
        cachUserEmpty: () => { dispatch(cachUserEmpty()) },
        addNewUserToTheTrip:((e)=>{dispatch(addNewUserToTheTrip(e))})
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(Params);
