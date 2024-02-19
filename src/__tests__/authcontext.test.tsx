import { render, screen } from '@testing-library/react';
import { AuthContext, AuthDispatchContext, AuthProvider } from '../contexts/auth';
import { AuthContextUserData } from '../contexts/auth/authContext.types';
import { act } from 'react-dom/test-utils';

jest.mock("axios");

const userMockData: AuthContextUserData = {
    id: "123",
    email: "example@example.com",
    isAuthenticated: true
}


const MockDispatchContextConsumer = (type: "login" | "register") => (
    <AuthDispatchContext.Consumer >
        {(dispatch) => {
            function handleClick() {
                dispatch && dispatch({
                    type,
                    payload: {
                        userData: userMockData
                    }
                })
            }

            return (
                <button data-testid={type} onClick={handleClick}>
                    {type}
                </button>
            )
        }}
    </AuthDispatchContext.Consumer>
)

const MockAuthConsumer = () => (
    <AuthContext.Consumer>
        {(value) => {
            return (
                <>
                    <p data-testid="userId">
                        {value?.id}
                    </p>
                    <p data-testid="userEmail">
                        {value?.email}
                    </p>
                    <p data-testid="userIsAuthenticated">
                        {`${value?.isAuthenticated}`}
                    </p>
                </>
            )
        }}
    </AuthContext.Consumer>
)

describe("Auth Context", () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Initial auth state", () => {

        beforeEach(() => {
            render(
                <AuthProvider>
                    <>
                        {MockAuthConsumer()}
                        {MockDispatchContextConsumer("login")}
                    </>
                </AuthProvider >
            );
        });

        it("Should show initial data", async () => {
            // Prepare
            const userId = screen.getByTestId("userId");
            const userEmail = screen.getByTestId("userEmail");
            const userIsAuthenticated = screen.getByTestId("userIsAuthenticated");

            // Assert
            expect(userId).toHaveTextContent("")
            expect(userEmail).toHaveTextContent("")
            expect(userIsAuthenticated).toHaveTextContent("false")
        });
    })


    describe("Login action", () => {

        const type = "login";

        beforeEach(() => {
            render(
                <AuthProvider>
                    <>
                        {MockAuthConsumer()}
                        {MockDispatchContextConsumer(type)}
                    </>
                </AuthProvider >
            );
        });

        it("Should change initial data upon login action", async () => {
            // Prepare
            const actionBtn = screen.getByTestId(type);
            const userId = screen.getByTestId("userId");
            const userEmail = screen.getByTestId("userEmail");
            const userIsAuthenticated = screen.getByTestId("userIsAuthenticated");

            // Act
            act(() => {
                actionBtn.click();
            })

            // Assert
            expect(userId).toHaveTextContent(userMockData.id)
            expect(userEmail).toHaveTextContent(userMockData.email)
            expect(userIsAuthenticated).toHaveTextContent(String(userMockData.isAuthenticated))
        });
    })

    describe("Register action", () => {

        const type = "register";

        beforeEach(() => {
            render(
                <AuthProvider>
                    <>
                        {MockAuthConsumer()}
                        {MockDispatchContextConsumer(type)}
                    </>
                </AuthProvider >
            );
        });

        it("Should change initial data upon login action", async () => {
            // Prepare
            const actionBtn = screen.getByTestId(type);
            const userId = screen.getByTestId("userId");
            const userEmail = screen.getByTestId("userEmail");
            const userIsAuthenticated = screen.getByTestId("userIsAuthenticated");

            // Act
            act(() => {
                actionBtn.click();
            })

            // Assert
            expect(userId).toHaveTextContent(userMockData.id)
            expect(userEmail).toHaveTextContent(userMockData.email)
            expect(userIsAuthenticated).toHaveTextContent(String(userMockData.isAuthenticated))
        });
    })

});