import React from "react";
import { connect } from "react-redux";

let Home = (props) => {
    
    return (
        <div>
            Home
        </div>

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
