import React from 'react'
import "firebase/app"
import { GoogleOutlined } from '@ant-design/icons';
import {auth} from '../firebase/firebase.utils'
import firebase from 'firebase/app';



const Login = () => {

    return(
    <div id='login-page'>
        <div id = 'login-card'>
            <h2>Welcome to Chat-Me !</h2>
            <div
            className='login-button google' onClick={()=>auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
            >
          
            <GoogleOutlined  /> Sign In With Google
            </div>
            <br/>
            <br/>
         


        </div>
    
    </div>);
}

export default Login