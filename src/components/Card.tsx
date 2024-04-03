import React from 'react'
import {
    Card as CardShad,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./shadcn/components/ui/card"

import { Button } from './shadcn/components/ui/button'


export default function Card({ title, cardId, content, deleteCard }: { title: string, cardId: string, content: string, deleteCard: any }) {
  return (
    <CardShad className='w-[75vw] min-w-[75vw] max-w-[75vw]'>
        <CardHeader>
        <CardTitle>{ title }</CardTitle>
        </CardHeader>
        <CardContent>
        <p>{content}</p>
        </CardContent>
        <CardFooter>
        <Button variant={"destructive"} 
            onClick={() => { deleteCard(cardId) }}
        >Delete</Button>
        </CardFooter>
    </CardShad>
  )
}
