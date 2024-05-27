import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from '../services/auth.service'


const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const authenticateUser = () => {
        const token = localStorage.getItem('authToken')

        if (token) {
            authService
                .verify(token)
                .then(({ data }) => {
                    setUser(data)
                    setIsLoading(false)
                })
                .catch(err => logout())
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        setUser(null)
        setIsLoading(false)
        navigate('/')
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ authenticateUser, user, logout, isLoading }}>
            {props.children}
        </AuthContext.Provider>
    )


}

export { AuthContext, AuthProviderWrapper }