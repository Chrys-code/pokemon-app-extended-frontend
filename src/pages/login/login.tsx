import React, { FC, PropsWithChildren, useContext, useRef, useState } from 'react'
import './login.css';

import { AuthDispatchContext } from "../../contexts/auth";
import { UserActionTypes } from '../../contexts/auth/authContext.types';
import { login, register } from '../../api/auth';

const Login: FC = ({ }: PropsWithChildren): JSX.Element => {

    // Dispatch Auth actions to set context
    const dispatch = useContext(AuthDispatchContext)

    // Refs to get values when form is submitted
    const emailRef = useRef();
    const passwordRef = useRef();

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

    // Handle for submission
    // The login - register methods are quite similar, dispatch actios could be merged
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        // Prevent default form action
        e.preventDefault();

        // @ts-ignore
        const userData = await handleAPICall({ email: emailRef.current?.value, password: passwordRef.current?.value, loginMethod });

        console.log(userData)
        if (!userData?.id || !userData?.email) {
            return;
        }
        // Dispatch to update context with login data
        dispatch && dispatch({
            type: loginMethod,
            userData: {
                id: userData?.id,
                email: userData?.email,
                isAuthenticated: true
            }
        })
    }


    // Handles api call to register ot login based on @param loginMethod
    // May be worth to include this process in an IIFE to seal and avoid data inspection in the future
    async function handleAPICall({ email, password, loginMethod }: { email: string, password: string, loginMethod: "register" | "login" }): Promise<{ email: string, id: string } | undefined> {
        if (!email || !password) return;

        let data;

        if (loginMethod === "register") {
            data = await register({ email, password });
        }

        if (loginMethod === "login") {
            data = await login({ email, password });
        }

        return data.user;
    }

    const switchButtonText = loginMethod === "register" ? "Login" : "Register";
    const actionButtonText = loginMethod === "register" ? "Register" : "Login";

    return (
        <main className='page'>
            <section>
                <fieldset>
                    <legend>{actionButtonText}</legend>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email:</label>
                        {/*@ts-ignore*/}
                        <input ref={emailRef} id="email" name="email" type="email" />

                        <label htmlFor='password'>Password:</label>
                        {/*@ts-ignore*/}
                        <input ref={passwordRef} id="password" name="password" type="password" />

                        <button>{actionButtonText}</button>
                    </form>
                </fieldset>
                <button onClick={handleLoginMethod}>{switchButtonText}</button>
            </section>
        </main>
    )
}
export default Login