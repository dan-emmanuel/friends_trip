import React from "react";
import { connect } from "react-redux";
import Submenu from './Submenu'
import TravelSelector from "./TravelSelector"
import EventTable from "./EventTable"
let Home = (props) => {
    return (
        <>
            <div>
                <TravelSelector />
                <Submenu />
            </div>
            <div>
                <EventTable />
            </div>
        </>

    );
};
let mapStateToProps = (({ auth }) => {

    return {
    };
})
let mapDispatchToProps = (dispatch => {
    return {
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);
