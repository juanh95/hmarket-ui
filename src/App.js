import React, {useState, useEffect} from 'react'
import './App.css';
import Home from './Home'
import Account from './Account'
import {
  Switch,
  Route,
  Link
} from "react-router-dom"

const App = () => {
  return(
    <Switch>
      <Route path="/register">
        <Account />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}

export default App;
