import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../endpoints/index';

const withLoginAuthentication = (Component: ComponentType) => (ComponentProps: any) => (
  !getCookie('token')
    ? <Navigate to="/login" />
    : <Component {...ComponentProps} />
);

export default withLoginAuthentication;
