import { Outlet, useNavigate } from "react-router"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"
import axios from 'axios'

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((store) => store.user)

    const fetchUser = async() => {
        if (userData) return;
        try{
            
            const result = await axios.get(BASE_URL+"/profile/view", {withCredentials: true}); // since this is a get request the input field is not required
            dispatch(addUser(result.data))

        } catch (error) {
            if (error.status === 401){
                navigate("/login")
            }
            console.log (error.message);
        }
    }

    useEffect(() => {
        
            fetchUser();
    },[])

    return (
        <div>
            <Navbar/>
            <Outlet />
            <Footer/>
        </div>
    )
}

export default Body