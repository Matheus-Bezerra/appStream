import { Button } from '../src/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Input } from './components/ui/input';
import './styles/global.css'

export function App(): JSX.Element {
  return (
    <div className='bg-foreground h-[100vh]'>
      <Button>teste</Button> 

      <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
      <Input />
    </div>
 
  )
}
  