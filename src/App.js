import { Route, Switch } from 'react-router';
import './App.css';
import Articles from './Components/ContentView/Articles';
import Article from "./Components/ContentView/Article"
import Header from './Components/Header';
import Nav from './Components/Nav';
import Menu from './Components/ContentView/Menu';
import { useState } from 'react';
import NoPage from './Components/ContentView/NoPage';
import {UserContext} from "./Contexts/User.js"
import Login from './Components/ContentView/Login';

function App() {

  const [user, setUser] = useState(localStorage.loggedInUser)
  const [menuOpen, setMenuOpen] = useState(false)
  
  return (
    <UserContext.Provider value={{user, setUser}}>
    <div className="applayout">
      <div className="appheader" >
    <Header setMenuOpen={setMenuOpen}/>
      </div>
      <div className="appmenu">
    <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
    <div className="appnav" >
    <Nav/>
    </div>
    <div className="appmain">
    <Switch>
      <Route exact path={["/", "/articles/:topic"]}>
        <Articles />
      </Route>
      <Route exact path ="/article/:article_id">
        <Article />
      </Route>
      <Route exact path ="/login">
        <Login />
      </Route>
      <Route path ="/*">
        <NoPage />
      </Route>
    </Switch>
    </div>
    </div>
    </UserContext.Provider>
  );
}

export default App;
