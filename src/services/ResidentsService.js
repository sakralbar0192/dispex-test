import axios from 'axios';

class ResidentsService {
    async getAll(addressId) {       
        return await axios.get('https://dispex.org/api/vtest/HousingStock/clients', {
            params: {
                addressId
            }
        }).then(res => res.data)
    }

    async createResident(resident) {    
        return await axios.post('https://dispex.org/api/vtest/HousingStock/client', resident, 'Content-Type: application/json-patch+json')
        .then(res=>res.data.id)       
    }

    async bindResident(residentId, addresId) {
        const requestBody = {
            "AddressId": addresId,
            "ClientId": residentId
        }
        return await axios.put('https://dispex.org/api/vtest/HousingStock/bind_client', requestBody, 'Content-Type: application/json-patch+json')  
    }

    async removeResident(id) {
        await axios.delete(`https://dispex.org/api/vtest/HousingStock/bind_client/${id}`)
    }
}

export default new ResidentsService()