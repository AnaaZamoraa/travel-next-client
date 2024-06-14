import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Homepage/Homepage";
import CreateTravelPage from "../pages/CreateTravel/CreateTravelPage";
import PrivateRoute from "./PrivateRoutes";
import CreateActivityPage from "../pages/CreateActivity/CreateActivityPage";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            
            <Route element={<PrivateRoute/>}>
                <Route path="/travels/create" element={<CreateTravelPage/>}/>
                <Route path="/activities/create" element={<CreateActivityPage/>}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes