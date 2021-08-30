
const initState = {
    events: {
        event1: { id: "ev1", title: "ev1" },
        event2: { id: "ev2", title: "ev2" },
        event3: { id: "ev3", title: "ev3" },
        event4: { id: "ev4", title: "ev4" },
        event5: { id: "ev5", title: "ev5" },
        event6: { id: "ev6", title: "ev6" }

    },

    tags: {
        ideas: {
            id: "ideas",
            title: "ideas",
            tasksId:["ev1","ev2","ev3","ev5"]
        },
        onDoing: {
            id: "onDoing",
            title: "onDoing",
            tasksId:["ev4"]
        },
        done: {
            id: "done",
            title: "done",
            tasksId:["ev6"]
        }
    }
}


export const eventsReducer = (state = initState, action) => {
    switch (action.type) {
        case '':

            break;

        default:
            return { ...state }
    }
}

export default eventsReducer