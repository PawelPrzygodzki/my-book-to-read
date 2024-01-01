import {useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import isTokenValid from '../validators/isTokenValid';

const useAuthToken = (): boolean => {
    const token = localStorage.getItem('token')
    const dispatch = useDispatch();
    const isValid = useMemo(
        () => isTokenValid(token),
        [token],
    );

    useEffect(() => {
        if (!isValid) {
            localStorage.removeItem('token');
        }
    }, [isValid, dispatch]);

    return isValid;
};

export default useAuthToken;
