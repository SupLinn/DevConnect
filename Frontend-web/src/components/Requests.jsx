import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addRequests, removeRequest } from '../utils/requestSlice'
import { User, Clock, Users, Check, X } from 'lucide-react';

const Requests = () => {
    const dispatch = useDispatch();
    
    const pendingRequests = useSelector((store) => store.requests)

    const reviewReq = async (status, _id) => {
        try {
            const response = await axios.patch(BASE_URL+ "/request/review/" + status + "/" + _id, {}, {withCredentials:true})

            dispatch(removeRequest(_id))

        } catch (error) {
            console.log("Error while reviewReq: "+ error.message)
        }
    }

    const fetchRequests = async() => {
        try{
            const result = await axios.get(BASE_URL+ "/user/requests/received" , {withCredentials: true})
            console.log(result.data.data)

            dispatch(addRequests(result.data.data))
        } catch(err) {
            console.log ("Error in fetchReq: " + err.message)
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])


    if(!pendingRequests) return;

    if (pendingRequests.length === 0) {
        return (
            <div className="min-h-screen bg-base-100 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-20">
                        <Users className="mx-auto h-20 w-20 text-gray-500 mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">No pending requests</h2>
                        <p className="text-gray-400 text-lg">You're all caught up! No new connection requests.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-base-300 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Connection Requests</h1>
                    <p className="text-gray-400 text-lg">You have {pendingRequests.length} pending request{pendingRequests.length !== 1 ? 's' : ''}</p>
                </div>

                {/* Requests List */}
                <div className="space-y-4">
                    {pendingRequests.map((request, index) => {
                        const user = request.fromUserId;
                        return (
                            <div 
                                key={index} 
                                className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 hover:bg-slate-800/80 transition-all duration-300 border border-slate-700/50 group"
                            >
                                <div className="flex items-center justify-between">
                                    {/* Left side - Profile info */}
                                    <div className="flex items-center space-x-6">
                                        {/* Profile Image */}
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                                                <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                                                    {user.photoUrl ? (
                                                        <img 
                                                            src={user.photoUrl} 
                                                            alt={`${user.firstName} ${user.lastName}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-600 to-slate-700">
                                                            <User className="h-8 w-8 text-gray-300" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Profile Details */}
                                        <div className="flex-1">
                                            {/* Name and Age/Gender */}
                                            <div className="flex items-center space-x-3 mb-2">
                                            
                                                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                    {user.firstName} {user.lastName}
                                                </h3>
                                                {(user.age || user.gender) && (
                                                    <div className="flex items-center space-x-2 text-gray-400">
                                                        {user.age && (
                                                            <div className="flex items-center space-x-1">
                                                                <span className="text-sm font-medium">{user.age} years</span>
                                                            </div>
                                                        )}
                                                        {user.gender && (
                                                            <>
                                                                {user.age && <span className="text-gray-600">•</span>}
                                                                <span className="text-sm font-medium capitalize">{user.gender}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* About section */}
                                            {user.about ? (
                                                <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
                                                    {user.about}
                                                </p>
                                            ) : (
                                                <p className="text-gray-500 text-base italic">
                                                    This is a default about of the user!
                                                </p>
                                            )}
                                        
                                        </div>
                                    </div>

                                    {/* Right side - Action Buttons */}
                                    <div className="flex items-center space-x-3 opacity-100 ">
                                        <button 
                                            onClick={() => reviewReq("accepted", request._id)}
                                            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl group/btn"
                                            title="Accept Request"
                                        >
                                            <Check className="h-5 w-5" />
                                        </button>
                                        <button 
                                            onClick={() => reviewReq("rejected", request._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
                                            title="Ignore Request"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom spacing */}
                <div className="h-20"></div>
            </div>
        </div>
    )
}

export default Requests