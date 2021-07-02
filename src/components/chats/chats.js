import React , { useRef, useState, useEffect } from 'react';
import  {useHistory} from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine'
import {auth} from '../firebase/firebase.utils'

import { useAuth } from '../../context/authcontext';
import axios from 'axios';

const Chats = () => {

    const didMountRef = useRef(false)
    const history = useHistory();
    const [loading,setLoading] = useState(true);

    const handleLogOut = async () =>  {
        await auth.signOut();
        history.push('/')
    }

    const getFile = async (url)=> {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data],'userPhoto.jpg',{type: 'image/jpeg'});
    }

    const { user } = useAuth();

    useEffect(() => {
        if (!didMountRef.current) {
          didMountRef.current = true
    
          if (!user || user === null) {
            history.push("/")
            return
          }
          
          // Get-or-Create should be in a Firebase Function
          axios.get(
            'https://api.chatengine.io/users/me/',
            { headers: { 
              "project-id": '1e951e0e-a2f5-4186-82ca-129317b1b87d',
              "user-name": user.email,
              "user-secret": user.uid
            }}
          )
    
          .then(() => {setLoading(false)
                console.log('user exists')
            })
    
          .catch(e => {
            console.log('preparing forms')
            let formdata = new FormData()
            formdata.append('email', user.email)
            formdata.append('username', user.email)
            console.log(user.uid)
            formdata.append('secret', user.uid)
    
            getFile(user.photoURL)
            .then(avatar => {
              formdata.append('avatar', avatar, avatar.name)
    
              axios.post(
                'https://api.chatengine.io/users/',
                formdata,
                { headers: { "private-key": "xxxxx" }}
              )
              .then(() =>{ setLoading(false);console.log('user registered')})
              //.catch(e => console.log('e', e.response))
            })
          })
        
    
        }
      }, [user, history])


    if(!user || loading) {
        return <div />  
    }

    return (<div className='chats-page'>
    <div className='nav-bar'>
        <div className='logo-tab'>
            Chat-Me
        </div>
        <div onClick={handleLogOut} className='logout-tab'>
            Log Out
        </div>
    </div>
        <ChatEngine height ="calc(100vh - 66px)" publicKey='
        1e951e0e-a2f5-4186-82ca-129317b1b87d' projectID='1e951e0e-a2f5-4186-82ca-129317b1b87d' userName={user.email} userSecret={user.uid} />
    </div>);
}

export default Chats;