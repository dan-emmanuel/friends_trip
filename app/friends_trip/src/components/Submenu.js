/* eslint-disable jsx-a11y/anchor-is-valid */
import React  from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { FaTicketAlt, FaMoneyBillWave, FaMapMarked } from "react-icons/fa";
import { AiFillCalendar } from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs"

import { Container } from "react-bootstrap";

import {changeSubMenu} from '../redux/actions/frontActions'
let Submenu = (props) => {
    const {currentSubMenu,changeSubMenu} = props
   
    return (
        <>
            <Container className="mt-4">
                <div className="d-flex justify-content-around">
                    <Link
                        to="/event/event"
                        onClick={changeSubMenu}
                        data-target="events"
                        className={` fs-2 ${currentSubMenu==="events"?"link-prymary":"link-secondary"}`} >
                        <FaTicketAlt />
                    </Link>
                    <Link
                        to="/event/calendar"
                        onClick={changeSubMenu}
                        data-target="calendar"
                        className={`fs-2  ${currentSubMenu==="calendar"?"link-prymary":"link-secondary"}`}>
                        <AiFillCalendar />
                    </Link>
                    <Link
                        to="/event/map"
                        onClick={changeSubMenu}
                        data-target="map"
                        className={`fs-2  ${currentSubMenu==="map"?"link-prymary":"link-secondary"}`}>
                        <FaMapMarked />
                    </Link>
                    <Link
                        to="/event/bill"
                        onClick={changeSubMenu}
                        data-target="bill"

                        className={`fs-2  ${currentSubMenu==="bill"?"link-prymary":"link-secondary"}`}>
                        <FaMoneyBillWave />
                    </Link>
                    <Link
                        to="/event/params"
                        onClick={changeSubMenu}
                        data-target="params"
                        className={`fs-2  ${currentSubMenu==="params"?"link-prymary":"link-secondary"}`}>
                        <BsFillGearFill />
                    </Link>
                </div >
            </Container >

        </>
    )
}

let mapStateToProps = (({front}) => {
    return {
        currentSubMenu:front.currentSubMenu
    };
})
let mapDispatchToProps = (dispatch => {
    
    return {
        changeSubMenu: (e) => dispatch(changeSubMenu(e.currentTarget.dataset.target)),
    };
})
export default connect(mapStateToProps, mapDispatchToProps)(Submenu);