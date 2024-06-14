import axios from 'axios';

class TravelService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/travels`
        });

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config;
        });

    }

    createTravel(travelData) {
        return this.api.post(`/create`, travelData);
    }
}

const travelService = new TravelService();
export default travelService;
