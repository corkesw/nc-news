import { Route, Switch } from 'react-router';
import './App.css';
import Articles from './Components/ContentView/Articles';
import Article from "./Components/ContentView/Article"
import Header from './Components/Header';
import Nav from './Components/Nav';
import Menu from './Components/Menu';
import { useState } from 'react';
import NoPage from './Components/ContentView/NoPage';
import {UserContext} from "./Contexts/User.js"
import Login from './Components/ContentView/Login';
import AddArticle from './Components/ContentView/AddArticle';

function App() {

  const [user, setUser] = useState(localStorage.loggedInUser)
  
  return (
    <UserContext.Provider value={{user, setUser}}>
    <div className="applayout">
      <div className="appheader" >
    <Header />
      </div>
      <div className="appmenu">
    <Menu />
    </div>
    <div className="appnav" >
    <Nav />
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
      <Route exact path="/add">
        <AddArticle />
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
