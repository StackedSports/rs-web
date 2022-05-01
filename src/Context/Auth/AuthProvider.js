import { useState, useContext, useEffect, createContext, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { AppContext } from 'Context/AppProvider'
import { login as apiLogin, logout as apiLogout } from 'Api/Endpoints'

const AuthContext = createContext()
AuthContext.displayName = 'AuthContext'

const AuthProvider = (props) => {
    const app = useContext(AppContext)

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)

    useEffect(() => {
        // console.log(app.location)
        // save current location so when the user signs in
        // we redirect them to that location
        if(!user && app.location.pathname !== '/')
            app.redirect('/')
        else if(user && app.location.pathname === '/') {
            console.log('hey')
            app.redirect('/contacts')
        }

    }, [user, app.location])

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            apiLogin(email, password)
                .then(res => {
                    console.log(res.data)
                    setUser(res.data)
                    localStorage.setItem('user', JSON.stringify(res.data))
                    resolve(res.data)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    }

    const logout = () => {
        console.log('logout')

        apiLogout()
            .then(res => {
                console.log(res)
                setUser(null)
                localStorage.removeItem('user')
            })
            .catch(error => {
                console.log(error)
                // TODO: only temporary, don't know if this should
                // still be here
                setUser(null)
                localStorage.removeItem('user')
            })
        // localStorage.removeItem('user')
    }

    const utils = useMemo(() => ({
        user, login, logout
    }), [user])

    return (
        <AuthContext.Provider value={utils}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext }
export default AuthProvider