

import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import { useStateValue } from './components/StateProvider';


function App() {
  //const [user,setUser]= useState(null)
  const [ { user }, dispatch]=useStateValue()

  return (
    <div className="app">
      {!user ? <Login/> :(
      <div className="app_body">
        <Router>
          <Sidebar />
          <Switch>
            <Route exact path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route exact path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
            
      </div>
      )}
    </div>
  );
}

export default App;
