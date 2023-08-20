import { Stack } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>,
  },
  {
    path: '/login',
    element: <Login/>,
  }
])

export default function App() {
  return <Stack
    position={'fixed'}
    width={'100vw'}
    height={'100vh'}
    sx={{
      background: '#f5f5f5'
    }}
  >
    <RouterProvider router={router} />
  </Stack>
}