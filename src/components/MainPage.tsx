import { Stack, Typography } from "@mui/material"
import { FC, ReactNode, useState } from "react"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

interface Props {
    title: string
    headElement?: ReactNode
    children?: ReactNode
}

const MainPage: FC<Props> = ({ title, headElement, children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

    return <Stack>
        <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={(value: boolean) => setSidebarOpen(value)}
        />
        <Topbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={(value: boolean) => setSidebarOpen(value)}
        />
        <Stack
            position="absolute"
            width="calc(100vw - 2rem)"
            height="calc(100vh - 5rem)"
            top="4rem"
            left="50%"
            sx={{
                transform: "translateX(-50%)"
            }}
        >
            <Stack
                display="flex"
                flexDirection="row"
                columnGap={2}
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography
                    fontSize={40}
                >
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                </Typography>
                <Stack
                    display="flex"
                    flexDirection="row"
                    columnGap={2}
                >
                    {headElement}
                </Stack>
            </Stack>
            {children}
        </Stack>
    </Stack>
}

export default MainPage