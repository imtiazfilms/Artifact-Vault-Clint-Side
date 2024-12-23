/* eslint-disable react/prop-types */

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";




const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const handelReg = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handelLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handelGoogleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const manageProfile = (name, image)=>{
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: image
        })
    }

    const handelLogOut = () => {
        return signOut(auth)
    }

    const authInfo = {
        handelReg,
        handelLogin,
        handelGoogleLogin,
        handelLogOut,
        manageProfile,
        user,
        setUser,
        loading

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setUser(currentUser)
            }
            else{
                setUser(null)
            }
            setLoading(false)

            return () => {
                unsubscribe()
            }

        })
    }, [])

    return (
        <div>
            <authContext.Provider value={authInfo}>
                {
                    children
                }
            </authContext.Provider>
        </div>
    );
};

export const authContext = createContext()
export default AuthProvider;