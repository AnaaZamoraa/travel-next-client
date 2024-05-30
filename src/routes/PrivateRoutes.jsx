import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import Loader from "../components/Loader/Loader";
import { AuthContext } from "../contexts/auth.context"
import { ToastContext } from "../contexts/toast.context";

const PrivateRoute = () => {

    const { user, isLoading } = useContext(AuthContext)
    const { showToast } = useContext(ToastContext)


    if (isLoading) {
        return <Loader />
    }

    if (!user) {
        showToast(`You must be logged in to access this page`)
        return <Navigate to="/" />
    }

    return <Outlet />
}

export default PrivateRoute