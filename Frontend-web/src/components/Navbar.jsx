import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import axios from 'axios'
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)

  // 1. Helper function to close the dropdown
  const closeMenu = () => {
    const elem = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  const logoutHandler = async() => {
    try{
      await axios.post(BASE_URL+"/logout", {}, {withCredentials: true})
      dispatch(removeUser())
      closeMenu(); // Close menu on logout too
      return navigate("/login")
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="navbar bg-[#0f172a] border-b border-slate-800 text-slate-200 sticky top-0 z-50 h-16 px-4 md:px-8">
      
      {/* --- Left Side: Logo --- */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">DevConnect</span>
        </Link>
      </div>

      {/* --- Right Side: User Actions --- */}
      {user && (
        <div className="flex items-center gap-4">
          
          <span className="hidden md:block text-sm font-medium text-slate-400">
             Welcome, <span className="text-slate-200">{user.firstName}</span>
          </span>

          <div className="dropdown dropdown-end">
            <div 
                tabIndex={0} 
                role="button" 
                className="btn btn-ghost btn-circle avatar ring-2 ring-slate-700 hover:ring-blue-500 transition-all ml-2"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user profile"
                  src={user.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                  className="object-cover"
                />
              </div>
            </div>
            
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-slate-800 border border-slate-700 rounded-lg z-[1] mt-3 w-56 p-2 shadow-xl"
            >
              <li className="menu-title text-slate-400 px-4 py-2 border-b border-slate-700/50 mb-1">
                 Account
              </li>

              {/* 2. Add onClick={closeMenu} to every Link */}
              <li>
                <Link to="/profile" onClick={closeMenu} className="flex justify-between py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 active:bg-blue-600 rounded-md">
                  Profile
                  <span className="badge badge-sm bg-blue-600 text-white border-none">New</span>
                </Link>
              </li>
              <li>
                  <Link to="/connections" onClick={closeMenu} className="py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 active:bg-blue-600 rounded-md">
                      Connections
                  </Link>
              </li>
              <li>
                  <Link to="/requests" onClick={closeMenu} className="py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 active:bg-blue-600 rounded-md">
                      Requests
                  </Link>
              </li>
              <li>
                  <Link to="/premium" onClick={closeMenu} className="py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 active:bg-blue-600 rounded-md">
                      Premium
                  </Link>
              </li>
              
              <div className="divider my-1 border-slate-700/50"></div>
              
              <li>
                  <button 
                      onClick={logoutHandler}
                      className="text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-md py-2"
                  >
                      Logout
                  </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar;