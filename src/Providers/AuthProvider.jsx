/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../Firebase/firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    console.log(user);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        googleSignIn,
        setUser,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;