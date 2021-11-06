const actionTypes = {
    ADD_RESIDENTS: 'ADD_RESIDENTS',
    REMOVE_RESIDENT: 'REMOVE_RESIDENT'
}

const initialState = []

export const residentsReduser = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_RESIDENTS:
            return [...action.payload]  
        case actionTypes.REMOVE_RESIDENT:
            return state.filter(el=> el.bindId !== action.payload)            
        default: 
            return state
    }
}

export const addResidentsAction = (payload) => ({type: actionTypes.ADD_RESIDENTS, payload})
export const removeResidentAction = (payload) => ({type: actionTypes.REMOVE_RESIDENT, payload})