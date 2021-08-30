import React, { } from "react";
import { Droppable } from "react-beautiful-dnd"

let DraggableDiv = (props) => {

    return (

        <Droppable droppableId={props.droppableId}>
            {provider => (




                <div className={`card bg-${props.color} col-3 text-white`}
                    {...provider.droppableProps}
                    ref={provider.innerRef}>
                    <div className="card-header">
                        Featured
                    </div>
                    <div className="card-body">
                        {props.children}
                    </div>
                    <div>

                    </div>
                </div>
            )
            }
        </Droppable>

    )
}


export default DraggableDiv;