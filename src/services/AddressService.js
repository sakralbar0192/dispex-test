import axios from 'axios';

class AddressService {
    async getStreets() {
        return await axios.get('https://dispex.org/api/vtest/Request/streets')
        .then(res => res.data)
    }

    async getHouses(streetId) {
        return await axios.get(`https://dispex.org/api/vtest/Request/houses/${streetId}`)
        .then(res => res.data)
    }

    async getFlats(houseId) {
        return await axios.get(`https://dispex.org/api/vtest/Request/house_flats/${houseId}`)
        .then(res => res.data)
    }
}

export default new AddressService()