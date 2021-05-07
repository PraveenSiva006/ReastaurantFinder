import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import InputSuggestion from './InputSuggestion';
import data from './restaurants.json';
import searchData from './searchInputData.json'

const dummySearch = searchData.addresses.map(addr => addr.place)

function Home() {
    
    const [addrSuggestion, setAddrSuggestion] = useState(dummySearch)
    const [inputValue, setInputValue] = useState('')
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [nearByRestaurants, setNearByRestaurants] = useState(data.restaurants)
    
    const ref = useRef(null);

    useEffect(() => {
        if(inputValue){

            const tempSuggestion = []

            for (let i = 0; i < dummySearch.length; i++) {

                if (dummySearch[i].substr(0, inputValue.length).toUpperCase() == inputValue.toUpperCase()) {

                    tempSuggestion.push(dummySearch[i])

                }
            }

            setAddrSuggestion(tempSuggestion)
        
        }else{

            setAddrSuggestion(dummySearch)

        }

    }, [inputValue])
    
    const setInput = (e) => {

        setInputValue(e.target.dataset.value)
    }

    const inputBlurHandler = () =>{
        setTimeout(()=>{
            setShowSuggestion(false)
        },300)
    }

    const calculateDistance = () => {

        let searchPlaceLatLong =  searchData.addresses.find(addr=>{
            if(inputValue === addr.place){
                return addr.latlong
            }
        })
        
        if(!dummySearch.includes(inputValue)){
            setNearByRestaurants([])
            return 
        }

        const nearby = []

        const getDistanceFromLatLon = (lat1,lon1,lat2,lon2) => {
            var R = 6371; 
            var dLat = deg2rad(lat2-lat1); 
            var dLon = deg2rad(lon2-lon1); 
            var a = 
              Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
              Math.sin(dLon/2) * Math.sin(dLon/2)
              ; 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c;
            return d;
          }
          
        const deg2rad = deg => {
            return deg * (Math.PI/180)
        }
         
          
        data.restaurants.forEach(rest => {
            let lat1 = rest.latlng.lat
            let lng1 = rest.latlng.lng
            let lat2 = searchPlaceLatLong.latlong.lat
            let lng2 = searchPlaceLatLong.latlong.long

            if(getDistanceFromLatLon(lat1,lng1,lat2,lng2) <= 5){
                nearby.push(rest)
            }
        });

        setNearByRestaurants(nearby)
    }

    return (
        <div className = 'home'>
            
            <div className = 'home-container'>

                <h1>Find Restaurents</h1>

                <div className = 'inputContainer'>

                    <input 
                        type = 'text'
                        onChange = {(e) => setInputValue(e.target.value)} 
                        value = {inputValue}
                        placeholder = 'Search Nearby Restaurants ...'
                        ref = {ref}
                        onFocus = {() => setShowSuggestion(true)}
                        onBlur = {inputBlurHandler}
                    />
                    <button disabled = {!inputValue} onClick = {calculateDistance} >Search</button>

                    {showSuggestion && 
                        <InputSuggestion setInput = {setInput} suggestions = {addrSuggestion}/>
                    }

                </div>
                                
                <div className = 'restaurantCardContainer'>

                    {nearByRestaurants.length > 0 ?
                        nearByRestaurants.map(rest => 
                            <Link to = {`/${rest.id}`} key = {rest.id} className = 'restaurantCard'>
                                {rest.name}
                            </Link>
                        )
                        :

                        <div>No Restaurants Found Near U :(</div>
                    }

                </div>
            </div>
            
            
        </div>
    )
}

export default Home
