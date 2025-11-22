import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFromUserFeed } from '../utils/feedSlice';
import { User, MapPin, Briefcase, X, Heart } from 'lucide-react';

const FeedCard = ({user}) => {
    // console.log(user)
    const {_id, firstName, lastName, age, gender, photoUrl, about, skills} = user;
    const dispatch = useDispatch();

    const HandleSendRequest = async (state, userId) => {
        try{
            const result = await axios.post(BASE_URL+ "/request/send/" + state + "/" + userId, {}, {withCredentials: true} );
            console.log(result.data);

            dispatch(removeFromUserFeed(userId))
        } catch (err) {
            console.log ("Error: " + err.message)
        }
    }

    return ( user &&(
        <div className="card bg-base-300 w-96 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700/50">
            {/* Profile Image */}
            <figure className="h-80 relative overflow-hidden">
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        alt={`${firstName} ${lastName}`}
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300" 
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                        <User className="h-20 w-20 text-gray-400" />
                    </div>
                )}
                
                {/* Gradient overlay for better text readability */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></div>
            </figure>

            <div className="card-body p-6 space-y-4">
                {/* Name and Basic Info */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="card-title text-2xl font-bold text-white">
                            {firstName} {lastName}
                        </h2>
                        
                    </div>
                    
                    {(age || gender) && (
                        <div className="flex items-center space-x-3 text-gray-400">
                            {age && (
                                <span className="text-sm font-medium">{age} years</span>
                            )}
                            {age && gender && (
                                <span className="text-gray-600">•</span>
                            )}
                            {gender && (
                                <span className="text-sm font-medium capitalize">{gender}</span>
                            )}
                        </div>
                    )}
                </div>

                {/* About Section */}
                {about && (
                    <div className="space-y-1">
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                            {about}
                        </p>
                    </div>
                )}

                {/* Skills Section */}
                {skills && skills.length > 0 && (
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Briefcase className="h-4 w-4 text-blue-400" />
                            <span className="text-sm font-medium text-gray-300">Skills</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.slice(0, 6).map((skill, index) => (
                                <span 
                                    key={index}
                                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                >
                                    {skill.trim()}
                                </span>
                            ))}
                            {skills.length > 6 && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
                                    +{skills.length - 6} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-slate-700/50">
                    <button 
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                        onClick={() => HandleSendRequest("ignored", _id)}
                    >
                        <X className="h-5 w-5" />
                        <span>Pass</span>
                    </button>
                    <button 
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                        onClick={() => HandleSendRequest("interested", _id)}
                    >
                        <Heart className="h-5 w-5" />
                        <span>Like</span>
                    </button>
                </div>
            </div>
        </div>
    ))  
}

export default FeedCard;