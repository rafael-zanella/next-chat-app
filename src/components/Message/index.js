import styled from "styled-components";


function Message({ user, message, timestamp }) {
  const date = new Date(timestamp).toString();

  return (
    <Container>
      <h5>{user}</h5>
      <p>{message}</p>
      <span>{date}</span>
    </Container>
  );
}


export default Message;

const Container = styled.div`

`;