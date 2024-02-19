import React, { FC, useContext, useRef, useState } from 'react'
import './login.css';

import { AuthDispatchContext } from "../../contexts/auth";
import { UserActionTypes, UserData } from '../../contexts/auth/authContext.types';
import { login, register } from '../../api/auth';

const Login: FC = (): JSX.Element => {

    // Dispatch Auth actions to set context
    const dispatch = useContext(AuthDispatchContext)

    // Refs to get values when form is submitted
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // State to switch between login / register
    const [loginMethod, setLoginMethod] = useState<UserActionTypes>("register");

    // handle switching between login and register
    function handleLoginMethod() {
        if (loginMethod === "register") {
            setLoginMethod("login")
        } else {
            setLoginMethod("register")
        }
    }

    /**
     * Handle form submission
     * @param e HTMLFormEvent
     * @returns void
     */
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        // Prevent default form action
        e.preventDefault();

        (async () => {

            // Collect login data
            const emailValue = emailRef.current?.value;
            const passwordValue = passwordRef.current?.value;

            // Check for login values
            if (!emailValue || !passwordValue) return;

            // Login or register
            const userData = await handleAPICall({ email: emailRef.current?.value, password: passwordRef.current?.value, loginMethod });

            // Check for user data returned
            if (!userData?.id || !userData?.email) {
                return;
            }



            // Dispatch to update context with login data
            dispatch && dispatch({
                type: loginMethod,
                payload: {
                    userData: {
                        id: userData?.id,
                        email: userData?.email,
                        isAuthenticated: true
                    }
                }
            })
        })();
    }

    /**
     * Handles api call to register or login
     * @param email - Users email
     * @param password - Users password
     * @param loginMethod - Login method selected in state login/register
     * @returns User object
     */
    async function handleAPICall({ email, password, loginMethod }: { email: string, password: string, loginMethod: UserActionTypes }): Promise<UserData | undefined> {
        if (!email || !password) return;

        let data;

        if (loginMethod === "register") {
            data = await register({ email, password });
        }

        if (loginMethod === "login") {
            data = await login({ email, password });
        }

        return data?.user;
    }

    // State changing button values based on loginMethod
    const switchButtonText = loginMethod === "register" ? "Login" : "Register";
    const actionButtonText = loginMethod === "register" ? "Register" : "Login";

    return (
        <main className='login-page'>
            <section>
                <fieldset>
                    <legend>{actionButtonText}</legend>
                    <form data-testid="login-form" onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email:</label>
                        <input ref={emailRef} id="email" name="email" type="email" data-testid="email-input" />
                        <label htmlFor='password'>Password:</label>
                        <input ref={passwordRef} id="password" name="password" type="password" data-testid="password-input" />

                        <button data-testid="form-action-button">{actionButtonText}</button>
                    </form>
                </fieldset>
                <button onClick={handleLoginMethod} data-testid="form-action-switch-button">{switchButtonText}</button>
            </section>
        </main>
    )
}
export default Login