import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import Login from './login';
import { Loading } from '../components/Loading';
import { serverTimestamp, setDoc, doc } from 'firebase/firestore'
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDoc(doc(db, 'users', user.uid),
        {
          email: user.email,
          name: user.displayName,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      )
    }
    return () => {}
  }, [user])

  if (loading) return <Loading />

  if (!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
