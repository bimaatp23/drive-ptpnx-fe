import { Stack } from '@mui/material'
import Login from './pages/Login'

export default function App() {
  return <Stack
    position={'fixed'}
    width={'100vw'}
    height={'100vh'}
    sx={{
      background: '#f5f5f5'
    }}
  >
    <Login/>
  </Stack>
}