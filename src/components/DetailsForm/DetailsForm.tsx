import {
  FC,
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
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
  const { replace } = useHistory();
  const location = useLocation<RouterCarStateLocation>();
  const { carInfoId, tab } = useParams<ParamTypes>();

  const tabs = ['info', 'expenses', 'data', 'status', 'images'];
  const [pageIndex, setPageIndex] = useState<number>(
    ['info', 'expenses', 'data', 'status', 'images'].indexOf(tab),
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

  useEffect(() => {
    location.state = {
      carState: {
        information: information.data,
        expenses: expenses.data,
        images: images.data,
        statuses: statuses.data,
        userHasWritePermissions: userHasWritePermissions.data,
      },
    };
  }, [information, expenses, images, statuses, userHasWritePermissions]);

  if (isLoading) return <PageLoad />;

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setPageIndex(newValue);
    const path = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
    window.history.pushState({}, '', `${path}/${tabs[newValue]}`);
  };

  const carData = {
    information: location.state.carState.information,
    expenses: location.state.carState.expenses,
    images: location.state.carState.images,
    statuses: location.state.carState.statuses,
    userHasWritePermissions: location.state.carState.userHasWritePermissions,
  };

  const updateCarStateRouter = (state: any, stateType: string) => {
    replace({
      state: {
        carState: {
          ...location.state.carState,
          [stateType]: state,
        },
      },
    });
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
            carInformation={carData.information}
            userHasWritePermissions={carData.userHasWritePermissions}
            updateCarStateRouter={updateCarStateRouter}
          />
        </TabPanel>
      )}
      {isEqual(pageIndex, 1) && (
        <TabPanel value={pageIndex} index={1}>
          <CarExpenses
            userHasWritePermissions={carData.userHasWritePermissions}
            expenses={carData.expenses}
            carId={carInfoId}
            setCarExpenses={noop}
            setIsCarExpensesLoading={noop}
            Cost={carData.information.Cost}
            isCarExpensesLoading={false}
          />
        </TabPanel>
      )}
      {isEqual(pageIndex, 2) && (
        <TabPanel value={pageIndex} index={2}>
          <CarEstimations cost={carData.information.Cost} expenses={carData.expenses} />
        </TabPanel>
      )}
      {isEqual(pageIndex, 3) && (
        <TabPanel value={pageIndex} index={3}>
          <Status
            {...statuses.data}
            userHasWritePermissions={carData.userHasWritePermissions}
            carExpenses={carData.expenses}
            carCost={carData.information.Cost}
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
            userHasWritePermissions={carData.userHasWritePermissions}
          />
        </TabPanel>
      )}
    </DetailFormStyle>
  );
};

interface ParamTypes {
  carInfoId: string;
  tab: string;
}

interface RouterCarStateLocation {
  carState: {
    information: CarInformation;
    expenses: CarExpense[];
    images: string[];
    statuses: CarStatus[];
    userHasWritePermissions: boolean;
  }
}

interface IsLoading {
  isLoading: boolean;
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
