import { Route, Switch } from 'react-router';
import './App.css';
import Articles from './Components/ContentView/Articles';
import Article from "./Components/ContentView/Article"
import Header from './Components/Header';
import Nav from './Components/Nav';

function App() {
  return (
    <div>
    <Header />
    <Nav />
    <Switch>
      <Route exact path="/">
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
