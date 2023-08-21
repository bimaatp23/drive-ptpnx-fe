import { Stack } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import GantiPassword from './pages/GantiPassword'
import Kasbon from './pages/Kasbon'
import Login from './pages/Login'
import Memorial from './pages/Memorial'
import Neraca from './pages/Neraca'
import Umum from './pages/Umum'
import Upload from './pages/Upload'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>,
  },
  {
    path: '/upload',
    element: <Upload/>,
  },
  {
    path: '/kasbon',
    element: <Kasbon/>,
  },
  {
    path: '/memorial',
    element: <Memorial/>,
  },
  {
    path: '/neraca',
    element: <Neraca/>,
  },
  {
    path: '/umum',
    element: <Umum/>,
  },
  {
    path: '/ganti-password',
    element: <GantiPassword/>,
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