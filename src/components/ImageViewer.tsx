import { Stack } from "@mui/material"
import { useEffect, useState } from "react"

interface Props {
    file: File
}

export default function ImageViewer(props: Props) {
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined)

    useEffect(() => {
        const reader = new FileReader()

        reader.onloadend = () => {
            const result = reader.result
            if (typeof result === "string") {
                setFileUrl(result)
            }
        }

        reader.readAsDataURL(props.file)
    }, [props.file])

    return <Stack
        height="100%"
        sx={{
            overflowY: "scroll"
        }}
    >
        {fileUrl ? <img src={fileUrl} alt="upload-preview" /> : <></>}
    </Stack>
}