import styled from "styled-components";
import Head from 'next/head';
import { Button } from "@material-ui/core";
import { signInWithGoogle } from "../../firebase";

const Login = () => {

  const signIn = () => {
    signInWithGoogle().catch(alert);
  }

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png' />
        <Button
          variant="outlined"
          onClick={signIn}
        >
          Sign in with Google
        </Button>
      </LoginContainer>

    </Container>
  )


}

export default Login;


const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius: 5px;
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
