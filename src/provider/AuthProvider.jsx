import { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (updateData)=> {
        return updateProfile(auth.currentUser, updateData)
    }
    const logOut =() => {
        setLoading(true)
        localStorage.removeItem('access-token');
        return signOut(auth);
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
            if(currentUser){
                currentUser.getIdToken()
                .then(idToken => {
                    localStorage.setItem('access-token', idToken);
                })
                .catch(error => {
                    console.log(error);
                });
            } else {
                localStorage.removeItem('access-token');
            }
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
        logOut,
        signInWithGoogle,
    }
    return <AuthContext value={authData}>{children}</AuthContext>
}
export default AuthProvider;