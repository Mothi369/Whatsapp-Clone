import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import "./Chat.css"
import { useStateValue } from './StateProvider'
import firebase from 'firebase'

const Chat = () => {
    const [seed,setSeed]=useState("")
    const [input,setInput]=useState("")

    const {roomId}=useParams()
    const [roomName,setRoomName]=useState("")

    const [messages,setMessages]=useState([])

    const [ { user }, dispatch]=useStateValue()


    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot(snap=>(
                setRoomName(snap.data().name)
            ))

            db.collection("rooms").doc(roomId)
            .collection("messages").orderBy("timestamp","asc")
            .onSnapshot(snap=>setMessages(snap.docs.map(msg=>msg.data())))

        }
    },[roomId])

  useEffect(()=>{
    setSeed(Math.floor(Math.random()*100))

  },[])

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection("rooms").doc(roomId).collection("messages").add({
        message:input,
        name:user.displayName,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("") 
  }

  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${seed}`} />
            <div className='chat_headerInfo'>
                <h3>{roomName}</h3>
                <p>last seen {" "}
                    { new Date(messages[messages.length-1]?.timestamp?.toDate())
                    .toUTCString()}
                </p>
            </div>
            <div className='chat_headerRight'>
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
        </div>
        <div className='chat_body'>
            {messages.map(message=>(
                <p className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`}>
                    <span className="chat_name">{message.name} </span>
                    {message.message}
                    <span className="chat_timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
            ))}
            
           {/*  <p className='chat_message'>
                <span className="chat_name">Royal  </span>
                How are doing 
                <span className="chat_timestamp">
                    {new Date().toLocaleTimeString()}
                </span>
            </p> */}
        </div>
        <div className='chat_footer'>
            <InsertEmoticon/>
            <form>
                <input value={input} onChange={e=>setInput(e.target.value)} 
                type="text" placeholder="Type a message" />  
                <button type='submit' onClick={sendMessage}>Send Message</button>
            </form>
            <MicIcon/>
        </div>
        
    </div>
  )
}

export default Chat