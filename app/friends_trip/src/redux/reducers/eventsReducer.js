import { CHANGE_EVENT_TAG,NEW_EVENT } from '../actions/eventActions'
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
            tasksId: ["ev1", "ev2", "ev3", "ev5"]
        },
        onDoing: {
            id: "onDoing",
            title: "onDoing",
            tasksId: ["ev4"]
        },
        done: {
            id: "done",
            title: "done",
            tasksId: ["ev6"]
        }
    }
}


export const eventsReducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_EVENT_TAG:
            console.log(action.payload)
            let tags = {
                ...state.tags
            } 

            console.log(tags[[action.payload.source.id]].tasksId.splice(action.payload.source.positionRemove, 1))
            console.log(tags[[action.payload.destination.id]].tasksId.splice(action.payload.destination.positionInsert, 0, action.payload.event))
            return {
                ...state,
                tags:tags
            }

        case NEW_EVENT:{
            let tags = {
                ...state.tags
            }
            tags.ideas.tasksId.push(action.payload.name)
        }
        default:
            return { ...state }
    }
}

export default eventsReducer