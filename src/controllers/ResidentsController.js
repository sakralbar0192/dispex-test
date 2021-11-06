import ResidentsService from "../services/ResidentsService"
import { addResidentsAction } from "../store/redusers/residentsReduser"

class ResidentsController {
    getResidents(addressId) {
        return async function (dispatch) {
            await ResidentsService.getAll(addressId)
            .then(res => dispatch(addResidentsAction(res)))
        }
    }

    async createResident(resident) {
        return await ResidentsService.createResident(resident)
    }

    async bindResident(residentId, addressId) {
        await ResidentsService.bindResident(residentId, addressId)  
    }

    async removeResident(BindId) {
        await ResidentsService.removeResident(BindId)
    }
}

export default new ResidentsController()