import axios from 'axios'


class TravelService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/travels`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    createTravel() {
        return this.api.post(`/create`)
    }
}

const travelService = new TravelService()
export default travelService