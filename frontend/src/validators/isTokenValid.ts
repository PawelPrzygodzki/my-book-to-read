import {jwtDecode} from "jwt-decode";
import isExpiryDateInTheFuture from './isExpiryDateInTheFuture';

const isTokenValid = (token?: string | null) => {
    if (!token) {
        return false;
    }

    const decodedToken = jwtDecode(token);

    if (decodedToken === null) {
        return false;
    }

    return isExpiryDateInTheFuture(decodedToken);
};

export default isTokenValid;
