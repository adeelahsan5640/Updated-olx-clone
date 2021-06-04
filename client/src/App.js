import React from 'react';
import NavBar from './components/Navbar/Navbar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { UppAd } from './components/UppAd';
import Footer from './components/Footer';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <NavBar />
            <UppAd />
            <Switch>
                <Route path="/" exact component={() => <Redirect to="/posts" />} />
                <Route path="/posts" exact component={Home} />
                <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;