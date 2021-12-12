import { collection, query, where, getDocs, getDoc } from "@firebase/firestore";
import { Avatar } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components"
import { db } from "../../../firebase";

export const Contact = ({ id, recipientEmail, onClick }) => {

  const router = useRouter()
  const usersRef = collection(db, 'users');
  const recipientQuery = query(usersRef, where('email', '==', `${recipientEmail}`));
  const [userInfo, setUserInfo] = useState(undefined);

  const getUser = async () => {
    const querySnapshot = await getDocs(recipientQuery);
    const info = querySnapshot.docs[0]?.data();
    setUserInfo(info);
  }

  const enterChat = () => {
    onClick(id, userInfo);
  }


  useEffect(() => {
    getUser();
  }, []);

  return(
    <Container onClick={enterChat} >
      <UserAvatar src={userInfo?.photoURL ?? ''} />
      <p>{userInfo?.name || recipientEmail}</p>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;