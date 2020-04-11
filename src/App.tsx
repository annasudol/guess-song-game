import { Route, Switch, Redirect } from 'react-router-dom';
import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import { AppRoutes } from './config/routes';
import { Login, Playlists, Game, Navigation, Summary, Scores } from './components/';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from './state/user/selectors';
import './App.css';
import Cookies from 'js-cookie';
import { fetchUserCookies } from './state/user/actions';

export const App: FunctionComponent = (): ReactElement => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = Cookies.getJSON('authenticatedUser');

  useEffect(() => {
    if (user && !token) {
      dispatch(fetchUserCookies(user));
    }
  }, [dispatch, user]);

  const routes = (
    <>
      <Navigation />
      <Switch>
        <Route path={AppRoutes.Game} component={Game} />
        <Route path={AppRoutes.Summary} component={Summary} />
        <Route path={AppRoutes.Scores} component={Scores} />
        <Route path={AppRoutes.Playlists} component={Playlists} />
        <Redirect to={AppRoutes.Playlists} />
      </Switch>
    </>
  );
  const auth = (
    <>
      <Route path={AppRoutes.Login} component={Login} exact />
      <Redirect to={AppRoutes.Login} />
    </>
  );
  return token ? routes : auth;
};
