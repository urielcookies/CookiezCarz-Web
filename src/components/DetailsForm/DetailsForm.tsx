import React, { useState } from 'react';
import { isUndefined, noop } from 'lodash';
import { useLocation, useParams } from 'react-router-dom';

import { AppBar, Tab, Tabs } from '@material-ui/core';

import Information from './Information/Information';
import CarExpenses from './CarExpenses/CarExpenses';
import CarEstimations from './CarEstimations/CarEstimations';
import Status from './Status/Status';
import CarImages from './CarImages/CarImages';
import PageLoad from '../PageLoad/PageLoad';
import DetailFormStyle from './DetailFormStyle';
import TabPanel from './TabPanel';

import useFetch from '../../hooks/useFetch';
import { ActiveUser, useActiveUser } from '../../context/ActiveUserContext';

import {
  fetchCarInfo,
  fetchCarExpenses,
  fetchCarImages,
  fetchCarStatus,
  fetchUserPermission,
} from '../../endpoints';

const DetailsForm = () => {
  const activeUser = useActiveUser() as ActiveUser;
  const { pathname, state: informationRouterState } = useLocation<CarInformation>();
  const { carInfoId, tab } = useParams<ParamTypes>();

  const tabs = ['info', 'expenses', 'data', 'status', 'images'];
  const [pageIndex, setPageIndex] = useState<number>(
    ['info', 'expenses', 'data', 'pics', 'status'].indexOf(tab),
  );

  const callback = isUndefined(informationRouterState) ? fetchCarInfo : null;
  const fetchedInformation = useFetch(callback, carInfoId);
  const information = isUndefined(informationRouterState)
    ? fetchedInformation.data as unknown as CarInformation
    : informationRouterState;
  const expenses = useFetch(fetchCarExpenses, carInfoId);
  const images = useFetch(fetchCarImages, carInfoId);
  const statuses = useFetch(fetchCarStatus, carInfoId);
  const userHasWritePermissions = useFetch(fetchUserPermission, carInfoId);

  const isLoading = isUndefined(informationRouterState) ? fetchedInformation.isLoading : false
    && expenses.isLoading
    && images.isLoading
    && statuses.isLoading
    && userHasWritePermissions.isLoading;

  if (isLoading) return <PageLoad />;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setPageIndex(newValue);
    const path = pathname.substring(0, pathname.lastIndexOf('/'));
    window.history.pushState({}, '', `${path}/${tabs[newValue]}`);
  };

  return (
    <DetailFormStyle>
      <AppBar position="static" color="default">
        <Tabs
          value={pageIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Info" />
          <Tab label="Expenses" />
          <Tab label="Data" />
          <Tab label="Images" />
          <Tab label="Status" />
        </Tabs>
      </AppBar>
      <TabPanel value={pageIndex} index={0}>
        <Information
          {...information}
          edit={false}
          activeUserId={activeUser.Id}
          isCarInfoLoading={false}
          userHasWritePermissions={userHasWritePermissions.data}
          setIsCarInfoLoading={noop}
          carId={carInfoId}
        />
      </TabPanel>
      <TabPanel value={pageIndex} index={1}>
        <CarExpenses
          userHasWritePermissions={userHasWritePermissions.data}
          expenses={expenses.data}
          carId={carInfoId}
          setCarExpenses={noop}
          setIsCarExpensesLoading={noop}
          Cost={information.Cost}
          isCarExpensesLoading={false}
        />
      </TabPanel>
      <TabPanel value={pageIndex} index={2}>
        <CarEstimations cost={information.Cost} expenses={expenses.data} />
      </TabPanel>
      <TabPanel value={pageIndex} index={3}>
        <Status
          {...statuses.data}
          userHasWritePermissions={userHasWritePermissions.data}
          carExpenses={expenses.data}
          carCost={information.Cost}
          CarInformationId={carInfoId}
          setIsCarStatusLoading={noop}
        />
      </TabPanel>
      <TabPanel value={pageIndex} index={4}>
        <CarImages
          // carImages={images}
          // carId={carInfoId}
          // isImagesLoaded
          // setIsImagesLoaded={noop}
          userHasWritePermissions={userHasWritePermissions.data}
        />
      </TabPanel>
    </DetailFormStyle>
  );
};

interface ParamTypes {
  carInfoId: string;
  tab: string;
}

interface CarInformation {
  Id: number;
  Brand: string;
  Cost: number;
  Model: string;
  UserAccountId: number;
  Year: string;
}

export default DetailsForm;