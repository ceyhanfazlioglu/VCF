import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * T20: ProtectedRoute
 * Kullanıcı giriş yapmamışsa Login'e yönlendirir.
 * React Router 5 pattern.
 */
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.client.user);
  const isAuthenticated = user && user.email;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    />
  );
};

export default ProtectedRoute;