import { RouterProvider } from "react-router-dom";
import './styles/global.css'
import { router } from './routes';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function App(): JSX.Element {
  const queryCliente = new QueryClient()
  return (
    <QueryClientProvider client={queryCliente}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
    ;
}
