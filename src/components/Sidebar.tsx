import { Button, Drawer, List, Stack, Typography } from "@mui/material"

interface Props {
    sidebarOpen: boolean
    setSidebarOpen(value: boolean): void
}

export default function Sidebar(props: Props) {
    const Item = (param: {
        label: string
        path: string
    }[]) => {
        return <List
            sx={{
                p: 0
            }}
        >
            {param.map((data, index) => {
                return <Stack
                    width="100%"
                    display="flex"
                    key={index}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: 0,
                            paddingY: 2
                        }}
                        onClick={() => window.location.assign(data.path)}
                    >
                        <Typography
                            width="100%"
                            textAlign="left"
                        >
                            {data.label}
                        </Typography>
                    </Button>
                </Stack>
            })}
        </List>
    }

    return <Drawer
        open={props.sidebarOpen}
        onClose={() => props.setSidebarOpen(false)}
    >
        <Stack
            width="17vw"
            minWidth="15rem"
            height="100vh"
            sx={{
                background: "#f0f0f0"
            }}
        >
            <Stack
                height="4rem"
                display="flex"
                sx={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onClick={() => window.location.assign("/")}
            >
                <img src="logo.png" alt="Logo PTPNX" width="45%" />
            </Stack>
            {Item([
                {
                    path: "/upload",
                    label: "Upload"
                },
                {
                    path: "/data",
                    label: "Data"
                },
                {
                    path: "/category",
                    label: "Kategori"
                },
                {
                    path: "/locker",
                    label: "Loker"
                },
                {
                    path: "/employee",
                    label: "Karyawan"
                }
            ])}
        </Stack>
    </Drawer>
}