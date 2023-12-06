import { Stack, Typography } from "@mui/material"
import { FC, ReactNode, useState } from "react"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

interface Props {
    title: string
    children: ReactNode
}

const MainPage: FC<Props> = ({ title, children }) => {
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
            position={"absolute"}
            width={"calc(100vw - 2rem)"}
            height={"calc(100vh - 5rem)"}
            top={"4.5rem"}
            left={"50%"}
            sx={{
                transform: "translateX(-50%)"
            }}
        >
            <Typography
                fontSize={40}
            >
                {title.charAt(0).toUpperCase() + title.slice(1)}
            </Typography>
            {children}
        </Stack>
    </Stack>
}

export default MainPage