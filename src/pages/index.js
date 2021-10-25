import { useState } from "react"
import styled from "styled-components"
import { Chat } from "../components/Chat"
import { Sidebar } from "../components/Sidebar"


export default function Home() {
  const [chatID, setChatID] = useState();
  
  const onClickContact = (id) => {
    setChatID(id);
  }

  return (
    <Container>
      <Sidebar onClickContact={onClickContact} />
      <ChatContainer>
        { chatID && <Chat id={chatID} /> }
      </ChatContainer>
    </Container>
  )
}

// export async function getServerSideProps(context) {

// }

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;