import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../firebase'

import "./Login.css"
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'


const Login = () => {
    const [{},dispatch]=useStateValue()

     const signIn = () => {
        auth.signInWithPopup(provider)
            .then(res => { 
                 dispatch({
                    type: actionTypes.SET_USER,
                    user: res.user
                }) 
            })
            .catch((err) => alert(err.message))
    }  

    /* const signIn = () => {
        auth.signInWithPopup(provider)
            .then((res) => { console.log(res) })
            .catch((err) => alert(err.message))
    } */

  return (
    <div className='login'>
        <div className='login_container'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/6/6b/20200905003027%21WhatsApp.svg/119px-WhatsApp.svg.png" alt='Whatsapp'/>
            <div className='login_text'>
                <h1>Sign in to Whatsapp</h1>
            </div>
            <Button onClick={signIn}>Sign in with Google</Button>
        </div>

        
    </div>
  )
}

export default Login