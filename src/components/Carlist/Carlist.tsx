import { FC } from 'react';
import { isEmpty, isUndefined, reverse } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@material-ui/core';

import { CarlistTable, CarInformation } from './CarlistTable';
import CarlistStyle from './CarlistStyle';
import PageLoad from '../PageLoad/PageLoad';

import useFetch from '../../hooks/useFetch';
import { fetchCars, fetchOtherUsersCars } from '../../endpoints';

const Carlist: FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const carListOwner = isUndefined(userId);
  const callback = carListOwner ? fetchCars : fetchOtherUsersCars;
  const carlist = useFetch(callback, userId);
  const carlistData = carlist.data as unknown as CarInformation[];

  const path = ({ Id, UserAccountId }: CarInformation) => {
    const link = carListOwner ? 'mycarlist' : 'carlist';
    return `/home/${link}/${UserAccountId}/${Id}/info`;
  };

  if (carlist.isLoading) return <PageLoad />;

  return (
    <CarlistStyle>
      {carListOwner && (
        <Button
          className="add-car-btn"
          fullWidth
          color="primary"
          variant="outlined"
          onClick={() => navigate('/home/mycarlist/addcar')}
        >
          Add New Car
        </Button>
      )}
      <div className="divider" />
      {!isEmpty(carlistData) && (
        <div className={carListOwner ? 'carlist-tbl' : 'carlist-tbl-notowner'}>
          <CarlistTable rows={reverse(carlistData)} path={path} />
        </div>
      )}
    </CarlistStyle>
  );
};

export default Carlist;
