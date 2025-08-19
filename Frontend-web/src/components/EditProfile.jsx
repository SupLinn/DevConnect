import React, { useState } from 'react'
import FeedCard from './FeedCard';
import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const EditProfile = ({user}) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [gender, setGender] = useState(user.gender);
    const [age, setAge] = useState(user.age);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false)

    const UpdateProfileHandler = async() => {
        setError("")
        try {
            const result = await axios.patch(BASE_URL+"/profile/edit" ,{
                firstName,
                lastName,
                age,
                gender,
                photoUrl,
                about
            }, {withCredentials: true})

            dispatch(addUser(result?.data?.data))
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            },2000)
            

        } catch (error) {
            setError(error.response?.data)
        }
    }


  return (
    <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
                
                {/* Form Section */}
                <div className="w-full max-w-md">
                    <div className="bg-base-300 border border-base-300 rounded-box px-6 py-3 relative">
                        <div className="absolute -top-3 left-4 bg-base-300 px-2 text-sm font-medium">Edit Profile</div>

                        <div className="mt-2">
                            {/* First Name and Last Name side by side */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text">First Name</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className="input input-bordered w-full" 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)} 
                                    />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Last Name</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className="input input-bordered w-full" 
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)} 
                                    />
                                </div>
                            </div>

                            {/* Rest of the inputs */}
                            <div className="space-y-3">
                                <div>
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input 
                                        type="url" 
                                        className="input input-bordered w-full" 
                                        value={photoUrl} 
                                        onChange={(e) => setPhotoUrl(e.target.value)} 
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Gender</span>
                                        </label>
                                        <select className="select select-bordered w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Age</span>
                                        </label>
                                        <input 
                                            type="number" 
                                            className="input input-bordered w-full" 
                                            value={age} 
                                            onChange={(e) => setAge(e.target.value)} 
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">About</span>
                                    </label>
                                    <textarea 
                                        className="textarea textarea-bordered w-full h-32" 
                                        value={about} 
                                        onChange={(e) => setAbout(e.target.value)}
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center my-4 mb-3">
                            <button className="btn btn-primary" onClick={UpdateProfileHandler}>Save Profile</button>
                        </div>
                    </div>
                </div>
                
                
                
                <div className="w-full max-w-md my-1">
                    <FeedCard user={{firstName, lastName, age, gender, photoUrl, about}} />
                </div>
                
            </div>
        </div>
        {showToast && (
            <div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>Profile saved successfully</span>
            </div>
            </div>
        )}
    </div>
  )
}

export default EditProfile