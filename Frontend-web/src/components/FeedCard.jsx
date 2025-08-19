const FeedCard = ({user}) => {
    // console.log(user)
    const {firstName, lastName, age, gender, photoUrl, about, skills} = user;

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
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    ))
}

export default FeedCard;