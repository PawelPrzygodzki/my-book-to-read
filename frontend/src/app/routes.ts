enum ROUTES {
    HOME = '/',
    LISTS = '/lists',
    LIST = '/lists/:listId',
    LOGIN = '/login',
    REGISTER = '/register',
    LOGOUT = '/logout',
}

export const getListRoute = (id: number) => ROUTES.LIST.replace(':listId', String(id))
export default ROUTES;
