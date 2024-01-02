import React, {lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import ROUTES from './app/routes';
import ProtectedRoute from "./components/ProtectedRoute";

const {
    HOME,
    LOGIN,
    LISTS,
    LIST,
    LOGOUT,
    REGISTER
} = ROUTES;

const DefaultLayout = lazy(() => import('./layouts/DefaultLayout'));
const LoginView = lazy(() => import('./views/login/LoginView'));
const LogoutView = lazy(() => import('./views/logout/LogoutView'));
const RegisterView = lazy(() => import('./views/register/RegisterView'));
const ListsView = lazy(() => import('./views/lists/ListsView'));
const ListView = lazy(() => import('./views/list/ListView'));

function AppRoutes() {
    return (
        <Routes>
            <Route path={HOME} element={<Navigate to={ROUTES.LISTS} />} />
            <Route path={LISTS} element={<ProtectedRoute><DefaultLayout><ListsView/></DefaultLayout></ProtectedRoute>}/>
            <Route path={LIST} element={<ProtectedRoute><DefaultLayout><ListView/></DefaultLayout></ProtectedRoute>}/>
            <Route path={LOGOUT}
                   element={<ProtectedRoute><DefaultLayout><LogoutView/></DefaultLayout></ProtectedRoute>}/>
            <Route path={LOGIN} element={<DefaultLayout><LoginView/></DefaultLayout>}/>
            <Route path={REGISTER} element={<DefaultLayout><RegisterView/></DefaultLayout>}/>
            <Route path="*" element={<p>404!</p>}/>
        </Routes>
    );
}

export default AppRoutes;
