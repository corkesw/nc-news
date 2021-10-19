import { Route, Switch } from 'react-router';
import './App.css';
import Articles from './Components/ContentView/Articles';
import Article from "./Components/ContentView/Article"
import Header from './Components/Header';
import Nav from './Components/Nav';
import Menu from './Components/ContentView/Menu';
import { useState } from 'react';

function App() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div>
    <Header setMenuOpen={setMenuOpen}/>
    <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
    <Nav />
    <Switch>
      <Route exact path={["/", "/articles/:search"]}>
        <Articles />
      </Route>
      <Route exact path ="/article/:article_id">
        <Article />
      </Route>
    </Switch>
    </div>
  );
}

export default App;
