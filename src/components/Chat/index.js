import { Avatar, IconButton } from "@material-ui/core";
import styled from "styled-components"
import {
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
  InsertEmoticon as InsertEmoticonIcon,
  Mic as MicIcon,
} from "@material-ui/icons";
import { auth, db } from '../../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import {
  query,
  orderBy,
  doc,
  getDocs,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import Message from "../Message";


export const Chat = ({ id, recipientInfo }) => {
  const [ user ] = useAuthState(auth);
  const [ input, setInput ] = useState('');
  const [ messages, setMessages ] = useState([]);

  const messagesRef = collection(db, 'chats', `${id}`, 'messages');
  const queryMessages = query(messagesRef, orderBy('timestamp', 'asc'))

  
  useEffect(() => {
    const messagesSnapshot = onSnapshot(queryMessages, (querySnapshot) => {
      const arr = []
      querySnapshot.forEach(doc => {
        arr.push({
          id: doc.id,
          ...doc.data(),
        })
      })

      setMessages(arr);
    });
    
    return () => messagesSnapshot();
  }, [id])


  const sendMessage = async (e) => {
    e.preventDefault();
    
    await setDoc(doc(db, 'users', user.uid),
      { lastSeen: serverTimestamp() },
      { merge: true }
    )

    await addDoc(messagesRef, {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput('');
  }


  const showMessages = () => {
    return messages.map(m => (
      <Message
        key={m.id}
        user={m.user}
        message={m.message}
        timestamp={m.timestamp?.toDate()}
      />
    ))
  }

  return (
    <Container>
      <Header>
        <Avatar src={recipientInfo?.photoURL ?? ''} />

        <HeaderInformation>
          <h3>{recipientInfo?.name || recipientInfo?.email}</h3>
          <p>last seen ...</p>
        </HeaderInformation>

        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        { showMessages() }
        <EndOfMessage />
      </MessageContainer>

      <InputContainer>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
          
          <Input value={input} onChange={e => setInput(e.target.value)} />
          <button hidden disabled={!input} type="submit" onClick={sendMessage} >Send Message</button>

        <IconButton>
          <MicIcon />
        </IconButton>
      </InputContainer>
    </Container>
  )
}


const Container = styled.div`

`;

const Header = styled.header`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const EndOfMessage = styled.div`

`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;