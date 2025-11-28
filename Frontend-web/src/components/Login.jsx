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
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Image: Minimalist, high-end dark abstract architecture.
  const coverImageUrl = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setError("");
    if (isLogin) { 
      setFirstName("");
      setLastName("");
      setAge("");
      setGender("");
      setSkills("");
    }
    setEmail("");
    setPassword("");
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await axios.post(BASE_URL + "/login", { email, password }, { withCredentials: true })
      dispatch(addUser(result.data))
      return navigate("/")
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!!!");
    }
  }

  const signUpHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
      const result = await axios.post(BASE_URL + "/signup", {
        firstName, lastName, email, password, age: parseInt(age), gender, skills: skillsArray
      }, { withCredentials: true })
      dispatch(addUser(result.data.data))
      navigate("/profile")
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!!!");
    }
  }

  return (
    <div className="min-h-screen flex bg-[#0B1120] font-sans text-slate-200">
      
      {/* 1. Left Side - Premium Hero Section */}
      <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden bg-slate-950">
        <img 
          src={coverImageUrl} 
          alt="Abstract architecture" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay grayscale-[20%]"
        />
        {/* Stronger gradient for better text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent"></div>
        
        {/* REPLACED LOGO: Modern Typographic Brand */}
        <div className="absolute top-10 left-10 z-20">
           <h1 className="text-3xl font-bold text-white tracking-wide font-mono">
              DevConnect<span className="text-blue-500">.</span>
           </h1>
        </div>

        {/* Bottom Text */}
        <div className="relative z-10 p-16 flex flex-col justify-end h-full">
          <div className="mb-6 space-y-4">
            <h2 className="text-5xl font-extrabold text-white leading-tight tracking-tight">
              Scale your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">network.</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md">
              The premier platform for engineering talent to connect, collaborate, and build the future.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Right Side - Precision Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 overflow-y-auto bg-[#0B1120]">
        <div className="w-full max-w-[380px] space-y-8">
          
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
             <h1 className="text-2xl font-bold text-white tracking-wide font-mono">
                DevConnect<span className="text-blue-500">.</span>
             </h1>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-slate-400 text-sm">
              {isLogin ? "Enter your credentials to access your workspace." : "Enter your details to get started."}
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-500/10 border-l-2 border-red-500 rounded-r-md p-3">
              <span className="text-xs text-red-200 font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={isLogin ? loginHandler : signUpHandler} className="space-y-5">
            
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput label="First Name" placeholder="John" value={firstName} onChange={setFirstName} required={!isLogin} />
                  <FormInput label="Last Name" placeholder="Doe" value={lastName} onChange={setLastName} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormInput label="Age" type="number" placeholder="25" value={age} onChange={setAge} required={!isLogin} />
                  
                  {/* Styled Select */}
                  <div className="w-full">
                    <label className="block mb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Gender <span className="text-blue-500">*</span>
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full bg-[#1e293b] border border-slate-700 text-slate-200 text-sm rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all appearance-none cursor-pointer hover:border-slate-600"
                        required={!isLogin}
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="" disabled>Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="trans">Trans</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            <FormInput label="Email" type="email" placeholder="name@company.com" value={email} onChange={setEmail} required />
            
            <div>
              <FormInput 
                 label="Password" 
                 type="password" 
                 placeholder="••••••••" 
                 value={password} 
                 onChange={setPassword} 
                 required 
              />
            </div>

            {!isLogin && (
              <FormInput 
                label="Skills" 
                placeholder="React, Node.js, AWS" 
                value={skills} 
                onChange={setSkills} 
                required={!isLogin} 
              />
            )}

            <button 
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-900/50 font-medium rounded-md text-sm px-5 py-3 text-center transition-all duration-200 mt-6 shadow-lg shadow-blue-500/20"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="pt-4 text-center">
            <p className="text-sm text-slate-500">
              {isLogin ? "New here? " : "Already have an account? "}
              <button 
                type="button"
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                onClick={handleSwitch}
              >
                {isLogin ? "Create account" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable Input Component - Refined for precision
const FormInput = ({ label, type = "text", placeholder, value, onChange, required }) => (
  <div className="w-full">
    <label className="block mb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
      {label} {required && <span className="text-blue-500">*</span>}
    </label>
    <input 
      type={type} 
      className="bg-[#1e293b] border border-slate-700 text-slate-200 text-sm rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 outline-none transition-all placeholder-slate-600 hover:border-slate-600 focus:bg-[#1e293b]" 
      placeholder={placeholder} 
      required={required} 
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default Login