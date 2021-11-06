const actionTypes = {
    ADD_STREETS: 'ADD_STREETS',
    ADD_HOUSES: 'ADD_HOUSES',
    ADD_FLATS: 'ADD_FLATS',
    WRITE_STREET: 'WRITE_STREET',
    WRITE_HOUSE: 'WRITE_HOUSE',
    WRITE_FLAT: 'WRITE_FLAT',
    ADD_ADDRESS_ID: 'ADD_ADDRESS_ID'
}

const initialState = {    
    street: '',
    house: '',
    address: '',
    isAddressEnteredFull: false,
    addressId: '',
    streets: [],
    houses: [],
    flats: []
}

export const addressReduser = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_STREETS:
            return {...state, streets: action.payload}
        case actionTypes.ADD_HOUSES:
            return {...state, houses: action.payload, flats: []}
        case actionTypes.ADD_FLATS:
            return {...state, flats: action.payload}
        case actionTypes.WRITE_STREET:
            return  {...state,
                        isAddressEnteredFull: false, 
                        street: action.payload,
                        addressId: ''
                    }
        case actionTypes.WRITE_HOUSE:
            return  {...state, 
                        isAddressEnteredFull: false,
                        house: action.payload,
                        addressId: ''
                    }
        case actionTypes.WRITE_FLAT:
            return  {...state, 
                        isAddressEnteredFull: true,
                        address: `ул. ${state.street}, дом ${state.house}, ${action.payload}`                      
                    }
        case actionTypes.ADD_ADDRESS_ID: 
            return {...state, addressId: action.payload}
        default: 
            return state
    }
}

export const addStreetsAction = (payload) => ({type: actionTypes.ADD_STREETS, payload})
export const addHousessAction = (payload) => ({type: actionTypes.ADD_HOUSES, payload})
export const addFlatsAction = (payload) => ({type: actionTypes.ADD_FLATS, payload})
export const writeStreetAction = (payload) => ({type: actionTypes.WRITE_STREET, payload})
export const writeHouseAction = (payload) => ({type: actionTypes.WRITE_HOUSE, payload})
export const writeFlatAction = (payload) => ({type: actionTypes.WRITE_FLAT, payload})
export const addAddressIdAction = (payload) => ({type: actionTypes.ADD_ADDRESS_ID, payload})