import axios from 'axios'


class UserService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/user`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    getUser(id) {
        return this.api.get(`/profile/${id}`)
    }
    editUser(id, userData) {
        return this.api.post(`/editUser/${id}`, userData)
    }
    deleteUser(id) {
        return this.api.delete(`deleteUser/${id}`)
    }
}

const userService = new UserService()
export default userService