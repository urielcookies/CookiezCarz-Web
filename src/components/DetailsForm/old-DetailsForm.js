import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Dimmer, Loader, Tab, Header, Container, Divider } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import Information from './Information/Information';
import CarImages from './CarImages/CarImages';
import CarExpenses from './CarExpenses/CarExpenses';
import CarEstimations from './CarEstimations/CarEstimations';
import Status from './Status/Status';

import {
	fetchCarExpenses,
	fetchCarInfo,
	fetchOtherCarInfo,
	fetchCarImages,
	fetchCarStatus,
	fetchUserPermission
} from '../../endpoints';

const DetailsForm = (props) => {
	const {
		activeUser,
		activeUser: { Id },
		match: { params: { carInfoId, carlist, tab } },
		history: { location: { pathname } }
	} = props;

	const [activeIndexTab, setActiveIndexTab] = useState(() =>
		['info', 'expenses', 'data', 'pics', 'status'].indexOf(tab)
	);

	const [isCarInfoLoading, setIsCarInfoLoading] = useState(true);
	const [isCarExpensesLoading, setIsCarExpensesLoading] = useState(true);
	const [isImagesLoaded, setIsImagesLoaded] = useState(true);
	const [isCarStatusLoading, setIsCarStatusLoading] = useState(true);
	const [isUserPermissionsLoaded, setIsUserPermissionsLoaded] = useState(true);

	const [carInfo, setCarInfo] = useState({});
	const [carExpenses, setCarExpenses] = useState([]);
	const [carImages, setCarImages] = useState([]);
	const [carStatus, setCarStatus] = useState({});
	const [userHasWritePermissions, setUserHasWritePermissions] = useState(false);
	const [up, goUp] = useState(false);

	useEffect(() => {
		if (carlist === 'mycarlist')
			fetchCarInfo({ carInfoId, isCarInfoLoading, setIsCarInfoLoading, setCarInfo });
		else
			fetchOtherCarInfo({ carInfoId, isCarInfoLoading, setIsCarInfoLoading, setCarInfo });

		fetchCarExpenses({ carInfoId, isCarExpensesLoading, setIsCarExpensesLoading, setCarExpenses });
		fetchCarImages({ carInfoId, isImagesLoaded, setIsImagesLoaded, setCarImages });
		fetchCarStatus({ carInfoId, isCarStatusLoading, setIsCarStatusLoading, setCarStatus });
		fetchUserPermission({ carInfoId, isUserPermissionsLoaded, setIsUserPermissionsLoaded, setUserHasWritePermissions });
	}, [isCarInfoLoading, isCarExpensesLoading, isCarStatusLoading, carlist, carInfoId, isImagesLoaded, isUserPermissionsLoaded]); // All loading that updates need to be here

	if (!up) {
		goUp(true);
		window.scrollTo(0, 0);
	}

	if (isEmpty(carInfo) || isEmpty(carStatus) || !activeUser) {
		return (
			<div>
				<Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
			</div>
		);
	}

	// TODO FIX ERROR HERE
	// Fix when non owner with permissions to edit tries to update sold
	const panes = [
		{
			menuItem: 'Info',
			render: () =>
				<Tab.Pane>
					<Information
						{...carInfo}
						edit
						activeUserId={Id}
						isCarInfoLoading={isCarInfoLoading}
						userHasWritePermissions={userHasWritePermissions}
						setIsCarInfoLoading={setIsCarInfoLoading}
						carId={carInfoId} />
				</Tab.Pane>
		},
		{
			menuItem: 'Expenses',
			render: () =>
				<Tab.Pane>
					<CarExpenses
						userHasWritePermissions={userHasWritePermissions}
						expenses={carExpenses}
						carId={carInfoId}
						setCarExpenses={setCarExpenses}
						setIsCarExpensesLoading={setIsCarExpensesLoading}
						Cost={carInfo.Cost}
						isCarExpensesLoading={isCarExpensesLoading} />
				</Tab.Pane>
		},
		{
			menuItem: 'Data',
			render: () =>
				<Tab.Pane>
					<CarEstimations cost={carInfo.Cost} expenses={carExpenses} />
				</Tab.Pane>
		},
		{
			menuItem: 'Pics',
			render: () =>
				<Tab.Pane>
					<CarImages
						carImages={carImages}
						carId={carInfoId}
						isImagesLoaded={isImagesLoaded}
						setIsImagesLoaded={setIsImagesLoaded}
						userHasWritePermissions={userHasWritePermissions} />
				</Tab.Pane>
		},
	];

	// if (!isEmpty(carImages)) {
	// 	panes.push({
	// 		menuItem: 'Pics', render: () =>
	// 			<Tab.Pane>
	// 				<CarImages
	// 					carImages={carImages}
	// 					carId={carInfoId}
	// 					setIsImagesLoaded={setIsImagesLoaded} />
	// 			</Tab.Pane>
	// 	});
	// }

	panes.push({
		menuItem: 'Status',
		render: () =>
			<Tab.Pane>
				<Status
					{...carStatus}
					userHasWritePermissions={userHasWritePermissions}
					carExpenses={carExpenses}
					carCost={carInfo.Cost}
					CarInformationId={carInfoId}
					setIsCarStatusLoading={setIsCarStatusLoading} />
			</Tab.Pane>
	});

	const tabs = ['info', 'expenses', 'data', 'pics', 'status'];
	const tabOnChange = (e, data) => {
		if (activeIndexTab !== data.activeIndex) {
			const path = pathname
				.substring(0, pathname.lastIndexOf('/'));
			setActiveIndexTab(data.activeIndex);
			window.history.pushState({}, null, `${path}/${tabs[data.activeIndex]}`);
		}
	};

	return (
		<div>
			<Container textAlign="center">
				<Header as='h2'>
					{carInfo.Year} {carInfo.Brand} {carInfo.Model}
				</Header>
			</Container>
			<Divider />
			<Tab id="tabs" onTabChange={tabOnChange} activeIndex={activeIndexTab} panes={panes} />
		</div>
	);
};

DetailsForm.propTypes = {
	// parent
	activeUser: PropTypes.shape({
		Id: PropTypes.number,
	}),
	match: PropTypes.shape({
		params: PropTypes.shape({
			carInfoId: PropTypes.string,
			carlist: PropTypes.string,
			tab: PropTypes.string
		}),
	}),
	history: PropTypes.shape({
		location: PropTypes.shape({
			pathname: PropTypes.string,
		}),
	})
};

DetailsForm.defaultProps = {
	activeUser: {},
	match: {},
	history: {}
};

export default withRouter(DetailsForm);
