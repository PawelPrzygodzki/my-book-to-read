import {AppThunk} from '../../../app/store';

const logOut = (): AppThunk => (
    async (dispatch) => {
        localStorage.removeItem('token');
    }
);

export {
    logOut,
};
