import { FC } from 'react';
import { isEmpty, isUndefined } from 'lodash';
import { useParams } from 'react-router-dom';

import { CarlistTable, ParamTypes } from './CarlistTable';
import CarlistStyle from './CarlistStyle';

import useFetch from '../../hooks/useFetch';
import { fetchCars, fetchOtherUsersCars } from '../../endpoints';

const Carlist: FC = () => {
  const { userId } = useParams<ParamTypes>();
  const callback = isUndefined(userId) ? fetchCars : fetchOtherUsersCars;
  const carlist = useFetch(callback, userId);
  const rows = carlist.data;

  return (
    <CarlistStyle>
      {!isEmpty(rows) && <CarlistTable rows={rows} userId={userId} />}
    </CarlistStyle>
  );
};

export default Carlist;
