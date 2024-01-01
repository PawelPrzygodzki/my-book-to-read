import React, {FC} from 'react';
import {Navigate} from 'react-router-dom';
import useAuthToken from '../../hooks/useAuthToken';
import ROUTES from '../../app/routes';

type Props = {
    children: React.ReactElement
};
const ProtectedRoute: FC<Props> = ({
                                       children,
                                   }) => {
    const isTokenValid = useAuthToken();

    if (!isTokenValid) {
        return <Navigate data-testid="redirect" to={ROUTES.LOGIN}/>;
    }

    return children;
};

export default ProtectedRoute;
