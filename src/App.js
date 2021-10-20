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

function App() {

  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState('jessjelly')

  return (
    <UserContext.Provider value={{user, setUser}}>
    <div>
    <Header setMenuOpen={setMenuOpen}/>
    <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <Nav />
    <Switch>
      <Route exact path={["/", "/articles/:topic"]}>
        <Articles />
      </Route>
      <Route exact path ="/article/:article_id">
        <Article />
      </Route>
      <Route path ="/*">
        <NoPage />
      </Route>
    </Switch>
    </div>
    </UserContext.Provider>
  );
}

export default App;
