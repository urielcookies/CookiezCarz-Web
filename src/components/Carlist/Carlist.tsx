import { FC } from 'react';
import { isEmpty, isUndefined, reverse } from 'lodash';
import { useHistory, useParams } from 'react-router-dom';

import { Button } from '@material-ui/core';

import { CarlistTable, Row } from './CarlistTable';
import CarlistStyle from './CarlistStyle';
import PageLoad from '../PageLoad/PageLoad';

import useFetch from '../../hooks/useFetch';
import { fetchCars, fetchOtherUsersCars } from '../../endpoints';

const Carlist: FC = () => {
  const { push } = useHistory();
  const { userId } = useParams<ParamTypes>();

  const carListOwner = isUndefined(userId);
  const callback = carListOwner ? fetchCars : fetchOtherUsersCars;
  const carlist = useFetch(callback, userId);
  const carlistData = carlist.data as unknown as Row[];

  const path = ({ Id, UserAccountId }: Row) => {
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
          onClick={() => push('/home/mycarlist/addcar')}
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

interface ParamTypes {
  userId: string | undefined;
}

export default Carlist;
