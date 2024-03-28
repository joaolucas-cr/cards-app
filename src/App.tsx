import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card"

import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { collection, addDoc, getFirestore, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { DialogClose } from '@radix-ui/react-dialog'


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

interface Card {
  uid: string,
  title: string,
  content: string,
  cardId: string
}


function App() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [user, setUser] = useState(auth.currentUser)
  const [cards, setCards] = useState<Card[] | []>([])

  const getCards = async () => {
    const results = await getDocs(collection(db_firestore, "cards"))
    const cards_arr: Card[] = []

    results.forEach((result) => {
      const item = result.data() 
      const cardId = result.id
      console.log(item, cardId)
      if(!((item as Card).content && (item as Card).title) && (item as Card).uid && (cardId)) return 
      const cardObject: Card = {
        uid: item.uid,
        title: item.title,
        content: item.content, 
        cardId
      }
      cards_arr.push(cardObject)
    })

    setCards(cards_arr)
  }

  const deleteCard = async (cardId: string) => {
    await deleteDoc(doc(db_firestore, "cards", cardId))
    await getCards()
  }

  useEffect(() => {
    const main = async () => {
      auth.onAuthStateChanged(userProp => {
        setUser(userProp)
      })
      await getCards()    
    }
    main()
  }, [])

  const createDoc = async () => {
    await addDoc(collection(db_firestore, "cards"), {
      uid: user?.uid,
      title,
      content,
        })
    await getCards()
  }

  const signIn = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  return (
    <div className=' w-screen bg-black max-h-screen overflow-x-hidden'>
        {/* <div> */}
          { user ?
          (
          <div className='w-screen flex flex-col items-center h-screen space-y-4'>
            <Dialog>
              <DialogTrigger className='text-white'>
                <Button className='w-[65vw] bg-white text-black '>Create Card</Button>
                <Button className='w-[10vw] text-white' variant={'link'}
                  onClick={async () => {
                    await auth.signOut()
                  }}
                >Log Out</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className='space-y-4'>
                  <DialogTitle>CREATE CARD</DialogTitle>
                  <DialogDescription className='space-y-4'>
                      <p>Type the title of the card</p>
                      <Input onChange={(e) => setTitle(e.target.value)} placeholder='type title...'/>
                      <p>Type the content of the card</p>
                      <Input onChange={(e) => setContent(e.target.value)} placeholder='type content...'/>
                      <DialogClose>
                        <Button onClick={async () => {
                            await createDoc()
                        }}>Create</Button>
                      </DialogClose>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            {
              cards.map(card => (
                <Card className='w-[75vw] min-w-[75vw] max-w-[75vw]'>
                  <CardHeader>
                    <CardTitle>{ card.title }</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{card.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant={"destructive"} 
                      onClick={() => { deleteCard(card.cardId) }}
                    >Delete</Button>
                  </CardFooter>
                </Card>
              ))
            }
          </div>
          ) : 
          (<div className='h-screen w-screen flex items-center justify-center'>
            <Button onClick={async () => await signIn()}>Sign In</Button>
          </div>)
          }
    </div>
  )
}

export default App
