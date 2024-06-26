import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Homepage/Homepage";
import CreateTravelPage from "../pages/CreateTravel/CreateTravelPage";
import PrivateRoute from "./PrivateRoutes";
import CreateActivityPage from "../pages/CreateActivity/CreateActivityPage";
import EveryTravelPage from "../pages/EveryTravel/EveryTravelPage";
import EveryActivityPage from "../pages/EveryActivityPage/EveryActivityPage";
import TravelDetailsPage from "../pages/TravelDetails/TravelDetailsPage";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path="/travels/all-travels" element={<EveryTravelPage/>}/>
            <Route path="/activities/all-activities" element={<EveryActivityPage/>}/>
            
            <Route element={<PrivateRoute/>}>
                <Route path="/travels/create" element={<CreateTravelPage/>}/>
                <Route path="/activities/create" element={<CreateActivityPage/>}/>
                <Route path="/travels/:id" element={<TravelDetailsPage/>}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes