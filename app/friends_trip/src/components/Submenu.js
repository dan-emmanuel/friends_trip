/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { connect } from "react-redux";

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
                    <a href="#"
                        onClick={changeSubMenu}
                        data-target="events"
                        className={`link-secondary fs-2 ${currentSubMenu==="events"?"selected":""}`} >
                        <FaTicketAlt />
                    </a>
                    <a href="#"
                        onClick={changeSubMenu}
                        data-target="calendar"
                        className={`link-secondary fs-2  ${currentSubMenu==="calendar"?"selected":""}`}>
                        <AiFillCalendar />
                    </a>
                    <a href="#"
                        onClick={changeSubMenu}
                        data-target="map"

                        className={`link-secondary fs-2  ${currentSubMenu==="map"?"selected":""}`}>
                        <FaMapMarked />
                    </a>
                    <a href="#"
                        onClick={changeSubMenu}
                        data-target="bill"

                        className={`link-secondary fs-2  ${currentSubMenu==="bill"?"selected":""}`}>
                        <FaMoneyBillWave />
                    </a>
                    <a href="#"
                        onClick={changeSubMenu}
                        data-target="params"
                        className={`link-secondary fs-2  {selected}`}>
                        <BsFillGearFill />
                    </a>
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