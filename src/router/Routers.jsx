import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../page/Home'
import Login from '../page/Login'
import Register from '../page/Register'
import SearchResultList from '../page/SearchResultList'
import ThankYou from '../page/ThankYou'
import TourDetails from '../page/TourDetails'
import Tours from '../page/Tours'


const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/search' element={<SearchResultList />} />
            <Route path='/tours/:id' element={<TourDetails />} />
            <Route path='/tours' element={<Tours />} />
            <Route path='/thank-you' element={<ThankYou />} />
        </Routes>
    )
}

export default Routers