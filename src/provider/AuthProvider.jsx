import { createContext, useState } from "react";
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
export const AuthContext = createContext()

const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (updateData)=> {
        return updateProfile(auth.currentUser, updateData)
    }
    const authData = {
        user,
        setUser,
        signIn,
        createUser,
        updateUser,
    }
    return <AuthContext value={authData}>{children}</AuthContext>
}
export default AuthProvider;