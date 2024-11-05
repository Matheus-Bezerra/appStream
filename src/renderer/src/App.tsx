import { Button } from '../src/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Input } from './components/ui/input';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/global.css'
import { Home } from './pages/Home';

export function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>

  )
}
