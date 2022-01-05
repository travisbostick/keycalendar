import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AccountPage from './pages/AccountPage';
import CalendarPage from './pages/CalendarPage';
import ConfirmPage from './pages/ConfirmPage';
import CreateHousePage from './pages/CreateHousePage';
import HouseDetailsPage from './pages/HouseDetailsPage';
import InvitePage from './pages/InvitePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import NamePage from './pages/NamePage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import ForgotPassword from './pages/ForgotPassword';
import { HouseUsersPage } from './pages/HouseUsersPage';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/name' component={NamePage} />
        <Route exact path='/my-account' component={AccountPage} />
        <Route
          exact
          path='/confirm/:token'
          render={props => {
            const token = props.match.params.token;
            return <ConfirmPage token={token} />;
          }}
        />
        <Route
          exact
          path='/change-password/:token'
          render={props => {
            const token = props.match.params.token;
            return <ForgotPassword token={token} />;
          }}
        />
        <Route
          exact
          path='/invite/:token'
          render={props => {
            const token = props.match.params.token;
            return <InvitePage token={token} />;
          }}
        />
        <Route
          path='/calendar/:id'
          render={props => {
            const houseId = props.match.params.id;
            if (houseId) {
              return <CalendarPage {...props} houseId={houseId} />;
            }
            return <Redirect to='/' />;
          }}
        />
        <Route
          path='/house-details/:id'
          render={props => {
            const houseId = props.match.params.id;
            if (houseId) {
              return <HouseDetailsPage {...props} houseId={houseId} />;
            }
            return <Redirect to='/' />;
          }}
        />
        <Route
          path='/house-users/:id'
          render={props => {
            const houseId = props.match.params.id;
            if (houseId) {
              return <HouseUsersPage {...props} houseId={houseId} />;
            }
            return <Redirect to='/' />;
          }}
        />
        <Route exact path='/user' component={UserPage} />
        <Route exact path='/createHouse' component={CreateHousePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
