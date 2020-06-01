import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  HomePage,
  AboutPage,
  ContactPage,
  NotFoundPage,
  ExplorePage,
  LoginPage,
  RegisterPage
} from './components/index';
import { UserContext } from './context/UserContext';

export default () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <Route exact path='/' component={HomePage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contact' component={ContactPage} />
          <Route exact path='/explore' component={ExplorePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
        </UserContext.Provider>
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}
