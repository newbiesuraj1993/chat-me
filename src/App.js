import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

 import { AuthProvider } from "../src/context/authcontext"

import Chats from "./components/chats/chats"
import Login from "./components/Login/login.component"

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
     <AuthProvider>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/chats" component={Chats} />
          </Switch>
          </AuthProvider>
      </Router>
    </div>
  )
}

export default App