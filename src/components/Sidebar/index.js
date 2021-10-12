import { Avatar, Button, IconButton } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components';
import {
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
} from '@material-ui/icons';


const Sidebar = () => {
  return(
    <Container>
        <Header>
          <UserAvatar />

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

        <SidebarButton>
          Start a new chat
        </SidebarButton>

        {/* list of chats */}
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