import { FC } from 'react';
import { isUndefined } from 'lodash';
import { useParams } from 'react-router-dom';

import CarlistStyle from './CarlistStyle';

import useFetch from '../../hooks/useFetch';
import { fetchCars, fetchOtherUsersCars } from '../../endpoints';

interface ParamTypes {
  userId: string | undefined;
}

const Carlist: FC = () => {
  const { userId } = useParams<ParamTypes>();
  const callback = isUndefined(userId) ? fetchCars : fetchOtherUsersCars;
  const carlist = useFetch(callback, userId);
  console.log(carlist);

  return (
    <CarlistStyle>
      carlist
    </CarlistStyle>
  );
};

export default Carlist;
