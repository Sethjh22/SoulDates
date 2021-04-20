import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth'
import Activities from './Components/Activities'
import Profile from './Components/Profile'
import Dislikes from './Components/Dislikes'
import CreateNewDate from './Components/CreateNewDate'

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/Activities' component={Activities}/>
        <Route path='/Profile' component={Profile}/>
        <Route path='/Dislikes' component={Dislikes}/>
        <Route path='/CreateNewDate' component={CreateNewDate}/>
    </Switch>
)