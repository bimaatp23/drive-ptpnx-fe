import { Stack } from "@mui/material"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import ChangePassword from "./pages/ChangePassword"
import Dashboard from "./pages/Dashboard"
import DataPage from "./pages/DataPage"
import Login from "./pages/Login"
import Upload from "./pages/Upload"
import { UseCaseFactory, UseCaseFactoryImpl } from "./usecase/UseCaseFactory"

export default function App() {
  const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl()

  const isLogin = (): boolean => {
    return useCaseFactory.useSessionUseCase().get().name !== null
  }

  const middlewareIsLogin = (path: string, element: JSX.Element): {
    path: string,
    element: JSX.Element
  } => {
    let returnElement: JSX.Element = element
    if (!isLogin()) returnElement = <Navigate to="/login" />
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
    if (isLogin()) returnElement = <Navigate to="/" />
    return {
      path: path,
      element: returnElement
    }
  }

  const router = createBrowserRouter([
    middlewareIsLogin("/", <Dashboard />),
    middlewareIsLogin("/upload", <Upload />),
    middlewareIsLogin("/:category", <DataPage />),
    middlewareIsLogin("/ganti-password", <ChangePassword />),
    middlewareIsNotLogin("/login", <Login />)
  ])

  return <Stack
    position="fixed"
    width="100vw"
    height="100vh"
    sx={{
      background: "#f5f5f5"
    }}
  >
    <RouterProvider router={router} />
  </Stack>
}