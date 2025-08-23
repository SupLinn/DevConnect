import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFromUserFeed } from '../utils/feedSlice';

const FeedCard = ({user}) => {
    // console.log(user)
    const {_id, firstName, lastName, age, gender, photoUrl, about, skills} = user;
    const dispatch = useDispatch();

    const HandleSendRequest = async (state, userId) => {
        try{
            const result = await axios.post(BASE_URL+ "/request/send/" + state + "/" + userId, {}, {withCredentials: true} )

            dispatch(removeFromUserFeed(userId))
        } catch (err) {
            console.log ("Error: " + err.message)
        }
    }

    return ( user &&(
        <div className="card bg-base-300 w-96 shadow-sm my-0">
            <figure className="h-64">
                <img
                src={photoUrl}
                alt="photo"
                className="w-full h-full object-cover object-center" />
            </figure>
            <div className="card-body mb-0 my-">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender &&<p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-2">
                <button className="btn btn-primary" onClick={() => HandleSendRequest("ignored", _id)}>Ignore</button>
                <button className="btn btn-secondary" onClick={() => HandleSendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    ))
}

export default FeedCard;