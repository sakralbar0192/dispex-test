import AddressService from "../services/AddressService"
import { addAddressIdAction, addFlatsAction, addHousessAction, addStreetsAction, writeFlatAction, writeHouseAction, writeStreetAction } from "../store/redusers/addressReduser"

class AddressControllers {
    getStreets() {
        return async function (dispatch) {
            await AddressService.getStreets()
            .then(res => dispatch(addStreetsAction(res)))
        }
    }

    getHouses(streetId) {
        return async function (dispatch) {
            await AddressService.getHouses(streetId)
            .then(res => dispatch(addHousessAction(res)))
        }
    }

    getFlats(houseId){        
        return async function (dispatch) {            
            await AddressService.getFlats(houseId)
            .then(res=> dispatch(addFlatsAction(res)))
        }
    }

    writeStreet(streetName) {
        return function (dispatch) {
            dispatch(writeStreetAction(streetName))
        }
    }

    writeHouse(houseName) {
        return function (dispatch) {
            dispatch(writeHouseAction(houseName))
        }
    }

    writeFlat(flatName) {
        return function (dispatch) {
            dispatch(writeFlatAction(flatName))
        }
    }

    addAddressId(Addressid) {
        return function (dispatch) {
            dispatch(addAddressIdAction(Addressid))
        }
    }
}

export default new AddressControllers()