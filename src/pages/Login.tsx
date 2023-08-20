import { Button, Stack, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { LoginReq } from '../types/user/LoginReq'

export default function Login() {
    const [loginReq, setLoginReq] = useState<LoginReq>({
        username: '',
        password: ''
    })

    return <Stack
        position={'absolute'}
        top={'50%'}
        left={'50%'}
        width={'20vw'}
        sx={{
            transform: 'translate(-50%, -50%)'
        }}
    >
        <center>
            <img src='logo.png' alt='Logo PTPNX' width={'70%'}/>
        </center>
        <TextField
            variant={'outlined'}
            size={'small'}
            label={'Username'}
            value={loginReq.username}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setLoginReq({
                    ...loginReq,
                    username: event.target.value
                })
            }}
            sx={{
                mb: 2
            }}
        />
        <TextField
            variant={'outlined'}
            size={'small'}
            label={'Password'}
            type={'password'}
            value={loginReq.password}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setLoginReq({
                    ...loginReq,
                    password: event.target.value
                })
            }}
            sx={{
                mb: 2
            }}
        />
        <Button
            variant={'contained'}
            color={'primary'}
            onClick={() => console.log(loginReq)}
        >
            Login
        </Button>
    </Stack>
}