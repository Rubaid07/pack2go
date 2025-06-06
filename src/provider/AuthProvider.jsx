import { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
export const AuthContext = createContext()

const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (updateData)=> {
        return updateProfile(auth.currentUser, updateData)
    }
    const logOut =() => {
        return signOut(auth)
    }
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    }, [])
    const authData = {
        user,
        setUser,
        signIn,
        loading,
        setLoading,
        createUser,
        updateUser,
        logOut
    }
    return <AuthContext value={authData}>{children}</AuthContext>
}
export default AuthProvider;