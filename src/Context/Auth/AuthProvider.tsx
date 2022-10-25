import React, { useContext, useEffect, createContext, useMemo, ReactNode } from 'react'
import { Redirect } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import { AppContext } from 'Context/AppProvider'
import { login as apiLogin, logout as apiLogout, loginWithTwitter as apiLoginWithTwitter } from 'Api/Endpoints'
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { IMemberApi } from 'Interfaces/ISettings'
import useLocalStorage from 'Hooks/useLocalStorage'

type AuthContextType = {
    user: IMemberApi | null;
    login?: (email: string, password: string) => Promise<IMemberApi>;
    loginWithTwitter?: () => Promise<IMemberApi>;
    logout?: () => void;
    isAdmin: boolean;
}

const initalState: AuthContextType = {
    user: null,
    isAdmin: false,
}

const AuthContext = createContext<AuthContextType>(initalState)
AuthContext.displayName = 'AuthContext'

const AuthProvider: React.FC<{ children: ReactNode }> = (props) => {
    const queryClient = useQueryClient()
    const app = useContext(AppContext)
    const provider = new TwitterAuthProvider();
    const auth = getAuth();

    const [user, setUser] = useLocalStorage<IMemberApi | null>('user', null)

    useEffect(() => {
        // console.log(app.location)

        // save current location so when the user signs in
        // we redirect them to that location
        if (!user && app.location.pathname !== '/') {
            app.redirect('/')
        }
        else if (user && app.location.pathname === '/') {
            // console.log('hey')
            app.redirect('/dashboard')
        }

    }, [user, app.location])

    const login = (email: string, password: string) => {
        return new Promise<IMemberApi>((resolve, reject) => {
            apiLogin(email, password)
                .then(res => {
                    console.log(res.data)
                    setUser(res.data)
                    resolve(res.data)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    }

    const loginWithTwitter = () => {
        return new Promise<IMemberApi>((resolve, reject) => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = TwitterAuthProvider.credentialFromResult(result);
                    const token = credential?.accessToken;
                    const secret = credential?.secret;
                    // The signed-in user info.
                    // @ts-ignore: Unreachable code error
                    const handle = result.user?.reloadUserInfo?.screenName;
                    const email = result.user?.email
                    const id = result.user?.providerData[0]?.uid

                    apiLoginWithTwitter({ token, secret, email, handle, id }).then((res) => {
                        setUser(res.data)
                        resolve(res.data)
                    }).catch((error) => {
                        console.log(error)
                        reject(error)
                    })
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                })
        })
    }

    const logout = () => {
        apiLogout()
            .then(res => {
                console.log(res)
                /* setUser(null)
                localStorage.removeItem('user')
                app.redirect('/') */
            })
            .catch(error => {
                console.log(error)
                // TODO: only temporary, don't know if this should
            })
            .finally(() => {
                setUser(null)
                // localStorage.removeItem('user')
                app.redirect('/')
                queryClient.clear()
            })
    }

    const utils = useMemo(() => ({
        user,
        login,
        loginWithTwitter,
        logout,
        isAdmin: user?.role === "Admin"
    }), [user])

    return (
        <AuthContext.Provider value={utils}>
            {!user && app.location.pathname !== '/' ? <Redirect to="/" /> : props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext }
export default AuthProvider