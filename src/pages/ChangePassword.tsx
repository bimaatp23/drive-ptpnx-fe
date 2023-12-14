import { Button, Stack, TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useMemo, useState } from "react"
import { setNotification } from "../Util"
import MainPage from "../components/MainPage"
import { BaseResp } from "../types/BaseResp"
import { ChangePasswordReq } from "../types/user/ChangePasswordReq"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export default function ChangePassword() {
    const useCaseFactory: UseCaseFactory = useMemo(() => new UseCaseFactoryImpl(), [])
    const [changePasswordReq, setChangePasswordReq] = useState<ChangePasswordReq>({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const doChangePassword = () => {
        useCaseFactory.useChangePasswordUseCase().execute(changePasswordReq)
            .subscribe({
                next: (response: BaseResp) => {
                    setNotification({
                        icon: "success",
                        message: response.errorSchema.errorMessage
                    })
                    setChangePasswordReq({
                        newPassword: "",
                        oldPassword: "",
                        confirmPassword: ""
                    })
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
        setChangePasswordReq({
            ...changePasswordReq,
            [e.target.id]: e.target.value
        })
    }

    const handleOnEnter = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            doChangePassword()
        }
    }

    return <MainPage
        title="Ganti Password"
    >
        <Stack
            display="flex"
            flexDirection="row"
            columnGap={2}
        >
            <TextField
                size="small"
                label="Old Password"
                id="oldPassword"
                type="password"
                value={changePasswordReq.oldPassword}
                onChange={handleOnChange}
                onKeyDown={handleOnEnter}
                fullWidth
            />
            <TextField
                size="small"
                label="New Password"
                id="newPassword"
                type="password"
                value={changePasswordReq.newPassword}
                onChange={handleOnChange}
                onKeyDown={handleOnEnter}
                fullWidth
            />
            <TextField
                size="small"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                value={changePasswordReq.confirmPassword}
                onChange={handleOnChange}
                onKeyDown={handleOnEnter}
                fullWidth
            />
            <Button
                variant="contained"
                onClick={doChangePassword}
                sx={{
                    px: 10
                }}
            >
                Update
            </Button>
        </Stack>
    </MainPage>
}