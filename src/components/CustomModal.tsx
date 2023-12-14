import { Box, Modal, Stack, Typography } from "@mui/material"
import { ReactNode } from "react"

interface Props {
    title: string
    open: boolean
    onClose(): void
    children?: ReactNode
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "10px",
    p: 2
}

export default function CustomModal(props: Props) {
    return <Modal
        open={props.open}
        onClose={props.onClose}
    >
        <Box sx={style}>
            <Stack
                display="flex"
                rowGap={2}
                alignItems="center"
            >
                <Typography
                    fontSize={20}
                    fontWeight="bold"
                >
                    {props.title}
                </Typography>
                {props.children}
            </Stack>
        </Box>
    </Modal>
}