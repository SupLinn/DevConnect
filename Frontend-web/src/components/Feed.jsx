import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import axios from 'axios'
import FeedCard from './FeedCard';

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


  return (
    feedData && (
      <div className="flex justify-center my-5">
        <FeedCard user={feedData[0]}/>
      </div>
    )
  )
}

export default Feed