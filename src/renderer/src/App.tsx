import { Button } from '../src/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Input } from './components/ui/input';
import { BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
import './styles/global.css'
import { Home } from './pages/Main/Home';
import { router } from './routes';

export function App(): JSX.Element {
  return <RouterProvider router={router} />;
}
