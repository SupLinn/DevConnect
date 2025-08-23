import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import axios from 'axios'
import FeedCard from './FeedCard';
import { Heart, Users, Sparkles } from 'lucide-react';

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed)
  console.log (feedData)

  const getFeed = async() => {
    if(feedData && feedData.length>0) return;
    try{
      const result = await axios.get(BASE_URL+"/user/feed", {withCredentials: true})
      dispatch(addFeed(result.data))
    } catch(err){
  
    }
  }

  useEffect(()=>{
    getFeed()
  }, [])

  if (!feedData || feedData.length === 0) {
    return (
      <div className="min-h-screen bg-base-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="relative mb-8">
              <Heart className="mx-auto h-20 w-20 text-pink-500 mb-2" />
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">No matches found</h2>
            <p className="text-gray-400 text-lg mb-6">
              We're looking for people who might be a great match for you!
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={getFeed}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full transition-colors duration-200 font-medium"
              >
                Refresh Feed
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    feedData && (
      <div className="flex justify-center my-5">
        <FeedCard user={feedData[0]}/>
      </div>
    )
  )
}

export default Feed