import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {
  HomePage,
  AboutPage,
  ContactPage,
  NotFoundPage,
  ExplorePage,
  LoginPage,
  RegisterPage,
  PostItemPage,
  Profile
} from './components';
import { UserContext } from './context/UserContext';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/profiles/user-data')
      .then(res => {
        const { username } = res.data;
        setUser(username);
        setLoading(false);
      });
    }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <PublicRoute exact path='/' loading={loading} component={HomePage} />
          <PublicRoute exact path='/about' loading={loading} component={AboutPage} />
          <PublicRoute exact path='/contact' loading={loading} component={ContactPage} />
          <PublicRoute exact path='/explore' loading={loading} component={ExplorePage} />
          <PublicRoute exact path='/login' loading={loading} component={LoginPage} />
          <PublicRoute exact path='/register' loading={loading} component={RegisterPage} />
          <PublicRoute exact path='/profile/:username' loading={loading} component={Profile} />
          <PrivateRoute exact path='/product/new' loading={loading} component={PostItemPage} />
          <PublicRoute exact path='/product/:id' loading={loading} component={HomePage} />
          <PublicRoute exact path='/not-found' loading={loading} component={NotFoundPage} />
          <PublicRoute exact path='*'>
            <Redirect to='/not-found' />
          </PublicRoute>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App;
