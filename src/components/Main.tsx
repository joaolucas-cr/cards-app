import { useContext, useEffect, useState } from 'react'
import { ControlPanel, SearchBar } from './ControlPanel'
import Card from './Card'
import { query, getDocs, collection, where, deleteDoc, doc, Firestore, addDoc } from 'firebase/firestore'
import { Card as CardType } from '../types'
import { AuthContext } from '../Context/AuthContext'

export default function Main({ db_firestore, signOut }: { db_firestore: Firestore, signOut: any }) {
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [cards, setCards] = useState<CardType[] | []>([])
  const [searchTerm, setSearchTerm] = useState("")
  
  const auth = useContext(AuthContext)

  const getCards = async () => {
    const results = await getDocs(query(collection(db_firestore, "cards"), where("uid", "==", auth?.uid)))
    const cards_arr: CardType[] = []

    results.forEach((result) => {
      const item = result.data() 
      const cardId = result.id
      if(!((item as CardType).content && (item as CardType).title) && (item as CardType).uid && (cardId)) return 
      const cardObject: CardType = {
        uid: item.uid,
        title: item.title,
        content: item.content, 
        cardId
      }
      cards_arr.push(cardObject)
    })

    setCards(cards_arr)
  }

  useEffect(() => {
    if(!auth.uid) return

    (async () => {
       await getCards() 
    })()

   }, [auth])

  const deleteCard = async (cardId: string) => {
    await deleteDoc(doc(db_firestore, "cards", cardId))
    await getCards()
  }

  const createDoc = async () => {
    await addDoc(collection(db_firestore, "cards"), {
      uid: auth.uid,
      title,
      content,
        })
    await getCards()
  }

  const onSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)
  }

  return (
    <div className='w-screen flex flex-col items-center h-screen space-y-4'>
        <SearchBar onSearch={onSearch} ></SearchBar>
        <ControlPanel
            changeTitle={setTitle}
            createDoc={createDoc}
            changeContent={setContent}
            signOut={signOut}
        ></ControlPanel>
        {
            cards.filter(c => {
            return c.content.includes(searchTerm) || c.title.includes(searchTerm)
            }).map(card => (
            <Card
                deleteCard={deleteCard}
                cardId={card.cardId}
                content={card.content}
                title={card.title}
            ></Card>
            ))
        }
    </div>
  )
}
