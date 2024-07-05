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

    getValidTypes() {
        return this.api.get(`/valid-types`);
    }
    createActivity(activity) {
        return this.api.post(`/create`, activity);
    }
    getActivities(query){
        return this.api.get(`/get-activities?persons=${query}`)
    }
    getActivitiesByUser(){
        return this.api.get(`/me`)
    };
    getActivityById(id){
        return this.api.get(`/${id}`)
    }
}

const activityService = new ActivityService();
export default activityService;
