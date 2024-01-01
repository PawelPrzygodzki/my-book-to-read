import {render, screen} from "@testing-library/react";
import AppContent from "./AppContent";

describe('App Content', () => {
    it('should renders correctly when contain a child', () => {
        render(<AppContent ><h1>Child</h1></AppContent>)

        expect(screen.getByRole('heading')).toHaveTextContent('Child')
    });
})
