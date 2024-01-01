import React, {isValidElement} from 'react';
import { screen, render} from '@testing-library/react';
import * as hooks from '../../hooks/useAuthToken';
import ProtectedRoute from "./ProtectedRoute";
import ROUTES from "../../app/routes";
import { createMemoryRouter, RouterProvider} from "react-router-dom";

export function renderWithRouter(children: any, routes: any[] = []) {
    const options = isValidElement(children)
        ? { element: children, path: "/" }
        : children;

    const router = createMemoryRouter([{ ...options }, ...routes], {
        initialEntries: [options.path],
        initialIndex: 1,
    });

    return render(<RouterProvider router={router} />);
}

describe('ProtectedRoute', () => {
    it('should redirect user to login page when user is not authorized', () => {

        jest.spyOn(hooks, 'default').mockImplementation(() => false);

        renderWithRouter(<ProtectedRoute><p>child</p></ProtectedRoute>, [
                {
                    path: ROUTES.LOGIN,
                    element: <h2>Login</h2>,
                },
            ]);

        expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
            "Login"
        );
    })

    it('should render child when user is authorized', () => {

        jest.spyOn(hooks, 'default').mockImplementation(() => true);

        renderWithRouter(<ProtectedRoute><h2>child</h2></ProtectedRoute>, [
            {
                path: ROUTES.LOGIN,
                element: <h2>Login</h2>,
            },
        ]);

        expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
            "child"
        );
    })
});
