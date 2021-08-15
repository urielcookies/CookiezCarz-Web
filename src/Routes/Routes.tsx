import { FC, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { noop, toLower } from 'lodash';

import Navbar from '../components/Navbar/Navbar.js';
import AddCarForm from '../components/AddCarForm/AddCarForm';
import Carlist from '../components/Carlist/Carlist';
import DetailsForm from '../components/DetailsForm/DetailsForm';
import Home from '../components/Home/Home';
import LoginTSX from '../components/Login/Login';
import MobileFooterNavigation from '../components/MobileFooterNavigation/MobileFooterNavigation';
import Settings from '../components/Settings/Settings';
import Trip from '../components/Trip/Trip';

import withLoginAuthentication from './withLoginAuthentication';
import withContainerUI from './withContainerUI';

import PageLoad from '../components/PageLoad/PageLoad';

import { ActiveUser, useActiveUser, useActiveUserUpdate } from '../context/ActiveUserContext';
import { getCookie, fetchActiveUser } from '../endpoints/index';

const Routes: FC = () => {
  const activeUser = useActiveUser();
  const setActiveUserUpdate = useActiveUserUpdate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hasCookie = Boolean(getCookie('token'));

  useEffect(() => {
    // Need to re-render component for container div to fix itself
    noop();
  }, [activeUser]);

  useEffect(() => {
    const fetchUser = async () => {
      if (hasCookie) {
        setIsLoading(true);
        const response = await fetchActiveUser();
        setActiveUserUpdate(response.data as ActiveUser);
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const AppRoutes = (
    isLoading
      ? <PageLoad />
      : (
        <Switch>
          <Route exact path="/login" component={LoginTSX} />
          <Route exact path="/home" component={withLoginAuthentication(Home)} />
          <Route exact path="/home/mycarlist/addcar" component={withLoginAuthentication(AddCarForm)} />
          <Route exact path="/details/:id/:tab" component={withLoginAuthentication(DetailsForm)} />
          <Route exact path="/home/settings" component={withLoginAuthentication(Settings)} />
          <Route exact path="/home/:carlist" component={withLoginAuthentication(Carlist)} />
          <Route exact path="/home/:carlist/:userId" component={withLoginAuthentication(Carlist)} />
          <Route exact path="/home/:carlist/:userId/:carInfoId/:tab" component={withLoginAuthentication(DetailsForm)} />
          <Route exact path="/trip" component={Trip} />
          <Redirect from="/" to={`${hasCookie ? '/home' : '/login'}`} />
        </Switch>
      )
  );

  const Divider = hasCookie && <div style={{ height: '2vh' }} />;
  const MainContent = withContainerUI(AppRoutes);
  const isMobile = toLower(window.navigator.userAgent).match(/mobile/i);
  const Footer = hasCookie && isMobile && <MobileFooterNavigation />;
  return (
    <>
      <Navbar />
      {Divider}
      <MainContent />
      {Footer}
    </>
  );
};

export default Routes;
