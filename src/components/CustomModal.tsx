import { Box, Modal } from "@mui/material"
import { ReactNode } from "react"

interface Props {
    open: boolean
    onClose(): void
    children: ReactNode
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
}

export default function CustomModal(props: Props) {
    return <Modal
        open={props.open}
        onClose={props.onClose}
    >
        <Box sx={style}>
            {props.children}
        </Box>
    </Modal>
}