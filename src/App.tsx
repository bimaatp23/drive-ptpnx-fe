import { Stack } from '@mui/material'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import GantiPassword from './pages/GantiPassword'
import Kasbon from './pages/Kasbon'
import Login from './pages/Login'
import Memorial from './pages/Memorial'
import Neraca from './pages/Neraca'
import Umum from './pages/Umum'
import Upload from './pages/Upload'
import { UseCaseFactory, UseCaseFactoryImpl } from './usecase/UseCaseFactory'

export default function App() {
  const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl()
  
  const isLogin = (): boolean => {
    return useCaseFactory.createSessionUseCase().get().name !== null
  }

  const middlewareIsLogin = (path: string, element: JSX.Element): {
    path: string,
    element: JSX.Element
  } => {
    let returnElement: JSX.Element = element
    if (!isLogin()) returnElement = <Navigate to={'/login'}/>
    return {
      path: path,
      element: returnElement
    }
  }

  const middlewareIsNotLogin = (path: string, element: JSX.Element): {
    path: string,
    element: JSX.Element
  } => {
    let returnElement: JSX.Element = element
    if (isLogin()) returnElement = <Navigate to={'/'}/>
    return {
      path: path,
      element: returnElement
    }
  }

  const router = createBrowserRouter([
    middlewareIsLogin('/', <Dashboard/>),
    middlewareIsLogin('/upload', <Upload/>),
    middlewareIsLogin('/kasbon', <Kasbon/>),
    middlewareIsLogin('/memorial', <Memorial/>),
    middlewareIsLogin('/neraca', <Neraca/>),
    middlewareIsLogin('/umum', <Umum/>),
    middlewareIsLogin('/ganti-password', <GantiPassword/>),
    middlewareIsNotLogin('/login', <Login/>)
  ])
  
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