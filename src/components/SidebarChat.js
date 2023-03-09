import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import db from '../firebase'
import "./SidebarChat.css"

const SidebarChat = ({id, name, addNewChat}) => {
  const [seed,setSeed]=useState("")

  const [messages,setMessages]=useState("")
  useEffect(()=>{
    if(id){
      db.collection("rooms").doc(id)
      .collection("messages").orderBy("timestamp","desc")
      .onSnapshot((snapshot)=>{
          setMessages(snapshot.docs.map((doc)=>doc.data()));
      })
    }
  })
   
  useEffect(()=>{
    setSeed(Math.floor(Math.random()*100))

  },[])

  const createchat=()=>{
    const roomName = prompt("Please enter name for chat")
    if(roomName) {
      db.collection("rooms").add({
        name: roomName
      })
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${seed}`} />
        <div className='sidebarChat_info'>
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>

      </div>
    </Link>
  ): (
    <div className='sidebarChat' onClick={createchat}>
        <h2>Add New Chat</h2>
      </div>  
  )
}

export default SidebarChat