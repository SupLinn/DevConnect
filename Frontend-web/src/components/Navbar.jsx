import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import axios from 'axios'
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)

  // console.log(user);
  const logoutHandler = async() => {
    try{
      await axios.post(BASE_URL+"/logout", {}, {withCredentials: true})
      dispatch(removeUser())
      navigate("/login")
    } catch (error) {
    }
  }

    return (
        <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevConnect</Link>
        </div>
        {user && (
          <div className="flex gap-2">
          {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
          <div className="dropdown dropdown-end mx-8">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="user profile picture"
                  src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li><Link to="/login" onClick={logoutHandler}>Logout</Link></li>
            </ul>
          </div>
        </div>
        )
          
        }
        
      </div>
    )
}

export default Navbar;