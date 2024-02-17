import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';
import App from '../App';
import axios from 'axios';

describe("Login screen", () => {
    beforeEach(() => {
        render(<App />);
    });

    it("should show login form", () => {
        // Prepare
        const counterEl = screen.getByTestId('login-form');

        // Assert
        expect(counterEl).toBeInTheDocument();
    });

    it("should show the input fields for login form", () => {
        // Prepare
        const email = screen.getByTestId('email-input');
        const password = screen.getByTestId('password-input');

        // Assert
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
    });

    it("should show the action buttons for login form", () => {
        // Prepare
        const actionBtn = screen.getByTestId('form-action-button');
        const switchActionBtn = screen.getByTestId('form-action-switch-button');

        // Assert
        expect(actionBtn).toBeInTheDocument();
        expect(switchActionBtn).toBeInTheDocument();
    });
})

describe("Login screen state changes", () => {

    beforeEach(() => {
        render(<App />);
    });

    it("should switch action when action switch button is clicked", () => {
        // Prepare
        const actionBtn = screen.getByTestId('form-action-button');
        const switchActionBtn = screen.getByTestId('form-action-switch-button');

        // Assert
        expect(actionBtn).toHaveTextContent("Register");
        expect(switchActionBtn).toHaveTextContent("Login");


        // Act
        act(() => {
            userEvent.click(switchActionBtn);
        })

        // Assert
        expect(actionBtn).toHaveTextContent("Login");
        expect(switchActionBtn).toHaveTextContent("Register");
    });
})

describe("Login screen actions", () => {

    let spy: jest.SpyInstance;

    beforeEach(() => {
        render(<App />);
        spy = jest.spyOn(axios, "post");
    })

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should call register api when form is filled and action button is clicked", () => {
        // Prepare
        const actionBtn = screen.getByTestId('form-action-button');
        const email = screen.getByTestId('email-input');
        const password = screen.getByTestId('password-input');

        // Act
        act(() => {
            userEvent.type(email, "example@example.com");
            userEvent.type(password, "test123");
            userEvent.click(actionBtn);
        })

        // Assert
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`${process.env.REACT_APP_API}/auth/register`,
            { email: "example@example.com", password: "test123" },
        );
    });


    it("should call login api when form is filled, switch action button is clicked and action button is clicked", () => {
        // Prepare
        const switchActionBtn = screen.getByTestId('form-action-switch-button');
        const actionBtn = screen.getByTestId('form-action-button');
        const email = screen.getByTestId('email-input');
        const password = screen.getByTestId('password-input');

        // Act
        act(() => {
            userEvent.click(switchActionBtn);
            userEvent.type(email, "example@example.com");
            userEvent.type(password, "test123");
            userEvent.click(actionBtn);
        })

        // Assert
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`${process.env.REACT_APP_API}/auth/login`,
            { email: "example@example.com", password: "test123" },
        );
    });
})
