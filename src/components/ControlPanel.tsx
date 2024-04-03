import { Input } from './shadcn/components/ui/input'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from './shadcn/components/ui/dialog'
import { Button } from './shadcn/components/ui/button'



function ControlPanel({ signOut, changeTitle, createDoc, changeContent }: { signOut: any, changeTitle: any, createDoc: any, changeContent: any }) {
  return (
    <Dialog>
        <DialogTrigger className='text-white'>
        <Button className='w-[65vw] bg-white text-black '>Create Card</Button>
        <Button className='w-[10vw] text-white' variant={'link'}
            onClick={async () => {
            await signOut()
            }}
        >Log Out</Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader className='space-y-4'>
            <DialogTitle>CREATE CARD</DialogTitle>
            <DialogDescription className='space-y-4'>
                <p>Type the title of the card</p>
                <Input onChange={(e) => changeTitle(e.target.value)} placeholder='type title...'/>
                <p>Type the content of the card</p>
                <Input onChange={(e) => changeContent(e.target.value)} placeholder='type content...'/>
                <DialogClose>
                <Button onClick={async () => {
                    await createDoc()
                }}>Create</Button>  
                </DialogClose>
            </DialogDescription>
        </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

function SearchBar({ onSearch }: { onSearch: any }) {
    return (
        <Input onChange={(e) => { onSearch(e.target.value) }} placeholder='Search' className='w-[75vw] bg-transparent rounded text-white'></Input>
    )
  }
  

export { SearchBar, ControlPanel }