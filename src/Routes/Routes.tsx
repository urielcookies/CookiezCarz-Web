import { FC, useEffect, useState } from 'react';
import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import { noop, toLower } from 'lodash';

import Navbar from '../components/Navbar/Navbar.js';
import AddCarForm from '../components/AddCarForm/AddCarForm';
import Carlist from '../components/Carlist/Carlist';
import DetailsForm from '../components/DetailsForm/DetailsForm';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
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

  const HomeAuth = withLoginAuthentication(Home);
  const DetailsAuth = withLoginAuthentication(DetailsForm);
  const AddCarAuth = withLoginAuthentication(AddCarForm);
  const SettingsAuth = withLoginAuthentication(Settings);
  const CarlistAuth = withLoginAuthentication(Carlist);

  const AppRoutes = (
    isLoading
      ? <PageLoad />
      : (
        <ReactRoutes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomeAuth />} />
          <Route path="/details/:id/:tab" element={<DetailsAuth />} />
          <Route path="/home/mycarlist/addcar" element={<AddCarAuth />} />
          <Route path="/home/settings" element={<SettingsAuth />} />
          <Route path="/home/:carlist" element={<CarlistAuth />} />
          <Route path="/home/:carlist/:userId" element={<CarlistAuth />} />
          <Route path="/home/:carlist/:userId/:carInfoId/:tab" element={<DetailsAuth />} />
          <Route path="/trip" element={<Trip />} />
          <Route path="/" element={<Navigate to={hasCookie ? '/home' : '/login'} />} />
        </ReactRoutes>
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
