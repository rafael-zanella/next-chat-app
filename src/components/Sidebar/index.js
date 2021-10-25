import { Avatar, Button, IconButton } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import {
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Contact } from '../Contact';


const Sidebar = ({ onClickContact }) => {
  const [user] = useAuthState(auth);
  const chatsRef = collection(db, 'chats');
  const userChatRef = query(chatsRef, where('users', "array-contains", `${user.email}`))

  const [chatList, setChatList ] = useState([]);

  const getChats = async () => {
    const docSnap = await getDocs(userChatRef);
    
    const data = docSnap.docs.map(doc => {
      const users = doc.data().users;
      return {
        id: doc.id,
        recipientEmail: users.filter(email => email !== user.email),
      }
    });
    setChatList(data);
  }

  useEffect(() => {
    getChats();
  }, [])

  const chatAlreadyExists = async (recipientEmail) => {
    const docSnap = await getDocs(userChatRef);
    return !!docSnap.docs.find(chat => chat.data().users.find(user => user === recipientEmail));
  };

  const validateEmail = async (email) => {
    const validEmail = EmailValidator.validate(email);
    const emailDifferentFromUser = email !== user.email
    const chatExists = await chatAlreadyExists(email);
    return validEmail && emailDifferentFromUser && !chatExists;
  }

  const createChat = async () => {
    const input = prompt('Prease enter an email address for the user you wish to chat with');
  
    if (!input) return null;

    const isValidEmail = await validateEmail(input);

    if (isValidEmail) {
      await addDoc(collection(db, "chats"), {
        users: [user.email, input]
      })
      await getChats();
    }
    
  }

  return(
    <Container>
        <Header>
          <UserAvatar
            src={user?.photoURL ?? ''}
            onClick={() => auth.signOut()}
          />

          <IconsContainer>
            <IconButton>
              <ChatIcon />
            </IconButton>
            
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </IconsContainer>
        </Header>

        <Search>
          <SearchIcon />
          <SearchInput placeholder="Search in chats" />
        </Search>

        <SidebarButton onClick={createChat}>
          Start a new chat
        </SidebarButton>
        <div>
        {
          chatList && chatList.map(chat => (
            <Contact
              key={chat.id}
              id={chat.id}
              recipientEmail={chat.recipientEmail}
              onClick={onClickContact}
            />
          ))
        }
        </div>
      
        
    </Container>
  )
}

export { Sidebar };


const Container = styled.div``;

const Header = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;