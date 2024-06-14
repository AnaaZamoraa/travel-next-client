import axios from 'axios';

class ActivityService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/activities`
        });

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config;
        });

    }

    createActivity(activityData) {
        return this.api.post(`/create`, activityData);
    }
}

const activityService = new ActivityService();
export default activityService;
