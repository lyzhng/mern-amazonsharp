import React from 'react';
import { Route } from 'react-router-dom';
import Spinner from '../services/Spinner';

const PublicRoute = ({ component: Component, loading, ...rest }) => {
  return (
    <Route {...rest} render={props => {
        return (
            !loading 
            ? <Component {...props} />
            : <Spinner />
        )
    }} />
  )
}

export default PublicRoute;
