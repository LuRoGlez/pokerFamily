import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

const [user, setUser] = useState(false);

useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, user => {
        
        if(user){
            const { email, photoURL, displayName, uid } = user
            setUser({email, photoURL, displayName, uid})
            console.log(user)
        } else {
            setUser(null)
        }
    })

    return () => unsuscribe
}, [])

const registerUser = async (email, password, userName) => {
    await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser, {displayName: userName});    
};

const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

const logOutUser = () => signOut(auth)



return (
    <UserContext.Provider  value = {{user, setUser, registerUser, loginUser, logOutUser}}>
        {children}
    </UserContext.Provider>
    );

}

export default UserProvider;