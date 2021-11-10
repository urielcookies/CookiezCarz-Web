import {
  FC,
  ChangeEvent,
  useState,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  isEqual,
  isNull,
  noop,
} from 'lodash';

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

import { CarInformation, CarExpense, CarStatus } from './interfaces';

const DetailsForm: FC = () => {
  const activeUser = useActiveUser() as ActiveUser;
  const location = useLocation();
  const { carInfoId, tab } = useParams();

  const tabs = ['info', 'expenses', 'data', 'status', 'images'];
  const [pageIndex, setPageIndex] = useState<number>(
    ['info', 'expenses', 'data', 'status', 'images'].indexOf(tab || 'info'),
  );

  const information = useFetch(fetchCarInfo, carInfoId) as unknown as CarInformationFetch;
  const expenses = useFetch(fetchCarExpenses, carInfoId) as unknown as CarExpenseFetch;
  const images = useFetch(fetchCarImages, carInfoId) as unknown as CarImagesFetch;
  const statuses = useFetch(fetchCarStatus, carInfoId) as unknown as CarStatusFetch;
  const userHasWritePermissions = useFetch(fetchUserPermission, carInfoId) as unknown as PermFetch;

  const isLoading = information.isLoading
    || expenses.isLoading
    || images.isLoading
    || statuses.isLoading
    || userHasWritePermissions.isLoading
    || isNull(activeUser);

  if (isLoading) return <PageLoad />;

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setPageIndex(newValue);
    const path = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
    window.history.pushState({}, '', `${path}/${tabs[newValue]}`);
  };

  return (
    <DetailFormStyle>
      <AppBar id="appbar" position="static" color="default">
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
      {isEqual(pageIndex, 0) && (
        <TabPanel value={pageIndex} index={0}>
          <Information
            information={information}
            userHasWritePermissions={userHasWritePermissions.data}
          />
        </TabPanel>
      )}
      {isEqual(pageIndex, 1) && (
        <TabPanel value={pageIndex} index={1}>
          <CarExpenses
            userHasWritePermissions={userHasWritePermissions.data}
            expenses={expenses.data}
            carId={carInfoId}
            setCarExpenses={noop}
            setIsCarExpensesLoading={noop}
            Cost={information.data.Cost}
            isCarExpensesLoading={false}
          />
        </TabPanel>
      )}
      {isEqual(pageIndex, 2) && (
        <TabPanel value={pageIndex} index={2}>
          <CarEstimations cost={information.data.Cost} expenses={expenses.data} />
        </TabPanel>
      )}
      {isEqual(pageIndex, 3) && (
        <TabPanel value={pageIndex} index={3}>
          <Status
            {...statuses.data}
            userHasWritePermissions={userHasWritePermissions.data}
            carExpenses={expenses.data}
            carCost={information.data.Cost}
            CarInformationId={carInfoId}
            setIsCarStatusLoading={noop}
          />
        </TabPanel>
      )}
      {isEqual(pageIndex, 4) && (
        <TabPanel value={pageIndex} index={4}>
          <CarImages
            // carImages={images}
            // carId={carInfoId}
            // isImagesLoaded
            // setIsImagesLoaded={noop}
            userHasWritePermissions={userHasWritePermissions.data}
          />
        </TabPanel>
      )}
    </DetailFormStyle>
  );
};

interface IsLoading {
  isLoading: boolean;
  refetch: Function;
}

interface CarInformationFetch extends IsLoading {
  data: CarInformation;
}
interface CarExpenseFetch extends IsLoading {
  data: CarExpense[];
}

interface CarImagesFetch extends IsLoading {
  data: string[];
}

interface CarStatusFetch extends IsLoading {
  data: CarStatus[];
}

interface PermFetch extends IsLoading {
  data: boolean;
}

export default DetailsForm;
