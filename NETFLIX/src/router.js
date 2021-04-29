import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom'

import Home from './pages/home'
import Login from './pages/login'
import Main from './pages/main'

export default function Routes (){
    return(
        <BrowserRouter>
            <Route path='/' exact component = {Home}/>
            <Route path='/login' component = {Login}/>
            <Route path='/main' component = {Main}/>
        </BrowserRouter>
    )

}