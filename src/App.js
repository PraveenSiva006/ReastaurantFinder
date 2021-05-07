import React from 'react'
import RestaurantPage from './RestaurantPage'
import './App.css'
import Home from './Home'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import data from './restaurants.json'

function App() {
    const restaurants = data.restaurants
    // console.log(data.restaurants)
    return (
        <Router>
            <Switch>
                <Route path = '/:id'>
                    <RestaurantPage data = {restaurants}/>
                </Route>
                <Route path = '/'>
                    <Home data = {restaurants}/>
                </Route>
                
            </Switch>
        </Router>
    )
}

export default App
