import { useState, createContext } from 'react'

import { login as apiLogin } from 'Api/Endpoints'

const AuthContext = createContext()
AuthContext.displayName = 'AuthContext'

const AuthProvider = (props) => {
    const [user, setUser] = useState(null)

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
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

    return (
        <AuthContext.Provider value={{ user, login }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext }
export default AuthProvider