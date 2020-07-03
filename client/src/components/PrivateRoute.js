import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Spinner from '../services/Spinner';

const PrivateRoute = ({ component: Component, loading, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route {...rest} render={props => (
      !loading && user
        ? <Component {...props} />
        : !loading && !user
        ? <Redirect to={{
          pathname: '/login',
          state: {
            referrer: '/product/new',
            type: 'private',
            seen: false,
          }
        }} />
        : <Spinner />
    )} />
  )
}

export default PrivateRoute;
