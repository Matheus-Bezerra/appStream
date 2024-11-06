
import {RouterProvider } from "react-router-dom";
import './styles/global.css'
import { router } from './routes';

export function App(): JSX.Element {
  return <RouterProvider router={router} />;
}
