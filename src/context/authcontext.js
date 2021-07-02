import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../components/firebase/firebase.utils'

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    //returns a value and a function to use the value
    const[loading,setLoading] = useState(true);
    const[user, setUser] = useState(null);
    const history = useHistory();
    //this function will be recalled again whenever the dependency array's memebrs are encountered with change
    useEffect(()=>{ auth.onAuthStateChanged((user)=>{
        setUser(user);
        setLoading(false);
        if(user) history.push('/chats')

    })

    },[user,history]);

    const value = { user };

    return (
        //if not loading, show children
        <AuthContext.Provider value={value}>{! loading && children }</AuthContext.Provider>
    )

}