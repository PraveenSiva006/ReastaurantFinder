import React from 'react'
import {  useParams } from 'react-router'

function RestaurantPage({data}) {
    const location = useParams()
    
    const restaurant = data.find(x=> x.id === Number(location.id))
   
    return (
        <div className = 'restaurant'>
            <img src = {require('./restaurantImg.jpg').default}/>
            
            <div>
                
                <h1>{restaurant.name}</h1>
                <p><span className = 'title'>Located At</span> -: {restaurant.address}</p>
                <p><span className = 'title'>Cuisine</span> -: {restaurant.cuisine_type}</p>
                <p className = 'title'>Restaurant Timing -:</p>
                <div className = 'timing'>
                    {Object.entries(restaurant.operating_hours).map(day =>
                        <p>{day[0]} : <span>{day[1]}</span></p>
                    )}
                </div>
                <div className = 'reviews'>
                        {restaurant.reviews.map(review=>
                            <div className = 'review' key = {review.name}>
                                <p className = 'reviewHead'>
                                    <span>{review.name}</span>
                                    <span>
                                        {review.rating} stars
                                    </span>
                                </p>
                                <p className = 'comments'>
                                    {review.comments}
                                </p>
                                <span>{review.date}</span>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default RestaurantPage
