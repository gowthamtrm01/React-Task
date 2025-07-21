import { Outlet, Navigate } from "react-router";
import { useAuth } from "./AuthContext";
import Cookies from "js-cookie";

function ProtectedRotes() {
    const {authUser} = useAuth()
    const user = authUser || Cookies.get('token')
    return user ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRotes;