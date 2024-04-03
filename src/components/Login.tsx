import { Button } from './shadcn/components/ui/button'


export default function Login({ signIn }: { signIn: any }) {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
        <Button onClick={async () => await signIn()}>Sign In</Button>
    </div>
  )
}
