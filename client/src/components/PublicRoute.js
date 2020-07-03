import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Spinner from '../services/Spinner';

const PublicRoute = ({ component: Component, loading, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route {...rest} render={props => (
      !loading 
        ? <Component {...props} />
        : Spinner
    )} />
  )
}

export default PublicRoute;
