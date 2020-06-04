import React, { useState } from 'react';
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

export default () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/about' component={AboutPage} />
          <Route exact path='/contact' component={ContactPage} />
          <Route exact path='/explore' component={ExplorePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/profile/:username' component={Profile} />
          <Route exact path='/product/new' component={PostItemPage} />
          <Route exact path='/product/:id' component={HomePage} />
          <Route exact path='/not-found' component={NotFoundPage} />
          <Route exact path='*'>
            <Redirect to='/not-found' />
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  )
}
