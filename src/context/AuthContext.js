import { createContext,useContext,useState,useEffect } from "react";
import {auth} from '../fire_base';
import { signOut ,
        signInWithEmailAndPassword, 
        onAuthStateChanged,
        sendPasswordResetEmail,
        } from "firebase/auth";
const AuthContext = createContext({
    currentUser:null,  
    login:()=>Promise,
    logout:()=>Promise,
    resetPassword:()=>Promise
})

export const useAuth = ()=>useContext(AuthContext);

export default function AuthContextProvider({children}){
    const [currentUser,setCurrentUser] = useState(null);
    const value = {
        currentUser,
        login,
        logout,
        resetPassword
    }
    function login(email,password) {
        return signInWithEmailAndPassword(auth,email,password);
     }

     function logout(){
         return signOut(auth);
     } 

     function resetPassword(email){
         return sendPasswordResetEmail(auth,email);
     }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,user => setCurrentUser(user))
        return ()=>{unsubscribe()}
    },[])
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}