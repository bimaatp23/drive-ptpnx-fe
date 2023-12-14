import { Button, Stack, TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { setNotification } from "../Util"
import { LoginReq } from "../types/user/LoginReq"
import { LoginResp } from "../types/user/LoginResp"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export default function Login() {
    const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl()
    const [loginReq, setLoginReq] = useState<LoginReq>({
        username: "",
        password: ""
    })

    const doLogin = (): void => {
        useCaseFactory.useLoginUseCase().execute(loginReq)
            .subscribe({
                next: (response: LoginResp) => {
                    window.location.assign("/")
                },
                error: (error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.errorSchema?.errorMessage ?? error.response.statusText
                    })
                }
            })
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginReq({
            ...loginReq,
            [e.target.id]: e.target.value
        })
    }

    const handleOnEnter = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            doLogin()
        }
    }

    return <Stack
        position="absolute"
        top="50%"
        left="50%"
        width="20vw"
        sx={{
            transform: "translate(-50%, -50%)"
        }}
    >
        <center>
            <img src="logo.png" alt="Logo PTPNX" width="70%" />
        </center>
        <TextField
            variant="outlined"
            size="small"
            label="Username"
            id="username"
            value={loginReq.username}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
            sx={{
                mb: 2
            }}
        />
        <TextField
            variant="outlined"
            size="small"
            label="Password"
            id="password"
            type="password"
            value={loginReq.password}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
            sx={{
                mb: 2
            }}
        />
        <Button
            variant="contained"
            color="primary"
            onClick={doLogin}
        >
            Login
        </Button>
    </Stack>
}