import { Firestore } from "firebase/firestore"

interface Card {
    uid: string,
    title: string,
    content: string,
    cardId: string
  }

interface AuthContextType {
  db_firestore: Firestore | undefined
  uid: string | undefined
}

  
export type {
    Card,
    AuthContextType
}