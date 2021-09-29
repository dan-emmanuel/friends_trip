import React from "react";
import { connect } from "react-redux";
import Submenu from './Submenu'
import TravelSelector from "./TravelSelector"
import EventTable from "./EventTable"
import Params from "./Params"

let Home = (props) => {
    let { currentSubMenu } = props
    let toShow = (e) => {
        switch (currentSubMenu) {
            case "events":
                return <EventTable />
            case "calendar":
                return 
            case "map":
                return
            case "bill":
                return
            case "params":
                return <Params/>
            default:
                break;
        }
    }
    return (
        <>
            <div>
                <TravelSelector />
                <Submenu />
            </div>

            <div>
                {toShow()}
            </div>
        </>
    );
};
let mapStateToProps = (({ auth, front }) => {
    return {
        currentSubMenu: front.currentSubMenu
    };
})
let mapDispatchToProps = (dispatch => {
    return {
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);
