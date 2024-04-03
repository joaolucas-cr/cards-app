import { createContext } from 'react'
import { AuthContextType } from '../types'

const AuthContext = createContext<AuthContextType>({
    db_firestore: undefined,
    uid: undefined
})

export { AuthContext }