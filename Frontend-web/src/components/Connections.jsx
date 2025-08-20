import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { User, Calendar, Users, MessageCircle, MoreHorizontal } from 'lucide-react';

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector((store) => store.connections)

  const fetchConnections = async () => {
    try{
        const result = await axios.get(BASE_URL+"/user/connections", {withCredentials: true})
        console.log(result.data.data);
        dispatch(addConnections(result.data.data))

    } catch (err){
        console.log ("error at fetchConnections: " + err.message);
    }
  }  

  useEffect(() => {
    fetchConnections();
  }, [])
  console.log (connections)

  if(!connections) return;

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-base-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16">
            <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No connections yet</h2>
            <p className="text-gray-500">Start connecting with people to see them here!</p>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Connections</h1>
          <p className="text-gray-400 text-lg">You have {connections.length} connection{connections.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Connections List */}
        <div className="space-y-4">
          {connections.map((connection, index) => (
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
                        {connection.photoUrl ? (
                          <img 
                            src={connection.photoUrl} 
                            alt={`${connection.firstName} ${connection.lastName}`}
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
                        {connection.firstName} {connection.lastName}
                      </h3>
                      {(connection.age || connection.gender) && (
                        <div className="flex items-center space-x-2 text-gray-400">
                          {connection.age && (
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-medium">{connection.age} years</span>
                            </div>
                          )}
                          {connection.gender && (
                            <>
                              {connection.age && <span className="text-gray-600">•</span>}
                              <span className="text-sm font-medium capitalize">{connection.gender}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* About section */}
                    {connection.about ? (
                      <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
                        {connection.about}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-base italic">
                        This is a default about of the user!
                      </p>
                    )}
                  </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl">
                    <MessageCircle className="h-5 w-5" />
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-gray-300 p-3 rounded-full transition-colors duration-200">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  )
}

export default Connections