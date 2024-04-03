import { useEffect, useState } from 'react'

import Login from './components/Login'
import Main from './components/Main'

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { AuthContext } from './Context/AuthContext'


const app = initializeApp({
  apiKey: "AIzaSyD8pukMdM6_MjYoHa5Y8HFA7-GX9OOT49I",
  authDomain: "note-card-f16be.firebaseapp.com",
  projectId: "note-card-f16be",
  storageBucket: "note-card-f16be.appspot.com",
  messagingSenderId: "362493364211",
  appId: "1:362493364211:web:c1d14cb0503fed792ef486",
  measurementId: "G-T59GZYKRY3"
})

const auth = getAuth(app)
const db_firestore  = getFirestore()

function App() {
  const [user, setUser] = useState(auth.currentUser)

  const contextProp = {
    db_firestore,
    uid: user?.uid
  }

  useEffect(() => {
    (async () => {
      auth.onAuthStateChanged(userProp => {
        setUser(userProp)
      })
    })() 
  }, [])



  const signIn = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const signOut = async () => {
    await auth.signOut()
  }


  return (
    <AuthContext.Provider value={contextProp}>
    <div className=' w-screen bg-black max-h-screen overflow-x-hidden'>
          { user ?
          (
            <Main  
              db_firestore={db_firestore}
              signOut={signOut}
            ></Main>
          ) : 
            (<Login signIn={signIn} />)
          }
    </div>
    </AuthContext.Provider>
  )
}

export default App
