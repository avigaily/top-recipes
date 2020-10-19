import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/global.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from './cmps/Header';
import Footer from './cmps/Footer';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import RecipeDetails from './pages/RecipeDetails'

function App() {
  return (
    <div className="app flex column">
      <Header  />
      <main>
      <Switch>
        <Route path="/search" component={SearchPage} />
        <Route path="/:id" component={RecipeDetails} />
        <Route path="/" component={Home} exact/>
      </Switch>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
