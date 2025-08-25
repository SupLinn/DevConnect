import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [skills, setSkills] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const loginHandler = async() => {
    try {
      const result = await axios.post(BASE_URL+"/login",{
        email,
        password
      },{withCredentials: true})
      
      dispatch(addUser(result.data))
      return navigate("/")

    } catch (error) {
      setError(error?.response?.data || "Something went wrong!!!");
      
    }
  }
  
  const signUpHandler = async () => {
    try {
        const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
        
        const result = await axios.post(BASE_URL+ "/signup", {
          firstName,
          lastName,
          email,
          password,
          age: parseInt(age),
          gender,
          skills: skillsArray
        }, {withCredentials: true})

        dispatch(addUser(result.data.data))
        navigate("/profile")
        
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!!!");
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className={`card bg-base-300 shadow-lg transition-all duration-300 ${isLogin ? 'w-96' : 'w-[600px]'}`}>
        <div className="card-body p-8">
          <h2 className="card-title text-3xl font-bold text-center mb-8 text-white">
            {isLogin ? "Welcome Back" : "Join DevTinder"}
          </h2>
          
          <div className="space-y-6">
            {/* Sign Up Only Fields */}
            {!isLogin && (
              <>
                {/* Name Fields - Side by Side */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300 font-medium">First Name *</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 bg-slate-700/50 border-slate-600 focus-within:border-blue-500 transition-colors">
                      <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      <input 
                        type="text" 
                        placeholder="John" 
                        required={!isLogin}
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                        className="grow bg-transparent text-white placeholder-gray-400"
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300 font-medium">Last Name</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 bg-slate-700/50 border-slate-600 focus-within:border-blue-500 transition-colors">
                      <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      <input 
                        type="text" 
                        placeholder="Doe" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                        className="grow bg-transparent text-white placeholder-gray-400"
                      />
                    </label>
                  </div>
                </div>

                {/* Age and Gender - Side by Side */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300 font-medium">Age *</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 bg-slate-700/50 border-slate-600 focus-within:border-blue-500 transition-colors">
                      <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      <input 
                        type="number" 
                        placeholder="25" 
                        required={!isLogin}
                        min="18"
                        max="100"
                        value={age} 
                        onChange={(e) => setAge(e.target.value)}
                        className="grow bg-transparent text-white placeholder-gray-400"
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300 font-medium">Gender *</span>
                    </label>
                    <select 
                      className="select select-bordered bg-slate-700/50 border-slate-600 focus:border-blue-500 text-white transition-colors" 
                      required={!isLogin}
                      value={gender} 
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="" disabled className="text-gray-400">Choose gender</option>
                      <option value="male" className="bg-slate-800">Male</option>
                      <option value="female" className="bg-slate-800">Female</option>
                      <option value="trans" className="bg-slate-800">Trans</option>
                    </select>
                  </div>
                </div>

                {/* Email - Full Width for Signup */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 font-medium">Email Address *</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 bg-slate-700/50 border-slate-600 focus-within:border-blue-500 transition-colors">
                    <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="grow bg-transparent text-white placeholder-gray-400"
                    />
                  </label>
                </div>

                {/* Password - Full Width for Signup */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 font-medium">Password *</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 bg-slate-700/50 border-slate-600 focus-within:border-blue-500 transition-colors">
                    <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/>
                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>
                    </svg>
                    <input
                      type="password"
                      required
                      placeholder="Enter strong password"
                      minLength="8"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="grow bg-transparent text-white placeholder-gray-400"
                    />
                  </label>
                  <label className="label">
                    <span className="label-text-alt text-gray-400 text-xs">
                      Must include uppercase, lowercase, number (8+ chars)
                    </span>
                  </label>
                </div>

                {/* Skills - Last Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 font-medium">Skills & Technologies *</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 bg-slate-700/50 border-slate-600 focus-within:border-blue-500 transition-colors">
                    <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                    <input 
                      type="text" 
                      placeholder="React, Node.js, Python, JavaScript..." 
                      required={!isLogin}
                      value={skills} 
                      onChange={(e) => setSkills(e.target.value)}
                      className="grow bg-transparent text-white placeholder-gray-400"
                    />
                  </label>
                  <label className="label">
                    <span className="label-text-alt text-gray-400 text-xs">
                      Separate multiple skills with commas
                    </span>
                  </label>
                </div>
              </>
            )}

            {/* Login Fields */}
            {isLogin && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 font-medium">Email Address</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 bg-slate-700/50 border-slate-600 focus-within:border-blue-500 transition-colors">
                    <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="grow bg-transparent text-white placeholder-gray-400"
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 font-medium">Password</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 bg-slate-700/50 border-slate-600 focus-within:border-blue-500 transition-colors">
                    <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/>
                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>
                    </svg>
                    <input
                      type="password"
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="grow bg-transparent text-white placeholder-gray-400"
                    />
                  </label>
                </div>
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="alert alert-error bg-red-500/20 border-red-500/50 text-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-8">
            <button 
              className={`btn btn-primary btn-lg text-white font-semibold transition-all duration-200 ${
                isLogin ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
              } border-none shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
              onClick={isLogin ? loginHandler : signUpHandler}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </div>

          {/* Toggle between Login and Signup */}
          <div className="divider my-6"></div>
          <div className="text-center">
            <p className="text-gray-400">
              {isLogin ? "New to DevTinder? " : "Already have an account? "}
              <button 
                type="button"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(""); // Clear errors when switching
                  // Clear form fields when switching
                  if (!isLogin) {
                    setFirstName("");
                    setLastName("");
                    setAge("");
                    setGender("");
                    setSkills("");
                  }
                  setEmail("");
                  setPassword("");
                }}
              >
                {isLogin ? "Create an account" : "Sign in instead"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login